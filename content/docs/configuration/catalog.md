---
title: "Catalog Setup"
section: "configuration"
groups:
   - "configuration"
groups_weight: 30
---

# Catalog Setup

Configuring the catalog consists in defining data *providers*.

## Definining Providers

Defining *providers* registers data *origins* in Facette, i.e. where to find *sources* and their *metrics*, and how
to add them to the *catalog*. *Providers* are defined by a mandatory `connector` description, and optional `filters`.
The configuration is stored into a dedicated file in the directory pointed by the `providers_dir` setting in the main
configuration file; you can have as many of them, for instance if your polling/collect system is sharded into many
storage backends.

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
<span class="fa fa-info-circle"></span> Note: the name of the configuration file containing the definition will be used to name the *origin* of the data
obtained from this origin in the catalog, i.e. in the example above "my_metrics".

## Connectors

Facette providers use *connectors* to know how to bind to *origins* and to inventory their local *sources* and
*metrics*. See [this page](/docs/configuration/catalog/connectors/) to view the list of available connectors and how to
configure them.

## Filters

By default the inventory mechanism of Facette providers retrieves **all** the known *sources* and *metrics* from the
*origin*, named according to the *origin*'s storage structure/format. You may want to rename some of the
*sources*/*metrics* or even discard some of them to keep the catalog relevant.
Enter [filters](/docs/configuration/catalog/filters/).

## Optional Provider Settings

 * `refresh_interval` (type _integer_): interval (in seconds) to trigger a periodic refresh of the provider. If `0`
(default), no periodic refresh is performed.
