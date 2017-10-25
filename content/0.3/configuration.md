---
title: Configuring Facette
description: Configuration of Facette time series data visualization software (version 0.3)
menu:
  main-prev:
    weight: 30
keywords:
- bind
- catalog
- configuration
- connector
- documentation
- facette
- filter
- http
- ip
- ipv4
- ipv6
- json
- metric
- origin
- plot
- provider
- server
- settings
- socket
- tcp
- unix
version: prev
---

# Configuration

The main configuration file is passed using `-c` argument when launching the `facette` server. If not specified, its
default location is `/etc/facette/facette.json`.

<div class="note"><span class="fa fa-info-circle"></span> <strong>Note:</strong> all the configuration files are stored
in JSON format, and <strong>must</strong> feature the extension <code>.json</code>.</div>

## Base Settings

 * `bind` (_string_): endpoint to listen on (default: `tcp://localhost:12003`). See "Endpoint Binding Configuration"
 section for for details.
 * `base_dir` (_string_): base Facette application directory holding static files (default: `/usr/share/facette`)
 * `data_dir` (_string_): directory* used to store application data (default: `/var/lib/facette`)
 * `pid_file` (_string_): path* to the PID file (default: `/var/run/facette/facette.pid`)
 * `providers_dir` (_string_): path to the directory containing providers configuration files
   (default: `/etc/facette/providers`)
 * `url_prefix` (_string_): URL prefix behind which the server is located if not running at the root of the HTTP
   virtual host (e.g. `/facette`)
 * `read_only` (_boolean_): read-only flag, preventing modifications through API calls (default: `false`)
 * `hide_build_details` (_boolean_): build details display flag, preventing build details from be exposed in the UI (default: `false`)
 * `socket_mode` (_string_): when binding to a UNIX socket, socket file mode (e.g. `0400`)
 * `socket_user` (_string_): when binding to a UNIX socket, socket file owner **numeric ID** (e.g. `65534`)
 * `socket_group` (_string_): when binding to a UNIX socket, socket file group **numeric ID** (e.g. `65534`)

**\*** Requires write permissions

### Endpoint Binding Configuration

Facette back-end can listen on different types of endpoints:

 * UNIX socket using the `unix://<absolute path>` format, e.g. `unix:///var/run/facette/facette.sock`
 * TCP/IP socket using the `<protocol>://<host>:<port>` format, e.g.:
  * `tcp://localhost:12003` to listen on `localhost` on port 12003 (both IPv4 and IPv6)
  * `tcp4://localhost:12003` to listen on `localhost` on port 12003 (IPv4 only)
  * `tcp6://localhost:12003` to listen on `localhost` on port 12003 (IPv6 only)

Example:

```javascript
{
    "bind": "tcp://localhost:12003",
    "base_dir": "/usr/local/share/facette",
    "data_dir": "/var/lib/facette",
    "pid_file": "/var/run/facette/facette.pid",
    "providers_dir": "/etc/facette/providers",
    "read_only": false,
    …
}
```

## Catalog Setup

Configuring the catalog consists in defining data *providers*. At this point, we strongly recommend reading about the
[architecture of Facette][3] to understand how the catalog works.

### Definining Providers

Defining *providers* registers data *origins* in Facette, i.e. where to find *sources* and their *metrics*, and how
to add them to the *catalog*. *Providers* are defined by a mandatory `connector` description, and optional `filters`.
The configuration is stored in a dedicated file in the directory defined by the `providers_dir` setting in the main
configuration file; you can have as many definition files as your want, for instance if your polling/collect system is
sharded on many storage backends.

<div class="note"><span class="fa fa-info-circle"></span> <strong>Note:</strong> in case of a syntax error or incorrect
configuration setting, the server will continue its initialization and discard the bogus provider (a warning message
will be logged).</div>

Here's what a typical structure of a *provider* looks like:

```javascript
$ cat /etc/facette/providers/my_metrics.json
{
	"connector": {
		…
	},

	"filters": [
		…
	],

	"refresh_interval": 300
}

```
<div class="note"><span class="fa fa-info-circle"></span> <strong>Note:</strong> the name of the configuration file
will be used as <em>origin</em> of the <em>sources</em>/<em>metrics</em> retrieved from this origin in the catalog,
i.e. in the example above "my_metrics".</div>

