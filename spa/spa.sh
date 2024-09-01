#!/bin/sh

develop_spa()
{
    if [ ! -d "./node_modules" ] || [ -z "$(ls -A ./node_modules)" ]
    then
        yarn install
    fi
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
}

prettify()
{
    yarn run prettier src --write
    yarn run eslint src --fix
}

main()
{
    case $1 in
        '')                develop_spa;;
        dev)               develop_spa;;
        run)               run_spa;;
        build)             build_spa;;
        generate_m3_theme) generate_m3_theme;;
        prettify)          prettify;;
        *) $@
    esac
}

main "$@"
