#!/bin/bash
CPATH=$(dirname -- "$(readlink -f -- "$0";)";)/..
cd $CPATH

# docker-compose -f docker-compose.yml up --remove-orphans

noVenv=false
for f in "$@"
do
    if [ $f == "--novenv" ]
    then
        noVenv=true
    fi
done

if [[  "$1" == "prod" || $# == 0 ]]; then
    export clip_environment=prod
    if ! $noVenv
    then
        venv/init.sh prod
        source .venv.prod/bin/activate
    fi
    scripts/build.sh "$@"
    server/start.sh "$@"
fi

if [[ "$1" == "debug" ]]; then
    export clip_environment=debug
    if ! $noVenv
    then
        venv/init.sh debug
        source .venv.debug/bin/activate
    fi
    scripts/build.sh "$@"
    server/start.sh "$@"
fi
