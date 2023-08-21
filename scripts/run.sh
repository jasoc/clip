#!/bin/bash

CLIP_PROJECT_PATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

run_apiserver()
{
    cd $CLIP_PROJECT_PATH/dist/apiserver
    pip install --root-user-action=ignore --no-cache-dir --upgrade -r requirements.txt
    python -O __main__.py
}

run_all()
{
    run_apiserver &
    wait
}

main()
{
    case $1 in
        apiserver) run_apiserver;;
        '')        run_all;;
    esac
}

main "$@"
