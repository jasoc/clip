# syntax=docker/dockerfile:1

FROM phusion/baseimage:jammy-1.0.0 as os
RUN apt-get update

# ----------------------------------
FROM os as clip-base

RUN apt-get -y install \
    python3.10 \
    python3-pip \
    python3.10-venv \
    python3-lib2to3 \
    python-is-python3
WORKDIR /clip
COPY venv/requirements.txt ./
RUN pip install -r requirements.txt

# ----------------------------------
FROM clip-base as clip-debug

WORKDIR /clip
EXPOSE 5000
ENV clip_environment=debug
CMD ["bash", "scripts/clip.sh", "debug"]

# ----------------------------------
FROM clip-base as clip-build

WORKDIR /clip
COPY . .
RUN bash scripts/clip.sh build --rebuild --novenv

# ----------------------------------
FROM clip-build as clip-prod

WORKDIR /clip
EXPOSE 5000
    
ENV clip_environment=prod
RUN bash scripts/clip.sh install --rebuild --novenv
CMD [ "bash", "docker/docker-entrypoint.sh" ]
