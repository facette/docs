---
title: Architecture of Facette
description: Architecture of Facette time series data visualization software
menu:
  main-0_4:
    weight: 10
keywords:
- architecture
- catalog
- collectd
- connector
- documentation
- facette
- graph
- graphite
- influxdb
- kairosdb
- metric
- munin
- origin
- provider
- rrdtool
- source
- time series
version: "0.4"
aliases:
- /0.4
---

# Architecture of Facette

Facette is a time series data (called *metrics*) visualization software, it doesn't collect nor store these data on its
own. Through [providers](/latest/configuration/), it inventories other collect/storage tools' local metrics, and
queries those remote storage resources when the user requests time series data to be displayed on a graph.

## The Big Picture

Here is the big picture showing how Facette and its components are architectured, and how they interact with external
resources:

![Architecture Schema](/assets/images/schema-architecture.png)

Facette consists of two main components: the *front-end* and the *back-end*. The *back-end* is the component that
interacts via connectors with the resources actually storing time series data — called *origins* — or being the
canonical interface to access them; the *front-end* is a web application – only making API calls to the *back-end* –
that displays time series data on graphs.

## The Catalog

Facette maintains an internal inventory of known *sources* and *metrics* from configured *origins* called the
**catalog**. Here is a bit of terminology used in the software:

### Origin

An *origin* represents, as its name suggests, the origin of the back-end time series (e.g.
[collectd](https://collectd.org/), [Munin](http://munin-monitoring.org/), [Graphite](https://graphiteapp.org/),
[KairosDB](https://kairosdb.github.io/), [InfluxDB](https://influxdata.com) etc). Those *origins* hold local sets of
*sources* and *metrics*.

### Source

A *source* represents an entity that generates *metrics*. These are usually host names, but can be services or
applications names.

### Metric

A *metric* is a set of time-based data points (e.g. [RRDtool](http://oss.oetiker.ch/rrdtool/) files) measured or
collected by any monitoring or metering/profiling tool, that will be eventually displayed on graphs in Facette.
