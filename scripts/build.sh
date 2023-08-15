#!/bin/bash

CLIP_PROJECT_PATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

build_apiserver()
{
    cd $CLIP_PROJECT_PATH/apiserver
    dotnet build Clip.Server.csproj --configuration Release --runtime linux-x64 --no-self-contained
    cp -r $CLIP_PROJECT_PATH/apiserver/bin/Release/net7.0/linux-x64 $CLIP_PROJECT_PATH/dist/apiserver
}

build_spa()
{
    cd $CLIP_PROJECT_PATH/spa

    if [ ! -d "$CLIP_PROJECT_PATH/spa/node_modules" ] 
    then
        npm install
    fi

    npm run build
    cp -r $CLIP_PROJECT_PATH/spa/dist/clip $CLIP_PROJECT_PATH/dist/spa
}

build_all()
{
    build_apiserver
    build_spa
}

main()
{
    if [ ! -d "$CLIP_PROJECT_PATH/dist" ] 
    then
        mkdir $CLIP_PROJECT_PATH/dist
    fi

    case $1 in
        spa)       build_spa;;
        apiserver) build_apiserver;;
        '')        build_all;;
    esac
}

main "$@"
