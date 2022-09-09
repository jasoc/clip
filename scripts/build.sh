#!/bin/bash
CPATH=$(dirname -- "$(readlink -f -- "$0";)";)/..
cd $CPATH

for proj in "$@"
do
    cd $CPATH/$proj
    make build
done