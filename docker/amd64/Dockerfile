# syntax=docker/dockerfile:1

FROM phusion/baseimage:jammy-1.0.0 as os

RUN apt-get update

# ----------------------------------

FROM os as python

RUN apt-get -y install \
    python3=3.10.4-0ubuntu2 \
    python3-pip \
    python-is-python3

CMD ["python"]

# ----------------------------------

FROM python as poetry

ENV POETRY_HOME=/opt/poetry
ENV POETRY_VIRTUALENVS_IN_PROJECT=true
ENV PATH="$POETRY_HOME/bin:$PATH"
RUN pip install "poetry==1.1.15"

CMD ["poetry"]

# ----------------------------------

FROM poetry as webserver

WORKDIR /clip/webserver

EXPOSE 5000

CMD ["bash", "./start.sh"]

# ----------------------------------

FROM poetry as build

# CMD ["ls", "-1", "/clip/pyclip"]
RUN echo $(ls -1 /tmp/dir)

WORKDIR /clip/scripts

CMD ["bash", "./build.sh"]

# RUN ls
# RUN pip install dist/pyclip*.whl

# WORKDIR /clip/webserver

# RUN poetry build
# RUN pip install dist/clip_webserver*.whl

