#!/bin/bash

CPATH=$(dirname -- "$(readlink -f -- "$0";)";)
cd $CPATH
poetry install
echo `poetry`
echo `poetry env info --path`
source `poetry env info --path`/bin/activate
cd clip_webserver
flask --debug run --host=0.0.0.0