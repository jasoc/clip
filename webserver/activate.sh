#!/bin/bash

CPATH=$(dirname -- "$(readlink -f -- "$0";)";)
cd $CPATH
source `poetry env info --path`/bin/activate
poetry install