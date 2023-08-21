FROM python:3.11.3-slim-bullseye as dev
RUN apt-get update \
    && apt-get install --no-install-recommends -y \
    curl \
    build-essential
# RUN addgroup --gid 1000 user
# RUN adduser --disabled-password --gecos '' --uid 1000 --gid 1000 user
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
# USER user
EXPOSE 8000
WORKDIR /clip/scripts

FROM dev as build
WORKDIR /clip
COPY ./scripts ./scripts
COPY ./apiserver ./apiserver
RUN /bin/sh /clip/scripts/build.sh apiserver

FROM python:3.11.3-slim-bullseye as prod
WORKDIR /clip
COPY --from=build /clip/scripts ./scripts
COPY --from=build /clip/dist/apiserver ./dist/apiserver
CMD [ "/bin/sh", "/clip/scripts/run.sh", "apiserver" ]