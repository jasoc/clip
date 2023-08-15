#!/bin/bash

CLIP_PROJECT_PATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

run_apiserver()
{
    cd $CLIP_PROJECT_PATH/dist/apiserver
    dotnet Clip.Server.dll
}

run_all()
{
    run_apiserver &
    wait
}

main()
{
    if [ ! -d "$CLIP_PROJECT_PATH/dist" ]
    then
        $CLIP_PROJECT_PATH/scripts/build.sh
    fi

    case $1 in
        apiserver) run_apiserver;;
        '')        run_all;;
    esac
}

main "$@"
