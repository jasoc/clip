#!/bin/bash

CPATH=$(dirname -- "$(readlink -f -- "$0";)";)
cd $CPATH

docker container rm clip clip-ws
docker image rm parisius/clip clip_ws