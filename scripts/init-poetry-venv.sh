#!/bin/bash
cd $(pwd)
cd $1

source `poetry env info --path`/bin/activate
poetry install --no-interaction --no-ansi -vvv
