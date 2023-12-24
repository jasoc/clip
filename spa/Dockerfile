FROM node:20-alpine as spa-base
COPY ./scripts /clip/scripts
COPY ./spa /clip/spa
WORKDIR /clip/scripts
EXPOSE 4200

FROM spa-base as spa-build
WORKDIR /clip
RUN /bin/sh /clip/scripts/build.sh spa

FROM nginx:1.21.6-alpine as spa-prod
RUN rm -rf /usr/share/nginx/html/*
COPY ./distributions/nginx.conf /etc/nginx/nginx.conf
COPY --from=spa-build /clip/dist/spa /usr/share/nginx/html
