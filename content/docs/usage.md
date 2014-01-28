---
title: "Using Facette"
section: "docs"
groups:
   - "docs"
groups_weight: 30
---

# Using Facette

Once built, please make sure either `facette` is available in your `PATH` or provide the full path to the binary.

```
$ facette -h
Usage: facette [OPTIONS]

Options:
   -c  configuration file path
   -d  debugging level
   -h  display this help and exit
```

To launch the server, simply run:

```
facette -c path/to/facette.json
```

Note: if the path to the configuration file is omitted, the default `/etc/facette/facette.json` one will be loaded.
