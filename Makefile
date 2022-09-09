build:
	scripts/build.sh "pyclip" "webserver"

install:
	make build
	scripts/install.sh