#!/bin/bash
CPATH=$(dirname -- "$(readlink -f -- "$0";)";)
cd $(pwd)
$CPATH/init-poetry-venv.sh $1 prod
cd $1
poetry build
echo "" > requirements.txt
poetry export --without-hashes -f requirements.txt --output requirements.txt