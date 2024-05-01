FROM node:20-alpine as spa-base
COPY ./scripts /clip/scripts
COPY ./spa /clip/spa
EXPOSE 4200

FROM spa-base as spa-build
WORKDIR /clip
RUN /bin/sh /clip/scripts/build.sh spa

FROM node:20-alpine as spa-prod
WORKDIR /clip
COPY ./scripts scripts
COPY --from=spa-build /clip/dist ./dist
CMD ["/bin/sh", "/clip/scripts/run.sh", "spa"]

