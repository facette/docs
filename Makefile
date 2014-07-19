#!/usr/bin/make -f
# -*- Makefile -*-

SED ?= sed

GIT ?= git

MYTH ?= myth
MYTH_ARGS =

UGLIFYCSS ?= uglifycss
UGLIFYCSS_ARGS =

HUGO ?= hugo
HUGO_ARGS =

all: clean build

clean:
	rm -rf public

build:
	$(GIT) checkout 0.1
	$(HUGO) $(HUGO_ARGS) -d public
	$(MYTH) $(MYTH_ARGS) static/style.css public/style.src.css
	$(UGLIFYCSS) $(UGLIFYCSS_ARGS) public/style.src.css >public/style.css
	$(SED) -e "s/2008-01-01T00:00:00+00:00/`date +%FT%T%:z`/g" -i public/sitemap.xml
	$(GIT) stash save before-gh-pages
	$(GIT) checkout gh-pages
	cp -rf public/* .
	rm -rf public
