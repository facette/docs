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

Not available yet

## From Sources

### Requirements

 * [Go](http://golang.org/) language environment (>= 1.2)
 * `librrd` library and development files (>= 1.4.0)
 * [pkg-config](http://pkgconfig.freedesktop.org/) helper tool
 * [npm](https://www.npmjs.org/) package manager
 * [Pandoc](http://johnmacfarlane.net/pandoc/) document converter

### Build Instructions

Retrieve the source code:

```
git clone https://github.com/facette/facette
```

Run the building command:

```
cd facette
make
make install
```

By default Facette will be built in the `tmp` folder and installed in the `build` one. To change its final location use
the `PREFIX` variable:

```
PREFIX=/path/to/folder make install
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
