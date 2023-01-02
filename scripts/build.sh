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

for proj in ${pythonProjects[@]}
do
    found=false
    for d in $proj/*
    do
        if [[ "$d" == *.egg-info ]]; then
            found=true
        elif [[ "$d" == */src ]]; then
            for dd in $d/*
            do
                if [[ "$dd" == *.egg-info ]]; then
                    found=true
                fi
            done
        fi
    done
    if $found && ! $forceBuild
    then
        echo "$proj already installed."
    else
        cd $clip_root/$proj
        if [[ $1 == "debug" ]]; then
            pip install --editable .
        fi
        if [[ $1 == "prod" || $# == 0 ]]; then
            python -m build
            pip install dist/*.whl
        fi
    fi
done