#!/bin/bash

CPATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

cd $CPATH/pyclip
poetry build

cd $CPATH/webserver
poetry build
