#!/bin/bash

CLIP_PROJECT_PATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

docker container rm clip-spa-debug clip-apiserver-debug clip-apiserver clip-spa --force
docker image rm clip/spa:debug clip/apiserver:debug clip/spa clip/apiserver
docker volume rm clip_postgres_volume

rm -r $CLIP_PROJECT_PATH/dist
rm -r $CLIP_PROJECT_PATH/spa/dist
rm -r $CLIP_PROJECT_PATH/spa/node_modules
rm -r $CLIP_PROJECT_PATH/spa/.angular
rm -r $CLIP_PROJECT_PATH/apiserver/.venv
rm -r $CLIP_PROJECT_PATH/apiserver/dist
rm -r $CLIP_PROJECT_PATH/.devenv