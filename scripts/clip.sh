#!/bin/bash
CPATH=$(dirname -- "$(readlink -f -- "$0";)";)/..
cd $CPATH

echo "
 ██████╗██╗     ██╗██████╗ 
██╔════╝██║     ██║██╔══██╗
██║     ██║     ██║██████╔╝
██║     ██║     ██║██╔═══╝ 
╚██████╗███████╗██║██║     
 ╚═════╝╚══════╝╚═╝╚═╝     
"

noVenv=false
for f in "$@"
do
    if [ $f == "--novenv" ]
    then
        noVenv=true
    fi
done

initParam=prod
export clip_environment=prod
venv=prod

if [[ "$1" == "debug" ]]; then
    initParam=debug
    venv=debug
    export clip_environment=debug
fi

if ! $noVenv
then
    venv/init.sh $initParam
    source .venv.$venv/bin/activate
fi

scripts/build.sh "$@"

if [[ $1 == "debug" || $1 == "prod" ]]; then
    server/start.sh "$@"
fi