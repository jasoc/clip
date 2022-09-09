#!/bin/bash
CPATH=$(dirname -- "$(readlink -f -- "$0";)";)
cd $(pwd)
cd $1
poetry export --without-hashes -f requirements.txt --output requirements.txt
pip install -r requirements.txt
pip install dist/*.whl