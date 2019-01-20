---
title: Series
menu:
  main-0_4:
    parent: API Documentation
version: "0.4"
---

# Series

## Expand groups in series

```
POST /api/v1/series/expand
```

This endpoint performs source/metric group expansion for a specific origin. The input format is a list of series
element (`origin`/`source`/`metric`), where the both of the `source` and `metric` field value can be a reference to
an existing source/metric group ID.

The format for describing a series in a expansion list is:

```javascript
{
  "origin": "<origin name>",
  "source": "<source name or source group identifier (format: `group:ID`)>",
  "metric": "<metric name or metric group identifier (format: `group:ID`)>"
}
```

The response is a list of series (origin/source/metric, and a pre-formatted `name` field for display purposes).

### Requests


#### Examples

```headers
Content-Type: application/json
```
```javascript
[
  {
    "origin": "kairosdb",
    "source": "host1.example.net",
    "metric": "group:118e864e-d880-5499-864b-06dedfd9f9ef"
  }
]
```
### Responses


#### Examples

```headers
Status: 200 OK
```
```javascript
[
    {
      "name": "host1.example.net (load.shortterm)",
      "origin": "kairosdb",
      "source": "host1.example.net",
      "metric": "load.shortterm"
    },
    {
      "name": "host1.example.net (load.midterm)",
      "origin": "kairosdb",
      "source": "host1.example.net",
      "metric": "load.midterm"
    },
    {
      "name": "host1.example.net (load.longterm)",
      "origin": "kairosdb",
      "source": "host1.example.net",
      "metric": "load.longterm"
    }
  ]
]
```
## Retrieve series data points

```
POST /api/v1/series/points
```

This endpoint retrieves data points for all of a graph's series based on a points query specifying either one of the
following elements:

  * `id` (type _string_): ID of an existing graph
  * `graph` (type _object_): graph object definition

Optional elements:

  * `time` (type _string_, default `"now"`): reference time for setting the time span (format: RFC 3339)
  * `range` (type _string_, default `"-1h"`): time offset relative to the reference `time` option
  * `start_time` (type _string_): absolute time start bound (format: RFC 3339)
  * `end_time` (type _string_): absolute time end bound (format: RFC 3339)
  * `sample` (type _integer_): data points sampling size
  * `attributes` (type _object_): graph template attributes

Note: for absolute time span selection, both `start_end` and `end_time` values must be specified.

The response is an array of graph series and their data points for the requested time span.

### Requests


#### Examples

```headers
Content-Type: application/json
```
```javascript
{
  "id": "c5e5faf1-dda1-50b3-abcb-4a5bdae7328e",
  "sample": 10,
  "range": "-60s"
}
```
### Responses


#### Examples

```headers
Status: 200 OK
```
```javascript
{
  "start": "2017-06-07T12:28:08Z",
  "end": "2017-06-07T12:29:08Z",
  "series": [
    {
      "points": [
        [1496838488, 673],
        [1496838494, 576],
        [1496838500, 585.5],
        [1496838506, 595],
        [1496838512, 648],
        [1496838518, 678],
        [1496838524, 708],
        [1496838530, 716],
        [1496838536, 724],
        [1496838542, 733]
      ],
      "summary": {
        "avg": 662.6111111111111,
        "last": 733,
        "max": 733,
        "min": 576
      },
      "name": "lb1_example_net.current_connections",
      "options": null
    }
  ],
  "options": {
    "title": "lb1.example.net - Current connections",
    "type": "line",
    "yaxis_unit": "metric"
  }
}
```
