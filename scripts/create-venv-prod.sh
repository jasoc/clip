#!/bin/bash

CPATH=$(dirname -- "$(readlink -f -- "$0";)";)
cd $CPATH/..

mkdir prod
cd prod

python -m venv ./

echo "" > ../prod/requirements.txt

cd ../pyclip
poetry export --without-hashes -f requirements.txt >> ../prod/requirements.txt

cd ../webserver
poetry export --without-hashes -f requirements.txt >> ../prod/requirements.txt

cd ../prod
# pip install -r requirements.txt