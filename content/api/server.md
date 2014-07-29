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
    "origins": 1,
    "sources": 3,
    "metrics": 353,
    "graphs": 1,
    "collections": 1,
    "sourcegroups": 1,
    "metricgroups": 4
}
```

## Reload Server Configuration

```
GET /api/v1/reload
```

Triggers a server configuration files reload and providers refresh.

Additional status codes:

 * __503 Service Unavailable:__ the server is reloading its configuration
