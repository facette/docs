---
title: Library
menu:
  main-0_4:
    parent: API Documentation
version: "0.4"
---

# Library

## Get library summary

```
GET /api/v1/library/
```

This endpoint returns library items count per type.

### Responses


#### Examples

```headers
Status: 200 OK
```
```javascript
{
  "collections": 1,
  "graphs": 7,
  "sourcegroups": 3,
  "metricgroups": 42
}
```
## Create a library item

```
POST /api/v1/library/:type/
```

This endpoint creates a new item and stores it to the back-end database.

The `inherit` query parameter can be used to inherit fields from an existing item, then applying new values with
received body payload.

If the instance is *read-only* the operation will be rejected with `403 Forbidden`.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| type<br>**required** | `string` | path | type of library items |
| inherit | `string` | query | identifier of the item to inherit from |

### Responses


```headers
Status: 201 Created
```

## Delete library items of a given type

```
DELETE /api/v1/library/:type/
```

This endpoint deletes all items of a given type.

If the request header `X-Confirm-Action` is not present or if the instance is *read-only* the operation will be
rejected with `403 Forbidden`.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| type<br>**required** | `string` | path | type of library items |

### Responses


```headers
Status: 204 No Content
```

## List library items of a given type

```
GET /api/v1/library/:type/
```

This endpoint returns library items of a given type. If a `filter` query parameter is given, only items having
their name matching the filter will be returned.

This endpoint supports pagination through the `offset` and `limit` query parameters and sorting using `sort` query
parameter (separated by commas; prefix field name with "-" to reverse sort order).

The `kind` query parameter _(available for collections and graphs)_ can be set in order to target or exclude
templates from result:

 * `all`: return all kind of items (default)
 * `raw`: only return raw items, thus removing templates from result
 * `template`: only return templates

The `link` parameter _(available for collection and graphs)_ can be set in order to only return items having the
given item as template reference.

The `parent` query parameter _(only available for collections)_ can be set in order to only return items having the
given collection for parent.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| type<br>**required** | `string` | path | type of library items |
| filter | `string` | query | term to filter names on |
| sort | `string` | query | fields to sort results on |
| offset | `integer` | query | offset to return items from |
| limit | `integer` | query | number of items to return |
| kind | `string` | query | kind of item to return |
| link | `string` | query | identifier of the linked item |
| parent | `string` | query | identifier of the parent item |

### Responses


#### Examples

```headers
Status: 200 OK
X-Total-Records: 3
```
```javascript
[
  {
    "created": "2017-05-19T15:08:40Z",
    "description": "CPU usage for \"{{ .source }}\"",
    "id": "c1c5ba71-428a-565e-94e3-304c16e9a92f",
    "modified": "2017-06-14T06:17:46Z",
    "name": "cpu"
  },
  {
    "created": "2017-05-19T15:08:39Z",
    "description": "Disk usage for \"{{ .volume }}\" on \"{{ .source }}\"",
    "id": "c77c2dae-b37f-5210-80b5-5d44ce5f7a97",
    "modified": "2017-06-14T06:17:46Z",
    "name": "df.bytes"
  },
  {
    "created": "2017-05-19T15:08:39Z",
    "description": "Load average for \"{{ .source }}\"",
    "id": "eccd09c3-aaa9-592b-ad55-3d92b4acf119",
    "modified": "2017-06-14T06:17:46Z",
    "name": "load"
  }
]
```
## Get a library item

```
GET /api/v1/library/:type/:id
```

This endpoint returns a library item given its type and identifier.

The `expand` query parameter _(available for collections and graphs)_ can be set to request item expansion. If the
item is an instance of a template, all internal references will be resolved.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| type<br>**required** | `string` | path | type of library items |
| id<br>**required** | `string` | path | identifier of the item |
| expand | `boolean` | query | item expansion flag |

### Responses


#### Examples

