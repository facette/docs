---
title: "Installing Facette"
section: "docs"
groups:
   - "docs"
groups_weight: 10
keywords:
   - "facette"
   - "git"
   - "go"
   - "golang"
   - "install"
   - "librrd"
   - "npm"
   - "pandoc"
   - "rrdtool"
---

# Installing Facette

## From Binaries

This is the preferred method. Binary releases and Linux distribution packages are available on the project releases
page on [Github][0].

## From Sources

To build Facette from the sources, you can either use a release tarball available on [Github][0] or retrieve the
source code by cloning the Git repository:

```
git clone https://github.com/facette/facette
```

### Requirements

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

By default Facette will be built in the `tmp` folder and installed in the `build` one. To change the installation
directory set the `PREFIX` variable:

```
sudo make PREFIX=/path/to/folder install
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
