#!/bin/bash

develop_spa()
{
    yarn install
    yarn start
}

run_spa()
{
    cd ./dist/clip-spa
    node server/server.mjs
}

build_spa()
{
    yarn install
    yarn build
}

generate_m3_theme()
{
    yarn run ng generate @angular/material:m3-theme
    chown $USER:$USER ./src/styles/themem3-theme.scss
    chmod 755 ./src/styles/themem3-theme.scss
    mv ./spa/src/styles/themem3-theme.scss ./src/styles/theme/m3-theme.scss
}

main()
{
    case $1 in
        '')                  develop_spa;;
        dev)                 develop_spa;;
        run)                 run_spa;;
        build)               build_spa;;
        generate_m3_theme)   generate_m3_theme;;
    esac
}

main "$@"
