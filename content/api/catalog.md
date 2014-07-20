---
title: "Catalog API"
menu:
  main:
    parent: "API Documentation"
    weight: 20
keywords:
   - "api"
   - "catalog"
   - "documentation"
   - "facette"
   - "metric"
   - "origin"
   - "plot"
   - "source"
---

# Catalog API

## Origins

### Full catalog retrieval

```
GET /api/v1/catalog/
```

Returns a catalog object containing the available origins, sources and metrics.

Response:

```javascript
[
    "origin0": {
        "source0": [ "metric0", "metric1", "metric2" ]
        "source1": [ "metric0", "metric1" ]
    },
    "origin1": {
        "source2": [ "metric0", "metric1", "metric2" ]
        "source3": [ "metric0", "metric1" ]
    }
]

```

### List origins

```
GET /api/v1/catalog/origins/
```

Returns an array listing the available origins.

Optional parameters:

 * `filter` (_string_): the [pattern](/api/#filter-patterns) to apply on origins names
 * `limit` (_integer_): the maximum number of items to return
 * `offset` (_integer_): the offset to start fetching from

Response:

```javascript
[
    "origin0",
    "origin1"
]
```

A `X-Total-Records` HTTP header containing the total number of records is returned along with the response.

### Get a single origin

```
GET /api/v1/catalog/origins/<name>
```

Returns an origin object with its connector type and date of last update.

Response:

```javascript
{
    "name": "origin0",
    "connector": "rrd",
    "updated": "2013-01-02T12:34:56+01:00"
}
```

## Sources

### List sources

```
GET /api/v1/catalog/sources/
```

Returns an array listing the available sources.

Optional parameters:

 * `filter` (_string_): the [pattern](/api/#filter-patterns) pattern to apply on sources names
 * `limit` (_integer_): the maximum number of items to return
 * `offset` (_integer_): the offset to start fetching from
 * `origin` (_string_): the name of the origin to filter on

Response:

```javascript
[
    "source0",
    "source1"
]
```

A `X-Total-Records` HTTP header containing the total number of records is returned along with the response.

### Get a single source

```
GET /api/v1/catalog/sources/<name>
```

Returns a source object with its associated origins and date of last update.

Response:

```javascript
{
    "name": "source0",
    "origins": [
        "origin0"
    ],
    "updated": "2013-01-02T12:34:56+01:00"
}
```

## Metrics

### List metrics

```
GET /api/v1/catalog/metrics/
```

Returns an array listing the available metrics.

Optional parameters:

 * `filter` (_string_): the [pattern](/api/#filter-patterns) pattern to apply on metrics names
 * `limit` (_integer_): the maximum number of items to return
 * `offset` (_integer_): the offset to start fetching from
 * `origin` (__string_): the name of the origin to filter on
 * `source` (__string_): the name of the source to filter on

Response:

```javascript
[
    "metric0",
    "metric1"
]
```

A `X-Total-Records` HTTP header containing the total number of records is returned along with the response.

### Get a single metric

```
GET /api/v1/catalog/metrics/<name>
```

Returns a metric object with its associated origins and sources and tdate of last update.

Response:

```javascript
{
    "name": "metric0",
    "origins": [
        "origin0"
    ],
    "sources": [
        "source0",
        "source1"
    ],
    "updated": "2013-01-02T12:34:56+01:00"
}
```
