#!/bin/bash

CPATH=$(dirname -- "$(readlink -f -- "$0";)";)
cd $CPATH

docker container rm clip 
docker image rm parisius/clip