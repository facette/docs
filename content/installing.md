---
title: "Installing Facette"
menu:
  main:
    weight: 20
keywords:
   - "facette"
   - "git"
   - "go"
   - "golang"
   - "install"
   - "npm"
   - "pandoc"
   - "rrdtool"
---

# Installing Facette

## From Binaries

This is the preferred method. Binary releases and Linux distribution packages are available on the project releases
page on [Github][0].

## From Docker Hub

We provide [Docker][1] images for every stable release, so you can try Facette without installing it on your system.
Check out [our repository][2] for available images and usage instructions.

Alternatively, a `Dockerfile` is provided at the root of the sources to allow you to build a Docker image from the tip
of the sources repository:

```
git clone https://github.com/facette/facette.git
docker build -t facette-latest facette/
```

## From Sources

To build Facette from the sources, you can either use a release tarball available on [Github][0] or retrieve the
source code by cloning the Git repository:

```
git clone https://github.com/facette/facette.git
```

### Requirements

 * GNU [Make](http://www.gnu.org/software/make/) util and [GCC](http://www.gnu.org/software/gcc/) C compiler
 * [Go](http://golang.org/) language environment (>= 1.2)
 * [RRDtool](http://oss.oetiker.ch/rrdtool/index.en.html) library and development files (>= 1.4.0)
 * [pkg-config](http://pkgconfig.freedesktop.org/) helper tool
 * [npm](https://www.npmjs.org/) package manager
 * [Pandoc](http://johnmacfarlane.net/pandoc/) document converter

### Build Instructions

At the top the sources directory, run the build command:

```
make
make install
```

By default Facette will be built in the `tmp` directory and installed in the `build` directory. To change the
installation directory set the `PREFIX` variable:

```
sudo make PREFIX=/path/to/directory install
```

### Additional Targets

Run the various test suites:

```
make test
```

Clean the building environment:

```
make clean
```

[0]: https://github.com/facette/facette/releases
[1]: https://www.docker.com/
[2]: https://registry.hub.docker.com/u/facette/facette/
