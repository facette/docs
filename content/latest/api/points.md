---
title: Data points
menu:
  main-latest:
    parent: API Documentation
version: latest
---

# Data points

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
