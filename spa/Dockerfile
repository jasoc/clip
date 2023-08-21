FROM node:18.16.1-alpine as dev
WORKDIR /clip/scripts
EXPOSE 4200

FROM node:18.16.1-alpine as build
WORKDIR /clip
COPY ./scripts ./scripts
COPY ./spa ./spa
RUN /bin/sh /clip/scripts/build.sh spa

FROM nginx:1.21.6-alpine as prod
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /clip/dist/spa/ /usr/share/nginx/html/
COPY /resources/configs/nginx/nginx.conf /etc/nginx/nginx.conf
