#!/bin/bash

CLIP_PROJECT_PATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

dev_apiserver()
{
    export PATH="/root/.local/bin:$PATH"
    export PYTHONUNBUFFERED=1
    export PYTHONDONTWRITEBYTECODE=1
    export PIP_NO_CACHE_DIR=off
    export PIP_DISABLE_PIP_VERSION_CHECK=on
    export PIP_DEFAULT_TIMEOUT=100
    export POETRY_VIRTUALENVS_IN_PROJECT=true
    export POETRY_VIRTUALENVS_OPTIONS_ALWAYS_COPY=true
    export POETRY_NO_INTERACTION=1

    cd $CLIP_PROJECT_PATH/apiserver
    poetry install
    poetry run python clip_apiserver
}

dev_spa()
{
    cd $CLIP_PROJECT_PATH/spa

    yarn install
    yarn start
}

dev_all()
{
    dev_apiserver &
    dev_spa &
    wait
}

generate_m3_theme()
{
    cd $CLIP_PROJECT_PATH
    ./clip dev exec spa npm run ng generate @angular/material:m3-theme
    chown $USER:$USER $CLIP_PROJECT_PATH/spa/src/styles/themem3-theme.scss
    chmod 755 $CLIP_PROJECT_PATH/spa/src/styles/themem3-theme.scss
    mv $CLIP_PROJECT_PATH/spa/src/styles/themem3-theme.scss $CLIP_PROJECT_PATH/spa/src/styles/theme/m3-theme.scss
}

main()
{
    case $1 in
        spa)       dev_spa;;
        generate-m3-theme)      generate_m3_theme;;
        apiserver) dev_apiserver;;
        '')        dev_all;;
    esac
}

main "$@"