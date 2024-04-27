FROM nginx:1.21.6-alpine as spa-prod
RUN rm -rf /usr/share/nginx/html/*
COPY ./nginx.conf /etc/nginx/nginx.conf