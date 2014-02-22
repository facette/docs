---
title: "Catalog Setup"
section: "configuration"
groups:
   - "configuration"
groups_weight: 30
---

# Catalog Setup

Along with the base server configuration, Facette maintains a catalog of known origins, sources and metrics.

An origin represents the location from where the back-end data comes from (e.g. Collectd). Those origins containing a
set of sources and metrics.

![Catalog Schema](/schema-catalog.png)

## Filters

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

## Templates

TBD

## Back-ends

### RRD Handler

TBD
