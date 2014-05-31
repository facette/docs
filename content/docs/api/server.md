---
title: "Server API"
section: "api"
groups:
   - "api"
groups_weight: 10
---

# Server API

## Get Items Statistics

```
GET /api/v1/stats
```

Returns a statistics object along with back-end items information.

Response:

```javascript
{
    "catalog_updated": "2013-01-02T12:34:56+01:00",
    "groups": 1,
    "collections": 1,
    "graphs": 1,
    "metrics": 353,
    "sources": 3,
    "origins": 1
}
```

## Reload Server Configuration

```
GET /reload
```

Reloads the server configuration files and refreshes back-ends.

Additional status codes:

 * __503 Service Unavailable:__ the server is reloading its configuration

## Get Server Resources

```
GET /resources
```

Returns the resources defined in the server configuration. These resources are used by the web front-end.

Response (truncated):

```javascript
{
    "scales": [
        [
            "Bits → Bytes",
            0.125
        ],
        [
            "Bytes → Bits",
            8
        ],
        [
            "× 10³",
            1000
        ],
        …
    ]
}
```
