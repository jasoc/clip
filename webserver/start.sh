#!/bin/bash

CPATH=$(dirname -- "$(readlink -f -- "$0";)";)
cd $CPATH
source `poetry env info --path`/bin/activate
poetry install --no-interaction --no-ansi -vvv
cd clip_webserver
flask --debug run --host=0.0.0.0