#!/bin/bash
CPATH=$(dirname -- "$(readlink -f -- "$0";)";)
cd $CPATH

if [[ "$1" == "prod" ]]; then
    docker-compose -f docker-compose.yml up --remove-orphans
fi

if [[ "$1" == "dev" ]]; then
    docker-compose -f docker-compose.dev.yml up --remove-orphans
fi
