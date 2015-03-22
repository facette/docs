---
title: "Plots API"
menu:
  main:
    parent: "API Documentation"
    weight: 30
keywords:
   - "api"
   - "documentation"
   - "facette"
   - "graph"
   - "library"
   - "plot"
---

# Plots API

## Get graphs plots values

```
POST /api/v1/plots
```

Takes a plot request from the request body and returns graph series plots values and information.

Additional status codes:

 * __404 Not Found:__ the requested graph template does not exist

Request:

```javascript
{
    "id": "909fe2df-3064-4ee2-5f52-4eca2c953c76",
    "range": "-1d"
}
```

<span class="fa fa-info-circle"></span> Note: the request could also accept a graph request along with the range,
replacing `id` by a `graph` parameter. See _Get a single graph_ example response in the [library API section][0] for request structure.

Response (plots values are truncated):

```javascript
{
    "id": "909fe2df-3064-4ee2-5f52-4eca2c953c76",
    "name": "Chart name",
    "description": "A great chart description.",
    "type": 1,
    "series": [
        {
            "stack_id": 0,
            "info": {
                "min": 0,
                "max": 1.023,
                "last": 0.381,
                "avg": 0.109164
            },
            "plots": [
                0.348,
                0.351,
                0.42300000000000004,
                …
                0,
                0.10500000000000001,
                0.42400000000000004,
                0.381,
                null
            ],
            "name": "serie0"
        }
    ],
    "stack_mode": 0,
    "start": "2013-01-01T12:34:56+01:00",
    "end": "2013-01-02T12:34:56+01:00",
    "step": 9.944751381,
    "modified": "2013-01-02T12:34:56+01:00"
}
```

[0]: /api/library
