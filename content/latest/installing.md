---
title: Installing Facette
description: Installation methods of Facette time series data visualization software
menu:
  main-latest:
    weight: 20
keywords:
- build
- debian
- docker
- documentation
- facette
- gcc
- git
- gnumake
- go
- golang
- install
- install
- nodejs
- npm
- pandoc
- pkg-config
- requirements
- rrdtool
- ubuntu
version: latest
---

# Installing Facette

## From Binaries

This is the preferred method. Binary releases and Debian GNU/Linux distribution packages are available on the project
releases page on [Github](https://github.com/facette/facette/releases).

## From Docker Hub

We provide [Docker](https://www.docker.com/) images for every stable release, so you can try Facette without installing
it on your system. Check out [our repository](https://hub.docker.com/r/facette/facette/) for available images and usage
instructions.

Alternatively, a `Dockerfile` is provided in the sources tree to allow you to build a Docker image from the tip of the
sources repository (see "From Sources > Additional Targets" section below).

## From Sources

To build Facette from the sources, you can either use a release tarball available on
[Github](https://github.com/facette/facette/releases) or retrieve the source code by cloning the Git repository:

```
git clone https://github.com/facette/facette.git
```

### Build Requirements

 * GNU [Make](https://www.gnu.org/software/make/) util and [GCC](https://www.gnu.org/software/gcc/) C compiler
 * [Go](https://golang.org/) language environment (>= 1.7)
 * [RRDtool](http://oss.oetiker.ch/rrdtool/index.en.html) library and development files (>= 1.4.0)
 * [pkg-config](https://pkg-config.freedesktop.org/) helper tool
 * [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.org/) package manager
 * [Pandoc](http://pandoc.org/) document converter

### Build Instructions

<div class="note"><span class="fa fa-info-circle"></span> <strong>Note:</strong> on Debian/Ubuntu distributions you will
need to install the <strong>nodejs-legacy</strong> package for Node.js dependencies to work.</div>

At the top the sources directory, run the build command:

```
make
make install
```

By default, Facette will be built in the `build` directory and installed in `/usr/local`. To change the installation
directory, set the `PREFIX` variable:

```
sudo make PREFIX=/path/to/directory install
```

The resulting service binary comes with the support for all back-end drivers and provider connectors. To build a
version that suits to specific needs set `BUILD_TAGS` variable with a list a revelant tags, separated by spaces.

#### Build Tags

| Tag                          | Description                                    |
|:-----------------------------|:-----------------------------------------------|
| `builtin_assets`             | Embed front-end assests in binary              |
| `disable_connector_facette`  | Disable support of Facette provider connector  |
| `disable_connector_graphite` | Disable support of Graphite provider connector |
| `disable_connector_influxdb` | Disable support of InfluxDB provider connector |
| `disable_connector_kairosdb` | Disable support of KairosDB provider connector |
| `disable_connector_rrd`      | Disable support of RRDtool provider connector  |
| `disable_driver_mysql`       | Disable support of MySQL back-end driver       |
| `disable_driver_pgsql`       | Disable support of PostgreqSQL back-end driver |
| `disable_driver_sqlite`      | Disable support of SQLite back-end driver      |

### Additional Targets

#### Tests

Run the various test suites:
```
make test
```

#### Docker Images

Build a Docker image from the current sources tree:
```
make docker
```

To change the default *facette:latest* image tag, set the `DOCKER_TAG` variable:
```
make DOCKER_TAG=my_company/facette:x.y.z docker
```
