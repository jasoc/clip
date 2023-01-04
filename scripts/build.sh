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
    # found=false
    # if [[ $1 == "debug" ]]; then
    #     for d in $proj/*
    #     do
    #         if [[ "$d" == *.egg-info ]]; then
    #             found=true
    #         elif [[ "$d" == */src ]]; then
    #             for dd in $d/*
    #             do
    #                 if [[ "$dd" == *.egg-info ]]; then
    #                     found=true
    #                 fi
    #             done
    #         fi
    #     done
    # else
    #     if [ -d dist/prod/$proj ]; then
    #         found=true
    #     fi
    # fi
    # if $found && ! $forceBuild
    # then
    #     echo "$proj already installed."
    # else
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
    # fi
done
