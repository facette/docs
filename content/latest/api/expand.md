---
title: Expand
menu:
  main-latest:
    parent: API Documentation
version: latest
---

# Expand

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
