---
title: Providers
menu:
  main-latest:
    parent: API Documentation
version: latest
---

# Providers

## Providers Connectors Settings

Catalog providers can be configured with settings and filters:

### Facette

| Name | Type | Description |
| --- | --- | --- |
| `url`<br>__required__ | string | URL of the upstream Facette instance (without the `/api` path) |
| `timeout` | integer | delay in seconds before declaring a timeout (default: `10`) |
| `allow_insecure_tls` | boolean | allow invalid or expired SSL certificates when accessing the Facette API through HTTPS (default: `false`) |

### Graphite

| Name | Type | Description |
| --- | --- | --- |
| `url`<br>__required__ | string | URL of the Graphite webapp (without the `/api` path) |
| `pattern`<br>__required__ | string | regular expression (RE2 syntax) describing the pattern mapping sources/metrics to the metrics series names. `<source>` and `<metric>` regexp named group are mandatory to effectively map a series name to these objects |
| `timeout` | integer | delay in seconds before declaring a timeout (default: `10`) |
| `allow_insecure_tls` | boolean | allow invalid or expired SSL certificates when accessing the Graphite API through HTTPS (default: `false`) |

### InfluxDB

| Name | Type | Description |
| --- | --- | --- |
| `url`<br>__required__ | string | URL of the InfluxDB instance |
| `database`<br>__required__ | string | InfluxDB database to query series from |
| `pattern` | string | regular expression (RE2 syntax) describing the pattern mapping *sources*/*metrics* to the measurements. `<source>` and `<metric>` regexp named group are mandatory to effectively map a measurement to these objects |
| `mapping` | object | measurements and columns to map the objects on (see _Mapping parameters_ below) |
| `username` | string | username to connect to the database (default: _empty_) |
| `password` | string | password to connect to the database (default: _empty_) |
| `timeout` | integer | delay in seconds before declaring a timeout (default: `10`) |
| `allow_insecure_tls` | boolean | allow invalid or expired SSL certificates when accessing the InfluxDB API through HTTPS (default: `false`) |

Mapping parameters:

| Name | Type | Description |
| --- | --- | --- |
| `source` | array of strings | list of columns entries to map *sources* on |
| `metric` | array of strings | list of columns entries to map *metrics* on |
| `glue` | string | separator used to join defined columns |

```javascript
{
  "source": ["column:host"],
  "metric": ["name", "column:instance", "column:type", "column:type_instance"],
  "glue": "."
}
```

Note: you should either use `pattern` or `mapping`, but not both.

### KairosDB

| Name | Type | Description |
| --- | --- | --- |
| `url`<br>__required__ | string | URL of the KairosDB instance (without the `/api` path) |
| `aggregators` | array of strings | KairosDB [aggregators](http://kairosdb.github.io/docs/build/html/restapi/Aggregators.html) to use for sampling (default: `["avg","max","min"]`) |
| `source_tags` | array of strings | KairosDB [tags](http://kairosdb.github.io/docs/build/html/restapi/QueryMetricTags.html) to look into for sources (default: `["host","server","device"]`) |
| `timeout` | integer | delay in seconds before declaring a timeout (default: `10`) |
| `allow_insecure_tls` | boolean | allow invalid or expired SSL certificates when accessing the Facette API through HTTPS (default: `false`) |

### RRDtool

| Name | Type | Description |
| --- | --- | --- |
| `path`<br>__required__ | string | base path on the local filesystem where the RRDtool files are stored |
| `pattern`<br>__required__ | string | regular expression (RE2 syntax) describing the pattern mapping *sources*/*metrics* to the filesystem structure under the base directory defined with the `path` setting. `<source>` and `<metric>` regexp named group are mandatory to effectively map a filesystem path to these objects |
| `daemon` | string | rrdcached daemon socket address, see `-l` option in `rrdcached(1)` manual for details |

## Provider Filters

Provider filters allow changing how _sources_ and _metrics_ appear in the catalog, and discard the ones you don’t
want to deal with. Filter rule format:

```javascript
{
  "action": "<action to perform on record (discard|rewrite|sieve)>",
  "target": "<record field to match (any|metric|source)>",
  "pattern": "<regular expression pattern>"
  "into": "<replacement value (for \"rewrite\" action)>"
}
```

