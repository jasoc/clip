#!/bin/bash
venv_path=$(dirname -- "$(readlink -f -- "$0";)";)
cd $venv_path

if [[ $1 == "debug" ]]; then
    if [[ ! -d "../.venv.debug" || $2 == "--override" ]]; then
        python -m venv ../.venv.debug
        source ../.venv.debug/bin/activate
        pip install -r requirements.txt
    fi
fi

if [[ $1 == "prod" || $# == 0 ]]; then
    if [[ ! -d "../.venv.prod" || $2 == "--override" ]]; then
        python -m venv ../.venv.prod
        source ../.venv.prod/bin/activate
        pip install -r requirements.txt
    fi
fi

