FROM python:3.11.3-slim-bullseye as apiserver-base
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
COPY ./scripts /clip/scripts
COPY ./apiserver /clip/apiserver

FROM apiserver-base as apiserver-build
WORKDIR /clip
RUN /bin/sh /clip/scripts/build.sh apiserver

FROM python:3.11.3-slim-bullseye as apiserver-prod
WORKDIR /clip
COPY ./scripts ./scripts
COPY --from=apiserver-build /clip/dist/apiserver ./dist/apiserver
CMD ["/bin/sh", "/clip/scripts/run.sh", "apiserver"]
