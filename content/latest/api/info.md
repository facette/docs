---
title: Information
menu:
  main-latest:
    parent: API Documentation
version: latest
---

# Information

## Get service version and supported features

```
GET /api/v1/
```

This endpoint returns the SQL storage drivers and catalog connectors supported by the Facette back-end.

If the back-end is not configured to hide build information details, it will also return the detailed build
information.

### Responses


#### Examples

```headers
Status: 200 OK
```
```javascript
{
  "version": "0.4.0",
  "build_date": "2017-06-06",
  "build_hash": "08794ed",
  "compiler": "go1.8.3 (gc)",
  "drivers": [
    "mysql",
    "pgsql",
    "sqlite"
  ],
  "connectors": [
    "facette",
    "graphite",
    "influxdb",
    "kairosdb",
    "rrd"
  ]
}
```
