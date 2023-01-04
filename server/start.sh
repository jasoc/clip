#!/bin/bash
srv_path=$(dirname -- "$(readlink -f -- "$0";)";)
cd $srv_path

if [[ $1 == "debug" ]]; then
    python -m clip_server
fi

if [[ $1 == "prod" || $# == 0 ]]; then
    clip-server
fi