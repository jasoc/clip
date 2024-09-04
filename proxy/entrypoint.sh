#!/bin/bash

envsubst < /etc/nginx/nginx.template.conf > /etc/nginx/nginx.conf

nginx -g 'daemon off;'