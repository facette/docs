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

 * RRD library Go binding: [rrd][0] (along with librrd library and development files)
 * Set package: [set][1]
 * UUID Go package: [gouuid][2]
 * Gopass package: [gopass][3]
 * Stoppable net/http listener package: [stoppableListener][4]

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


[0]: https://github.com/ziutek/rrd
[1]: https://github.com/fatih/set
[2]: https://github.com/nu7hatch/gouuid
[3]: https://github.com/howeyc/gopass
[4]: https://github.com/etix/stoppableListener