Note: regular expressions must follow the [RE2 syntax](https://github.com/google/re2).
## Create a provider

```
POST /api/v1/providers/
```

This endpoint creates a new catalog provider. Required fields:

  * `name` (type _string_): provider name
  * `connector` (type _string_): provider connector type, see `facette -V` output to find which connectors are supported

Optional fields:

  * `description` (type _string_): a description for the provider
  * `settings` (type _object_): connector settings
  * `filters` (type _array of objects_): list of provider filters
  * `priority` (type _integer_): in case multiple providers expose the same metric, the provider with higher priority wins (default: `0`)
  * `refresh_internal` (type _integer_): interval (in seconds) to trigger a periodic refresh of the provider (default: `0`, no refresh)

Caution: in JSON you need to double the escaping character `\` when writing regular expressions (e.g. `\d` → `\\d`).

### Requests


#### Examples

```headers
Content-Type: application/json
```
```javascript
{
  "name": "graphite",
  "description": "Metrics from Graphite",
  "connector": "graphite",
  "settings": {
    "url": "graphite.example.net:8080",
    "pattern": "(?P<source>[^\\\\.]+)\\\\.(?P<metric>.+)"
  },
  "refresh_interval": 3600,
  "filters": [
    {
      "action": "rewrite",
      "target": "source",
      "pattern": "_",
      "into": "."
    }
  ]
}
```
### Responses


```headers
Status: 201 Created
```

## Delete all providers

```
DELETE /api/v1/providers/
```

This endpoint deletes all providers.

If the request header `X-Confirm-Action` is not present or if the instance is *read-only* the operation will be
rejected with `403 Forbidden`.

### Requests

#### Headers

| Name | Description |
| --- | --- |
| X-Confirm-Action | action confirmation flag | 

### Responses


```headers
Status: 204 No Content
```

## List providers

```
GET /api/v1/providers/
```

This endpoint returns providers. If a `filter` query parameter is given, only providers having
their name matching the filter will be returned.

This endpoint supports pagination through the `offset` and `limit` query parameters and sorting using `sort` query
parameter (separated by commas; prefix field name with "-" to reverse sort order).

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| filter | `string` | query | term to filter names on |
| sort | `string` | query | fields to sort results on |
| offset | `integer` | query | offset to return providers from |
| limit | `integer` | query | number of providers to return |

### Responses

#### Headers

| Name | Description |
| --- | --- |
| X-Total-Records | total number of catalog records for this type | 

#### Examples

```headers
Status: 200 OK
```
```javascript
[
  {
    "created": "2017-06-14T06:09:19Z",
    "description": null,
    "enabled": true,
    "id": "e91ac07e-5f74-5845-6a09-4903ecd30995",
    "modified": "2017-06-14T06:12:57Z",
    "name": "collectd"
  }
]
```
## Get a provider

```
GET /api/v1/providers/:id
```

This endpoint returns a provider given its identifier.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| id<br>**required** | `string` | path | identifier of the provider |

### Responses


#### Examples

```headers
Status: 200 OK
```
```javascript
{
  "id": "4654e374-70e8-5621-afab-ac9c1ff91261",
  "name": "kairosdb",
  "description": null,
  "created": "2017-05-11T12:51:07Z",
  "modified": "2017-05-22T07:59:57Z",
  "connector": "kairosdb",
  "settings": {
    "aggregators": [
      "avg"
    ],
    "url": "http://kairosdb.example.net:8080"
  },
  "filters": [
    {
      "action": "discard",
      "target": "metric",
      "pattern": "^kairosdb\\.",
      "into": ""
    },
    {
      "action": "rewrite",
      "target": "source",
      "pattern": "_",
      "into": "."
    },
    {
      "action": "rewrite",
      "target": "metric",
      "pattern": "/avg$",
      "into": ""
    },
    {
      "action": "rewrite",
      "target": "metric",
      "pattern": "\\.value$",
      "into": ""
    },
    {
      "action": "rewrite",
      "target": "metric",
      "pattern": "^(.+)\\.(?:derive|gauge|latency)\\.(.+)",
      "into": "$1.$2"
    }
  ],
  "refresh_interval": 900,
  "priority": 0,
  "enabled": true
}
```
## Update a provider

```
PUT /api/v1/providers/:id
```

This endpoint updates a provider given its identifier. The request body is similar to the _Create a new catalog
provider_ endpoint.

If the instance is *read-only* the operation will be rejected with `403 Forbidden`.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| id<br>**required** | `string` | path | identifier of the provider |

### Responses


```headers
Status: 204 No Content
```

## Partially update a provider

```
PATCH /api/v1/providers/:id
```

This endpoint partially updates a provider given its identifier. The request body is similar to the _Update a
provider_ endpoint, but only specified fields will be modified.

If the instance is *read-only* the operation will be rejected with `403 Forbidden`.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| id<br>**required** | `string` | path | identifier of the provider |

### Responses


```headers
Status: 204 No Content
```

## Delete a provider

```
DELETE /api/v1/providers/:id
```

This endpoint deletes a provider given its identifier.

If the instance is *read-only* the operation will be rejected with `403 Forbidden`.

### Parameters

| Name | Type | In | Description |
| --- | --- | --- | --- |
| id<br>**required** | `string` | path | identifier of the provider |

### Responses


```headers
Status: 204 No Content
```

## Refresh a provider

```
POST /api/v1/providers/:id/refresh
```

This endpoint triggers a catalog refresh for a provider given its identifier.

### Responses


```headers
Status: 204 No Content
```

