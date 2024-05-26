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

main()
{
    case $1 in
        spa)       dev_spa;;
        deps)      yarn_install;;
        apiserver) dev_apiserver;;
        '')        dev_all;;
    esac
}

main "$@"