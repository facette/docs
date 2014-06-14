---
title: "Catalog Setup"
section: "configuration"
groups:
   - "configuration"
groups_weight: 30
---

# Catalog Setup

Configuring the catalog consists in defining *origins* to query data from.

## Definining Origins

Defining *origins* tells Facette where to find *sources* and their *metrics*, and how to add them to its catalog.
*Origins* are defined by a mandatory *connector* description, and optional *filters*. The configuration is stored into a
dedicated file in the directory pointed by the `origins_dir` setting in the main configuration file; you can have as
many of them, for example if your polling/collect system is sharded into many storage backends.

Here's what a typical structure of an *origin* looks like (the name of the configuration file containing the *origin*
definition is used as the name of the *origin*, i.e. in the example below "my_metrics"):

```javascript
$ cat /etc/facette/origins/my_metrics.json
{
	"connector": {
		...
	},

	"filters": [
		...
	],

	"refresh_interval": 300
}

```
## Back-end Connectors

Facette uses *connectors* to bind to *origins*, and to inventory their local *sources* and *metrics*. See
[this page](/docs/configuration/catalog/connectors/) to view the list of available back-end connectors and their
documentation.

## Filters

By default the inventory mechanism of Facette retrieves **all** the known *sources* and *metrics* from the *origin*,
named following the *origin*'s storage structure or format. You may want to rename *sources*/*metrics* or even
discard some of them. Enter [filters](/docs/configuration/catalog/filters/).

## Optional Origin Settings

 * `refresh_interval` (type _integer_): interval (in seconds) to trigger a periodic refresh of the origin. If `0`
(default), no periodic refresh is performed.
