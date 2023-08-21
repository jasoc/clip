#!/bin/bash

CLIP_PROJECT_PATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

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

if ! which poetry > /dev/null
then
    curl -sSL https://install.python-poetry.org | python3 - --version 1.5.1
fi

cd $CLIP_PROJECT_PATH/$1
poetry ${@:2}