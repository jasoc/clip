#!/bin/bash
clip_root=$(dirname -- "$(readlink -f -- "$0";)";)/..
cd $clip_root

pythonProjects=("pyclip" "server")

forceBuild=false
for f in "$@"
do
    if [ $f == "--rebuild" ]
    then
        forceBuild=true
    fi
done

mkdir dist/
mkdir dist/prod/
mkdir dist/debug/

for proj in ${pythonProjects[@]}
do
    cd $clip_root/$proj
    
    if [[ $1 == "debug" ]]; then
        pip install --editable .
    fi
    
    if [[ $1 == "prod" || $# == 0 ]]; then
        python -m build --outdir ../dist/prod/$proj
        pip install ../dist/prod/$proj/*.whl
    fi

    if [[ $1 == "build" ]]; then
        python -m build --outdir ../dist/prod/$proj
    fi

    if [[ $1 == "install" ]]; then
        pip install ../dist/prod/$proj/*.whl
    fi

    if [[ $1 == "install-docker" ]]; then
        pip install *.whl
    fi
done
