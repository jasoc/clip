#!/bin/bash
venv_path=$(dirname -- "$(readlink -f -- "$0";)";)
cd $venv_path

source .venv/bin/activate
pip freeze > requirements.txt