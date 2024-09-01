# Clip
## Centralized Local Infrastructure Portal
![Angular](https://img.shields.io/badge/angular-%23DD0031.svg?style=for-the-badge&logo=angular&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)
![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white)

[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)

A simple remote web gui for a glorious System Administration!

### Local environment

How to start (both on Linux and Windows (PoweShell/WSL)):
```console
$: ./clip dev up --build
```
or any parameter of `docker compose` you prefer after `dev`.

Prod configuration
```console
$: ./clip prod up -d --build
```

Everything is auto contained in Docker. You can interact with the environment's toolchain using `docker compose run`. For example:
```console
$: ./clip dev run --rm spa yarn add @package
```
or
```console
$: ./clip dev run --rm apiserver poetry add @package
```

## Before committing
```powershell
$: ./clip dev run --rm spa prettify
$: ./clip dev run --rm apiserver prettify
```
