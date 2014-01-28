---
title: "Catalog API"
section: "api"
groups:
   - "api"
groups_weight: 20
---

# Catalog API

## Origins

### List origins

```
GET /catalog/origins
```

Returns an array listing the available origins.

Optional parameters:

 * __filter:__ the [pattern](/api/#filter-patterns) to apply on origins names (type: `string`)
 * __limit:__ the maximum number of items to return (type: `integer`)
 * __offset:__ the offset to start fetching from (type: `integer`)

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
GET /catalog/origins/<name>
```

Returns an origin object along with the date of its last update.

Response:

```javascript
{
    "name": "origin0",
    "backend": "rrd",
    "updated": "2013-01-02T12:34:56+01:00"
}
```

## Sources

### List sources

```
GET /catalog/sources
```

Returns an array listing the available sources.

Optional parameters:

 * __filter:__ the [pattern](/api/#filter-patterns) pattern to apply on sources names (type: `string`)
 * __limit:__ the maximum number of items to return (type: `integerr`)
 * __offset:__ the offset to start fetching from (type: `integer`)
 * __origin:__ the identifier of the origin to filter on (type: `string`)

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
GET /catalog/sources/<name>
```

Returns a source object along with the date of its last update and the list of the associated origins.

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
GET /catalog/metrics
```

Returns an array listing the available metrics.

Optional parameters:

 * __filter:__ the [pattern](/api/#filter-patterns) pattern to apply on metrics names (type: `string`)
 * __limit:__ the maximum number of items to return (type: `integer`)
 * __offset:__ the offset to start fetching from (type: `integer`)
 * __origin:__ the identifier of the origin to filter on (type: `string`)
 * __source:__ the identifier of the source to filter on (type: `string`)

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
GET /catalog/metrics/<name>
```

Returns a metric object along with the date of its last update and the list of the associated origins and sources.

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
