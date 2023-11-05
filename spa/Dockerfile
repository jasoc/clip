###########
# SPA DEV #
###########

FROM node:18.16.1-alpine as spa-dev
WORKDIR /clip/scripts
EXPOSE 4200

#############
# SPA BUILD #
#############

FROM node:18.16.1-alpine as spa-build
WORKDIR /clip
COPY ./scripts ./scripts
COPY ./spa ./spa
RUN /bin/sh /clip/scripts/build.sh spa

#############
# SPA PROD #
#############

FROM nginx:1.21.6-alpine as spa-prod
RUN rm -rf /usr/share/nginx/html/*
COPY ./distributions/nginx.conf /etc/nginx/nginx.conf
COPY --from=spa-build /clip/dist/spa /usr/share/nginx/html