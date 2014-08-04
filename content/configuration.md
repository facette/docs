---
title: "Configuring Facette"
menu:
  main:
    weight: 30
keywords:
   - "catalog"
   - "configuration"
   - "connector"
   - "documentation"
   - "facette"
   - "filter"
   - "http"
   - "json"
   - "metric"
   - "origin"
   - "plot"
   - "provider"
   - "server"
   - "settings"
---

# Configuration

The main configuration file is passed using `-c` argument when launching the `facette` server. If not specified, its
default location is `/etc/facette/facette.json`.

<span class="fa fa-warning"></span> All the configuration files are stored in [JSON][0] format, and **must**
feature the extension `.json`.

## Base Settings

 * `bind` (type _string_): network address and port to listen on (default: `"localhost:12003"`)
 * `base_dir` (type _string_): base Facette application directory holding static files (default: `"/usr/share/facette"`)
 * `data_dir` (type _string_): directory* used to store application data (default: `"/var/lib/facette"`)
 * `pid_file` (type _string_): path* to the PID file (default: `"/var/run/facette/facette.pid"`)
 * `providers_dir` (type _string_): path to the directory containing providers configuration files
   (default: `"/etc/facette/providers"`)
 * `url_prefix` (type _string_): URL prefix behind which the server is located if not running at the root of the HTTP
   virtual host (e.g. `"/facette"`)

<span class="fa fa-warning"></span> * : Requires write permissions

Example:

```javascript
{
    "bind": "localhost:12003",
    "base_dir": "/usr/share/facette",
    "data_dir": "/var/lib/facette",
    "pid_file": "/var/run/facette/facette.pid",
    "providers_dir": "/etc/facette/providers",
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

<span class="fa fa-warning"></span> In case of a syntax error or incorrect configuration setting, the server will
continue its initialization and discard the bogus provider (a warning message will be logged).

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
<span class="fa fa-info-circle"></span> The name of the configuration file will be used as *origin* of the
*sources*/*metrics* retrieved from this origin in the catalog, i.e. in the example above “my_metrics”.

### Connectors

Facette providers use *connectors* to know how to bind to *origins* and to inventory their local *sources* and
*metrics*. See [this page][1] to view the list of available connectors and how to configure them.

### Filters

By default the inventory mechanism of Facette providers retrieves **all** the known *sources* and *metrics* from the
*origin*, named according to the *origin*'s storage structure/format. You may want to rename some of the
*sources*/*metrics* or even discard some of them to keep the catalog relevant. Enter [filters][2].

### Optional Provider Settings

 * `refresh_interval` (type _integer_): interval (in seconds) to trigger a periodic refresh of the provider. If `0`
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
    { "target": "metric", "pattern": "^entropy", "discard": true },

    { "target": "metric", "pattern": "/", "rewrite": "." },
    { "target": "metric", "pattern": "^cpu-(\\d+)\\.cpu-(.+)\\.value$", "rewrite": "cpu.$1.$2" },
    { "target": "metric", "pattern": "^df-(.+)\\.df_complex-(.+)\\.value", "rewrite": "df.$1.$2" },
    { "target": "metric", "pattern": "^disk-(.+)\\.disk_(.+)", "rewrite": "disk.$1.$2" },
    { "target": "metric", "pattern": "^interface-(.+)\\.if_(.+)\\.(.+)$", "rewrite": "net.$1.$2.$3" },
    { "target": "metric", "pattern": "^irq.irq-(.+)\\.value$", "rewrite": "irq.$1" },
    { "target": "metric", "pattern": "^load\\.load", "rewrite": "load" },
    { "target": "metric", "pattern": "^memory\\.memory-(.+)\\.value$", "rewrite": "memory.$1" },
    { "target": "metric", "pattern": "^processes\\.ps_state-(.+)\\.value$", "rewrite": "proc.state.$1" },
    { "target": "metric", "pattern": "^processes\\.(.+)\\.value$", "rewrite": "proc.$1" },
    { "target": "metric", "pattern": "^swap\\.swap-(.+)\\.value$", "rewrite": "swap.$1" },
    { "target": "metric", "pattern": "^swap\\.swap_io-(.+)\\.value$", "rewrite": "swap.io.$1" },
    { "target": "metric", "pattern": "^users\\.users\\.value", "rewrite": "users.count" }
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
    "allow_insecure_tls": true
  },

  "filters": [
    { "pattern": "_", "rewrite": ".", "target": "source" }
  ],

  "refresh_interval": 3600
}
```

[0]: http://www.ietf.org/rfc/rfc4627.txt
[1]: /configuration/connectors/
[2]: /configuration/filters/
[3]: /architecture/
[4]: http://collectd.org/documentation/manpages/collectd.conf.5.shtml#plugin_rrdtool
[5]: http://graphite.readthedocs.org/
