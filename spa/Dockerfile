FROM node:20-alpine AS spa-base
COPY . /spa
WORKDIR /spa

EXPOSE 4200

FROM spa-base AS spa-build
WORKDIR /spa
RUN /bin/sh ./spa.sh build

FROM node:20-alpine AS spa-prod
COPY --from=spa-build /spa/dist /spa/dist
COPY --from=spa-build /spa/spa.sh /spa
WORKDIR /spa
CMD ["/bin/sh", "./spa.sh", "run"]