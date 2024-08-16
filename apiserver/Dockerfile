FROM python:3.11.3-slim-bullseye AS apiserver-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    curl \
    build-essential

ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV PIP_NO_CACHE_DIR=off
ENV PIP_DISABLE_PIP_VERSION_CHECK=on
ENV PIP_DEFAULT_TIMEOUT=100
ENV POETRY_VIRTUALENVS_IN_PROJECT=true
ENV POETRY_VIRTUALENVS_OPTIONS_ALWAYS_COPY=true
ENV POETRY_NO_INTERACTION=1

RUN curl -sSL https://install.python-poetry.org | python3 - --version 1.8.2

EXPOSE 8000
COPY . /apiserver
WORKDIR /apiserver

FROM apiserver-base AS apiserver-build
WORKDIR /apiserver
RUN /bin/sh ./apiserver.sh build

FROM python:3.11.3-slim-bullseye AS apiserver-prod
COPY --from=apiserver-build /apiserver/dist ./apiserver
COPY --from=apiserver-build /apiserver/apiserver.sh ./apiserver
WORKDIR /apiserver
CMD ["/bin/sh", "./apiserver.sh", "run"]