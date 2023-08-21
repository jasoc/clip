#!/bin/bash

CLIP_PROJECT_PATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

dev_apiserver()
{
    export PYTHONUNBUFFERED=1
    export PYTHONDONTWRITEBYTECODE=1
    export PIP_NO_CACHE_DIR=off
    export PIP_DISABLE_PIP_VERSION_CHECK=on
    export PIP_DEFAULT_TIMEOUT=100
    export POETRY_VERSION=1.0.3
    export POETRY_VIRTUALENVS_IN_PROJECT=true
    export POETRY_NO_INTERACTION=1
    export PYSETUP_PATH="/opt/pysetup"
    export PATH="$POETRY_HOME/bin:$PATH"

    cd $CLIP_PROJECT_PATH/apiserver
    poetry install
    poetry run python clip_apiserver
}

dev_spa()
{
    cd $CLIP_PROJECT_PATH/spa

    if [ ! -d "$CLIP_PROJECT_PATH/spa/node_modules" ] 
    then
        npm install
    fi

    npm start
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
        apiserver) dev_apiserver;;
        '')        dev_all;;
    esac
}

main "$@"
