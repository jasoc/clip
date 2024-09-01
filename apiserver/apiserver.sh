#!/bin/bash

export PATH="/root/.local/bin:$PATH"
export PYTHONUNBUFFERED=1
export PYTHONDONTWRITEBYTECODE=1
export PIP_NO_CACHE_DIR=off
export PIP_DISABLE_PIP_VERSION_CHECK=on
export PIP_DEFAULT_TIMEOUT=100
export POETRY_VIRTUALENVS_IN_PROJECT=true
export POETRY_VIRTUALENVS_OPTIONS_ALWAYS_COPY=true
export POETRY_NO_INTERACTION=1

develop_apiserver()
{
    poetry install
    poetry run python clip_apiserver
}

run_apiserver()
{
    pip install --root-user-action=ignore --no-cache-dir --upgrade -r requirements.txt
    python -O __main__.py
}

build_apiserver()
{
    poetry install
    poetry export --without-hashes --format=requirements.txt > requirements.txt

    mkdir ./dist
    cp ./requirements.txt ./dist/requirements.txt
    cp -r ./clip_apiserver/* ./dist/
}

prettify()
{
    poetry run black clip_apiserver
    poetry run autoflake --recursive --in-place --remove-unused-variables --remove-all-unused-imports clip_apiserver
}


main()
{
    case $1 in
        '')       develop_apiserver;;
        dev)      develop_apiserver;;
        run)      run_apiserver;;
        build)    build_apiserver;;
        prettify) prettify;;
        *) $@
    esac
}

main "$@"
