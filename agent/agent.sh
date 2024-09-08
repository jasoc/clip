#!/bin/sh

develop_agent()
{
    dotnet watch
}

# run_agent()
# {

# }

# build_agent()
# {

# }

# prettify()
# {

# }

main()
{
    case $1 in
        '')       develop_agent;;
        dev)      develop_agent;;
        # run)    run_agent;;
        # build)  build_agent;;
        prettify) prettify;;
        *) $@
    esac
}

main "$@"
