#!/bin/bash

CLIP_PROJECT_PATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

run_apiserver()
{
    cd $CLIP_PROJECT_PATH/dist/apiserver
    pip install --root-user-action=ignore --no-cache-dir --upgrade -r requirements.txt
    python -O __main__.py
}

run_spa()
{
    cd $CLIP_PROJECT_PATH/dist/spa
    node server/server.mjs
}

run_all()
{
    run_apiserver &
    run_spa &
    wait
}

main()
{
    case $1 in
        apiserver) run_apiserver;;
        spa)       run_spa;;
        '')        run_all;;
    esac
}

main "$@"
