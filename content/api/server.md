---
title: "Server API"
menu:
  main:
    parent: "API Documentation"
    weight: 10
keywords:
   - "api"
   - "configuration"
   - "documentation"
   - "facette"
   - "group"
   - "server"
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

Triggers a server configuration files reload and providers refresh.

Additional status codes:

 * __503 Service Unavailable:__ the server is reloading its configuration
