#!/usr/bin/make -f
# -*- Makefile -*-

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
	git checkout master
	$(HUGO) $(HUGO_ARGS) -d public
	$(MYTH) $(MYTH_ARGS) static/style.css public/style.src.css
	$(UGLIFYCSS) $(UGLIFYCSS_ARGS) public/style.src.css >public/style.css
	git stash save before-gh-pages
	git checkout gh-pages
	cp -rf public/* .
	rm -rf public
