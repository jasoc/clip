#!/bin/bash
CPATH=$(dirname -- "$(readlink -f -- "$0";)";)/..
cd $CPATH

scripts/create-venv-prod.sh
cd prod
source bin/activate
cd ../pyclip
make install
cd ../webserver
make install