```headers
Status: 200 OK
```
```javascript
{
  "id": "eccd09c3-aaa9-592b-ad55-3d92b4acf119",
  "name": "load",
  "description": "Load average for \"{{ .source }}\"",
  "created": "2017-05-19T15:08:39Z",
  "modified": "2017-06-14T06:17:46Z",
  "groups": [
    {
      "name": "",
      "operator": 0,
      "consolidate": 1,
      "series": [
        {
          "name": "shortterm",
          "origin": "{{ .origin }}",
          "source": "{{ .source }}",
          "metric": "load.shortterm",
          "options": {
            "color": "#fff726"
          }
        }
      ]
    },
    {
      "name": "",
      "operator": 0,
      "consolidate": 1,
      "series": [
        {
          "name": "midterm",
          "origin": "{{ .origin }}",
          "source": "{{ .source }}",
          "metric": "load.midterm",
          "options": {
            "color": "#ff602a"
          }
        }
      ]
    },
    {
      "name": "",
      "operator": 0,
      "consolidate": 1,
      "series": [
        {
          "name": "longterm",
          "origin": "{{ .origin }}",
          "source": "{{ .source }}",
          "metric": "load.longterm",
          "options": {
            "color": "#be1732"
          }
        }
      ]
    }
  ],
  "options": {
    "title": "{{ .source }} - Load Average",
    "type": "line",
    "yaxis_unit": "fixed"
  },
  "template": true
}
```
## Update a library item

```
PUT /api/v1/library/:type/:id
```

This endpoint updates a library item given its identifier. The request body is similar to the _Create a new library
item_ endpoint.

If the instance is *read-only* the operation will be rejected with `403 Forbidden`.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| type<br>**required** | `string` | path | type of library items |
| id<br>**required** | `string` | path | identifier of the item |

### Responses


```headers
Status: 204 No Content
```

## Partially update a library item

```
PATCH /api/v1/library/:type/:id
```

This endpoint partially updates a library item given its identifier. The request body is similar to the _Update a
library item_ endpoint, but only specified fields will be modified.

If the instance is *read-only* the operation will be rejected with `403 Forbidden`.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| id<br>**required** | `string` | path | identifier of the provider |

### Responses


```headers
Status: 204 No Content
```

## Delete a library item

```
DELETE /api/v1/library/:type/:id
```

This endpoint deletes a library item given its type and identifier.

If the instance is *read-only* the operation will be rejected with `403 Forbidden`.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| type<br>**required** | `string` | path | type of library items |
| id<br>**required** | `string` | path | identifier of the item |

### Responses


```headers
Status: 204 No Content
```

## Get collections tree

```
GET /api/v1/library/collections/tree
```

This endpoint renders the library collections tree.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| parent | `string` | query | parent node to generate the tree from |

## Retrieve template keys

```
POST /api/v1/library/parse
```

This endpoint parses requested library item or received data and returns the template keys.

| Name | Type | Description |
| --- | --- | --- |
| `id` | string | identifier of the item |
| `type`| string | type of the item |
| `data` | string | arbitrary data to parse |

Note: you should either specify `id` and `type` or `data` but not both.

### Requests


#### Examples

```headers
Content-Type: application/json
```
```javascript
{
  "id": "368b62f2-873d-580c-ba24-440325af0582",
  "type": "collections"
}
```
```headers
Content-Type: application/json
```
```javascript
{
  "data": "{\"description\":\"A test string with {{ .key1 }}.\"}"
}
```
### Responses


#### Examples

```headers
Status: 200 OK
```
```javascript
[
  "key1",
  "key2"
]
```
## Search library for items

```
POST /api/v1/library/search
```

This endpoint searches library for items matching a set of types and terms.

This endpoint supports pagination through the `offset` and `limit` query parameters and sorting using `sort` query
parameter (separated by commas; prefix field name with "-" to reverse sort order).

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| sort | `string` | query | fields to sort results on |
| offset | `integer` | query | offset to return items from |
| limit | `integer` | query | number of items to return |

### Requests


#### Examples

```headers
Content-Type: application/json
```
```javascript
{
  "types": ["collections", "graphs"],
  "terms": {
    "name": "glob:*test*",
    "template": false
  }
}
```
### Responses

#### Headers

| Name | Description |
| --- | --- |
| X-Total-Records | total number of library items found | 

#### Examples

```headers
Status: 200 OK
X-Total-Records: 2
```
```javascript
[
  {
    "type": "collections",
    "id": "0f660bc7-c8d7-4beb-497e-f1fdbf14092a",
    "name": "collection1",
    "description": null,
    "created": "2017-05-27T11:36:00Z",
    "modified": "2017-06-12T06:18:48Z"
  },
  {
    "type": "graphs",
    "id": "b3233810-ceb2-5e7a-17df-336b2710eef2",
    "name": "graph3",
    "description": null,
    "created": "2017-05-27T11:35:43Z",
    "modified": "2017-06-12T06:18:48Z"
  }
]
```
