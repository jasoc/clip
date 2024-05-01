#!/bin/bash

CLIP_PROJECT_PATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

build_apiserver()
{
    if [ ! -d "$CLIP_PROJECT_PATH/dist/apiserver" ]
    then
        mkdir $CLIP_PROJECT_PATH/dist/apiserver
    fi

    cd $CLIP_PROJECT_PATH/apiserver
    
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

    poetry install
    poetry build
    poetry export --without-hashes --format=requirements.txt > requirements.txt

    cp $CLIP_PROJECT_PATH/apiserver/requirements.txt $CLIP_PROJECT_PATH/dist/apiserver/requirements.txt
    cp -r $CLIP_PROJECT_PATH/apiserver/clip_apiserver/* $CLIP_PROJECT_PATH/dist/apiserver
}

build_spa()
{
    cd $CLIP_PROJECT_PATH/spa

    if [ ! -d "$CLIP_PROJECT_PATH/spa/node_modules" ]
    then
        yarn
    fi

    yarn build
    cp -r $CLIP_PROJECT_PATH/spa/dist/clip-spa $CLIP_PROJECT_PATH/dist/spa
}

build_all()
{
    build_apiserver
    build_spa
}

main()
{
    if [ ! -d "$CLIP_PROJECT_PATH/dist" ] 
    then
        mkdir $CLIP_PROJECT_PATH/dist
    fi

    case $1 in
        spa)       build_spa;;
        apiserver) build_apiserver;;
        '')        build_all;;
    esac
}

main "$@"
