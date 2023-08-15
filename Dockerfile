# --- BUILD STEPS ---

FROM mcr.microsoft.com/dotnet/sdk:7.0 as build_apiserver
WORKDIR /clip
COPY ./scripts ./scripts
COPY ./apiserver ./apiserver
RUN /bin/sh /clip/scripts/build.sh apiserver

FROM node:18.16.1-alpine as build_spa
WORKDIR /clip
COPY ./scripts ./scripts
COPY ./spa ./spa
RUN ls
RUN ls /clip/scripts
RUN /bin/sh /clip/scripts/build.sh spa

# --- RUN STEPS ---

FROM build_apiserver as apiserver
WORKDIR /clip
EXPOSE 5000
CMD [ "/bin/sh", "/clip/scripts/run.sh", "apiserver" ]

FROM nginx:1.21.6-alpine as spa
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build_spa /clip/dist/spa/ /usr/share/nginx/html/
COPY /resources/configs/nginx/nginx.conf /etc/nginx/nginx.conf
