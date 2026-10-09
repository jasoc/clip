#!/bin/sh

dev()
{
    if [ ! -d "./node_modules" ] || [ -z "$(ls -A ./node_modules)" ]
    then
        yarn install
    fi
    yarn start
}

run()
{
    cd ./dist/clip-spa
    node server/server.mjs
}

build()
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
        '')                dev;;
        dev)               dev;;
        run)               run;;
        build)             build;;
        generate_m3_theme) generate_m3_theme;;
        prettify)          prettify;;
        *) $@
    esac
}

main "$@"
