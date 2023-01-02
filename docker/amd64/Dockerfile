# syntax=docker/dockerfile:1

FROM phusion/baseimage:jammy-1.0.0 as os

RUN apt-get update

# ----------------------------------

FROM os as python

RUN apt-get -y install \
    python3=3.10.4-0ubuntu2 \
    python3-pip \
    python3.10-venv \
    make \
    python-is-python3

CMD ["python"]

# ----------------------------------

FROM python as webserver

WORKDIR /clip/webserver

EXPOSE 5000

CMD ["python", "./start.sh"]

# ----------------------------------