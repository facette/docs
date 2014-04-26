---
title: "Catalog Setup"
section: "configuration"
groups:
   - "configuration"
groups_weight: 30
---

# Catalog overview

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

## Catalog Setup

### Back-end connectors

To built its catalog, Facette uses *connectors* bound to origins to reach their sources and metrics.
Here are the available connectors:

#### RRD

TBD

#### Graphite

TBD

### Filters

Catalog definition allows defining filtering rules to either rewrite or discard sources and metrics.

Filter rule settings:

 * __pattern__: the rule matching pattern (type: `string`)
 * __rewrite__: the rule replacement pattern (type: `string`)
 * __discard__: the discarding flag (type: `boolean`)
 * __target__: the target to apply rule on (type: `string`)

Available targets:

 * __source__: apply rule on sources
 * __metric__: apply rule on metrics
 * __both__: apply rule on both sources and metrics

Examples:

```javascript
{
    "pattern": "host3.example.net",
    "discard": true,
    "target": "source"
}

{
    "pattern": "^cpu-(\\d+)\\.cpu-(.+)\\.value$",
    "rewrite": "cpu.$1.$2",
    "target": "metric"
}
```

### Templates

TBD
