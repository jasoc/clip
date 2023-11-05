#!/bin/bash

CLIP_PROJECT_PATH=$(dirname -- "$(readlink -f -- "$0";)";)/..

docker container rm clip-spa-debug clip-apiserver-debug clip-apiserver clip-spa
docker image rm parisius/clip-spa-debug parisius/clip-apiserver-debug parisius/clip-spa parisius/clip-apiserver

rm -r $CLIP_PROJECT_PATH/dist
rm -r $CLIP_PROJECT_PATH/spa/dist
rm -r $CLIP_PROJECT_PATH/spa/node_modules
rm -r $CLIP_PROJECT_PATH/apiserver/.venv
rm -r $CLIP_PROJECT_PATH/apiserver/dist