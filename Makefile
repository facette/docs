# -*- Makefile -*-

BUILD_ENV ?= production

NPM ?= npm
NPM_ARGS =

GULP ?= node_modules/.bin/gulp
GULP_ARGS =

GIT ?= git

all: build

clean:
	rm -rf public/

clean-all: clean
	rm -rf node_modules/

build: node_modules
	$(GULP) $(GULP_ARGS) build --env $(BUILD_ENV)

release: clean
	$(GIT) stash save before-gh-pages
	$(MAKE) build
	$(GIT) checkout gh-pages
	cp -rf public/* .
	rm -rf public

node_modules:
	$(NPM) $(NPM_ARGS) install
