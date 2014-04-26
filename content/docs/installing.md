---
title: "Installing Facette"
section: "docs"
groups:
   - "docs"
groups_weight: 10
---

# Installing Facette

## From Binaries

Not available yet

## From Sources

### Requirements

 * `librrd` library and development files

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
