---
title: "Catalog Setup"
section: "configuration"
groups:
   - "configuration"
groups_weight: 30
---

# Catalog Overview

Along with the base server configuration, Facette maintains a catalog of known *origins*, *sources* and *metrics*.

## Origin

An *origin* represents, as its name suggests, the origin of the back-end time series
(e.g. [collectd](http://collectd.org/), [Graphite](http://graphite.readthedocs.org/)).
Those *origins* hold a local set of *sources* and *metrics*.

## Source

A *source* represents an entity that generates *metrics*. These are usually host names, but can be services or
applications names.

## Metric

A *metric* is a collection of time-based data points (e.g. [RRDtool](http://oss.oetiker.ch/rrdtool/) files) measured or
collected by any metering or profiling tool, that will be eventually displayed on graphs in Facette.

![Catalog Schema](/schema-catalog.png)

## Catalog Origins

Defining *origins* tells Facette where to find *sources* and their *metrics*, and how to add them to its catalog.
*Origins* are defined by a mandatory *connector* description, and optional *filters*.

### Back-end Connectors

Facette uses *connectors* to bind to *origins*, and inventory their local *sources* and *metrics*. See
[this page](/docs/configuration/catalog/connectors/) to view the list of available back-end connectors and their
documentation.

### Filters

By default the inventory mechanism of Facette queries retrieves **all** the *sources* and *metrics* known of the
*origin*, named following the *origin*'s storage structure or format. You may want to rename *sources*/*metrics* or even
discard some of them. Enter [filters](/docs/configuration/catalog/filters/).

## Origin Configuration File

Here's what a typical structure of an *origin* looks like (the name of the configuration file containing the *origin*
definition is used as the name of the *origin*, i.e. in the example below "my_metrics"):

```
$ cat /etc/facette/origins/my_metrics.json
{
	"connector": {
		...
	},

	"filters": [
		...
	]
}

```
