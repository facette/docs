---
title: "Architecture of Facette"
section: "docs"
groups:
   - "docs"
groups_weight: 40
description: "Architecture of Facette time series visualization software"
keywords:
   - "architecture"
   - "catalog"
   - "collectd"
   - "facette"
   - "graphite"
   - "graph"
   - "metric"
   - "munin"
   - "origin"
   - "provider"
   - "rrdtool"
   - "source"
   - "time series"
---

# Architecture of Facette

Facette is a time series data (called *metrics*) visualization software, it doesn’t collect nor store these data on its
own. Through [providers](/docs/configuration/catalog/), it inventories other collect/storage tools' local
metrics, and queries those remote storage resources when the user requests time series data to be displayed on a graph.

## The Big Picture

Here is the big picture showing how Facette and its components are architectured, and how they interact with external
resources:

![Architecture Schema](/schema-architecture.png)

Facette consists of two components: the *front-end* and the *back-end*. The *back-end* is the component that interacts
with the resources actually storing time series data — called *origins* — or being the canonical interface to access
them; the *front-end* is a web application that displays time series data fetched by the *back-end* on graphs.

## The Catalog

Facette maintains an internal inventory of known *sources* and *metrics* from configured *origins* called the
**catalog**. Here is a bit of terminology used in the software:

### Origin

An *origin* represents, as its name suggests, the origin of the back-end time series (e.g. [collectd][0], [Munin][1],
[Graphite][2], [KairosDB][3], [InfluxDB][4] etc). Those *origins* hold local sets of *sources* and *metrics*.

### Source

A *source* represents an entity that generates *metrics*. These are usually host names, but can be services or
applications names.

### Metric

A *metric* is a set of time-based data points (e.g. [RRDtool][5] files) measured or collected by any monitoring or
metering/profiling tool, that will be eventually displayed on graphs in Facette.

![Catalog Schema](/schema-catalog.png)


[0]: http://collectd.org/
[1]: http://munin-monitoring.org/
[2]: http://graphite.readthedocs.org/
[3]: https://code.google.com/p/kairosdb/
[4]: http://influxdb.org/
[5]: http://oss.oetiker.ch/rrdtool/
