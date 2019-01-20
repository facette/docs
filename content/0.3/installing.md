---
title: Installing Facette
description: Installation methods of Facette time series data visualization software (version 0.3)
menu:
  main-0_3:
    weight: 20
keywords:
- debian
- facette
- git
- go
- golang
- install
- nodejs
- npm
- pandoc
- rrdtool
- ubuntu
version: "0.3"
---

# Installing Facette

## From Binaries

This is the preferred method. Binary releases and Linux distribution packages are available on the project releases
page on [Github][0].

## From Docker Hub

We provide [Docker][1] images for every stable release, so you can try Facette without installing it on your system.
Check out [our repository][2] for available images and usage instructions.

Alternatively, a `Dockerfile` is provided in the sources tree to allow you to build a Docker image from the tip of the
sources repository (see "From Sources > Additional Targets" section of this page).

## From Sources

To build Facette from the sources, you can either use a release tarball available on [Github][0] or retrieve the
source code by cloning the Git repository:

```
git clone https://github.com/facette/facette.git
```

### Build Requirements

 * GNU [Make](http://www.gnu.org/software/make/) util and [GCC](http://www.gnu.org/software/gcc/) C compiler
 * [Go](http://golang.org/) language environment (>= 1.2)
 * [RRDtool](http://oss.oetiker.ch/rrdtool/index.en.html) library and development files (>= 1.4.0)
 * [pkg-config](http://pkgconfig.freedesktop.org/) helper tool
 * [Node.js](http://nodejs.org/) and [npm](https://www.npmjs.org/) package manager
 * [Pandoc](http://johnmacfarlane.net/pandoc/) document converter

### Build Instructions

<div class="note"><span class="fa fa-info-circle"></span> <strong>Note:</strong> if using the Debian/Ubuntu
distribution-provided `nodejs` package, since the shipped binary is `/usr/bin/nodejs` instead of `/usr/bin/node` you
have to add an alias using the command `sudo update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10` for
Facette Node.js dependencies to work.</div>

At the top the sources directory, run the build command:

```
make
make install
```

By default Facette will be built in the `tmp` directory and installed in the `build` directory. To change the
installation directory, set the `PREFIX` variable:

```
sudo make PREFIX=/path/to/directory install
```

### Additional Targets

#### Run the various test suites

```
make test
```

#### Clean the building environment

```
make clean
```

#### Build a Docker image from the current sources tree

```
make docker
```

To change the image tag (default: *facette-latest*), set the `DOCKER_TAG` variable:

```
make DOCKER_TAG=my_company/facette:x.y.z docker
```


[0]: https://github.com/facette/facette/releases
[1]: https://www.docker.com/
[2]: https://registry.hub.docker.com/u/facette/facette/
