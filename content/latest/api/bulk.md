---
title: Bulk
menu:
  main-latest:
    parent: API Documentation
version: latest
---

# Bulk

## Bulk requests execution

```
POST /api/v1/bulk/
```

This endpoint expects a request providing as body a list of API requests to execute in bulk, and returns a list of
API responses corresponding to the requests. The format for describing an API request in a bulk list is:

```javascript
{
  "endpoint": "<API endpoint relative to `/api/v1/` prefix>",
  "method": "<HTTP Method>",
  "params": {
    <query string parameters>
  }
}
```

### Requests


#### Examples

```headers
Content-Type: application/json
```
```javascript
[
  {
    "endpoint": "library/graphs/9084083e-312f-55cf-9bd6-57406cfad22a",
    "method": "GET",
    "params": {
      "fields": "id,name"
    }
  },
  {
    "endpoint": "library/graphs/65f812e1-9856-5a2c-8f1a-8e349f8945f0",
    "method": "GET",
    "params": {
      "fields": "id,name"
    }
  },
  {
    "endpoint": "library/graphs/36bdae08-8d4e-51cb-87d1-f016bed65864",
    "method": "GET",
    "params": {
      "fields": "id,name"
    }
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
    "status": 200,
    "data": {
      "id": "9084083e-312f-55cf-9bd6-57406cfad22a",
      "name": "www_facette_io.request.latency"
    }
  },
  {
    "status": 200,
    "data": {
      "id": "65f812e1-9856-5a2c-8f1a-8e349f8945f0",
      "name": "docs_facette_io.request.latency"
    }
  },
  {
    "status": 200,
    "data": {
      "id": "36bdae08-8d4e-51cb-87d1-f016bed65864",
      "name": "blog_facette_io.request.latency"
    }
  }
]
```
