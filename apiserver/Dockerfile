FROM python:3.11.3-slim-bullseye as apiserver-base
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    curl \
    build-essential

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on \
    PIP_DEFAULT_TIMEOUT=100 \
    POETRY_VERSION=1.0.3 \
    POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=true \
    POETRY_NO_INTERACTION=1 \
    PYSETUP_PATH="/opt/pysetup"
ENV PATH="$POETRY_HOME/bin:$VENV_PATH/bin:$PATH"
RUN curl -sSL https://install.python-poetry.org | python3 - --version 1.5.1
EXPOSE 8000
COPY ./scripts /clip/scripts
COPY ./apiserver /clip/apiserver
WORKDIR /clip/scripts

FROM apiserver-base as apiserver-build
WORKDIR /clip
RUN /bin/sh /clip/scripts/build.sh apiserver

FROM python:3.11.3-slim-bullseye as apiserver-prod
WORKDIR /clip
COPY ./scripts ./scripts
COPY --from=apiserver-build /clip/dist/apiserver ./dist/apiserver
CMD ["/bin/sh", "/clip/scripts/run.sh", "apiserver"]
