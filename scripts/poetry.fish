#!/usr/bin/fish

set CLIP_PROJECT_PATH (dirname -- (realpath -- "%self"))
set -x PYTHONUNBUFFERED 1
set -x PYTHONDONTWRITEBYTECODE 1
set -x PIP_NO_CACHE_DIR off
set -x PIP_DISABLE_PIP_VERSION_CHECK on
set -x PIP_DEFAULT_TIMEOUT 100
set -x POETRY_VERSION 1.0.3
set -x POETRY_VIRTUALENVS_IN_PROJECT true
set -x POETRY_NO_INTERACTION 1
set -x PYSETUP_PATH "/opt/pysetup"
set PATH "$POETRY_HOME/bin" $PATH

if not command -sq poetry
    curl -sSL https://install.python-poetry.org | python3 - --version 1.5.1
end

cd $CLIP_PROJECT_PATH/$argv[1]
poetry $argv[2..-1]