### Connectors

Facette providers use *connectors* to know how to bind to *origins* and to inventory their local *sources* and
*metrics*. See [this page][1] to view the list of available connectors and how to configure them.

### Filters

By default the inventory mechanism of Facette providers retrieves **all** the known *sources* and *metrics* from the
*origin*, named according to the *origin*'s storage structure/format. You may want to rename some of the
*sources*/*metrics* or even discard some of them to keep the catalog relevant. Enter [filters][2].

### Optional Provider Settings

 * `refresh_interval` (_integer_): interval (in seconds) to trigger a periodic refresh of the provider. If `0`
(default), no periodic refresh is performed.

### Example: collectd

Here is an actual provider configuration for using files created by the [RRDtool collectd plugin][4], featuring a few
filters to rewrite original metric names in a more friendly way and discard entropy-related metrics:

```javascript
{
  "connector": {
    "type": "rrd",
    "path": "/var/lib/collectd/rrd",
    "pattern": "(?P<source>[^/]+)/(?P<metric>.+).rrd"
  },

  "filters": [
    { "action": "sieve", "target": "metric", "pattern": "/average$" },
    { "action": "rewrite", "target": "metric", "pattern": "/average$", "into": "" },
    { "action": "rewrite", "target": "metric", "pattern": "/", "into": "." },
    { "action": "rewrite", "target": "metric", "pattern": "^cpu-(\\d+)\\.cpu-(.+)\\.value$", "into": "cpu.$1.$2" },
    { "action": "rewrite", "target": "metric", "pattern": "^df-(.+)\\.df_complex-(.+)\\.value", "into": "df.$1.$2" },
    { "action": "rewrite", "target": "metric", "pattern": "^disk-(.+)\\.disk_(.+)", "into": "disk.$1.$2" },
    { "action": "rewrite", "target": "metric", "pattern": "^entropy\\.entropy", "into": "entropy" },
    { "action": "rewrite", "target": "metric", "pattern": "^interface-(.+)\\.if_(.+)\\.(.+)$", "into": "net.$1.$2.$3" },
    { "action": "rewrite", "target": "metric", "pattern": "^irq.irq-(.+)\\.value$", "into": "irq.$1" },
    { "action": "rewrite", "target": "metric", "pattern": "^load\\.load", "into": "load" },
    { "action": "rewrite", "target": "metric", "pattern": "^memory\\.memory-(.+)\\.value$", "into": "memory.$1" },
    { "action": "rewrite", "target": "metric", "pattern": "^processes\\.ps_state-(.+)\\.value$", "into": "proc.state.$1" },
    { "action": "rewrite", "target": "metric", "pattern": "^processes\\.(.+)\\.value$", "into": "proc.$1" },
    { "action": "rewrite", "target": "metric", "pattern": "^swap\\.swap-(.+)\\.value$", "into": "swap.$1" },
    { "action": "rewrite", "target": "metric", "pattern": "^swap\\.swap_io-(.+)\\.value$", "into": "swap.io.$1" },
    { "action": "rewrite", "target": "metric", "pattern": "^users\\.users\\.value", "into": "users.count" }
  ]
}
```

### Example: Graphite

This configuration snippet shows a provider definition for using a [Graphite webapp][5], with a filter to rewrite the
underscore-escaped hostname dots back with dots; besides, this provider will self-refresh every hour.

```javascript
{
  "connector": {
    "type": "graphite",
    "url": "https://graphite.mycorporation.net/",
    "allow_insecure_tls": true,
    "pattern": "(?P<source>[^\\.]+)\\.(?P<metric>.+)"
  },

  "filters": [
    { "action": "rewrite", "pattern": "_", "rewrite": ".", "target": "source" }
  ],

  "refresh_interval": 3600
}
```

[0]: http://www.ietf.org/rfc/rfc4627.txt
[1]: /configuration/connectors/
[2]: /configuration/filters/
[3]: /architecture/
[4]: https://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_rrdtool
[5]: http://graphite.readthedocs.org/
