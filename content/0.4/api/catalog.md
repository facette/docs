---
title: Catalog
menu:
  main-0_4:
    parent: API Documentation
version: "0.4"
---

# Catalog

The catalog contains entries of the following types:

 * `origins`
 * `sources`
 * `metrics`

## Get catalog summary

```
GET /api/v1/catalog/
```

This endpoint returns catalog entries count per type.

### Responses


#### Examples

```headers
Status: 200 OK
```
```javascript
{
  "origins": 1,
  "sources": 3,
  "metrics": 42
}
```
## List catalog entries of a given type

```
GET /api/v1/catalog/:type/
```

This endpoint returns catalog entries of a given type. If a `filter` query parameter is given, only entries having
their name matching the filter will be returned.

This endpoint supports pagination through the `offset` and `limit` query parameters.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| type<br>**required** | `string` | path | type of catalog entries |
| filter | `string` | query | term to filter names on |
| offset | `integer` | query | offset to return items from |
| limit | `integer` | query | number of items to return |

### Responses

#### Headers

| Name | Description |
| --- | --- |
| X-Total-Records | total number of catalog records for this type | 

#### Examples

```headers
Status: 200 OK
X-Total-Records: 3
```
```javascript
[
  "metric1",
  "metric2",
  "metric3"
]
```
## Get catalog entry information

```
GET /api/v1/catalog/:type/:name
```

This endpoint returns the information associated with a catalog entry given its type and name.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| type<br>**required** | `string` | path | type of catalog items |
| name<br>**required** | `string` | path | name of the catalog item |

### Responses


#### Examples

```headers
Status: 200 OK
```
```javascript
{
  "name": "metric3",
  "origins": [
    "provider1",
  ],
  "sources": [
    "host1.example.net"
  ],
  "providers": [
    "provider1",
  ]
}
```
