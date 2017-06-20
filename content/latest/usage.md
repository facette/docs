---
title: Using Facette
description: Usage of Facette time series data visualization software
menu:
  main-latest:
    weight: 40
keywords:
- backup
- catalog
- documentation
- dump
- facette
- facettectl
- library
- maintenance
- refresh
- restore
- service
- usage
- utility
version: latest
---

# Using Facette

Once installed, please make sure either the `facette` binary is available in your `PATH` or provide the full path to
the binary. Then display its usage by running:

```
$ facette -h
Time series data visualization software

Usage:
      facette [FLAG]...

Flags:
      -c, --config   Configuration file path (default: /etc/facette/facette.yaml)
      -h, --help     Display this help and exit
      -V, --version  Display version information and exit
```

## Starting the Service

To start the service, simply run the `facette` command:

```
$ facette -c path/to/facette.yaml
```

<div class="warning"><span class="fa fa-warning"></span> <strong>Attention:</strong> Facette doesn't need to run as
<strong>root</strong> unless you want it to bind to a port lower than 1024.</div>

If you installed Facette through a distribution package, it usually provides an init script to manage the service,
please refer to your distribution service management system.

## Maintenance Tasks

The various maintenance tasks to run on running Facette instances can be achieve via the `facettectl` utility. It can
work on both local or remote Facette instances (see `-a` flag).

```
$ facettectl -h
Facette control utility

Usage:
      facettectl [FLAG|SET]...

Flags:
      -a, --address  Upstream socket address (default: http://localhost:12003)
      -h, --help     Display this help and exit
      -t, --timeout  Upstream connection timeout (default: 30)
      -V, --version  Display version information and exit
      -q, --quiet    Run in quiet mode

Sets:
      catalog      Manage catalog operations
      library      Manage library operations
```

### Refreshing catalog

To refresh all the providers configured that are enabled on a Facette instance, run the following command:

```
$ facettectl catalog refresh
```

### Dumping and restoring library

For backup and restoration purpose, the `facettectl` can dump Facette's library into a compressed tarball, just run:

```
$ facettectl library dump -o path/to/dump.tar.gz
```

To restore an existing dump (by default the existing library will be replaced, use
`-m` to merge), execute the following command:

```
$ facettectl library restore -i path/to/dump.tar.gz
```

<div class="note"><span class="fa fa-info-circle"></span> <strong>Note:</strong> library items are dumped giving a
specific order to prevent issues when restoring items relying on preexisting ones. <u>Edit the dump at your own
risks!</u></div>
