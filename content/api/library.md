---
title: "Library API"
menu:
  main:
    parent: "API Documentation"
    weight: 30
keywords:
   - "api"
   - "catalog"
   - "documentation"
   - "facette"
   - "group"
   - "library"
   - "metric"
   - "origin"
   - "source"
---

# Library API

All library items are identified by an [universally unique identifier][0] (UUID), each 36 characters long.

## Groups

### List groups

```
GET /api/v1/library/sourcegroups/
GET /api/v1/library/metricgroups/
```

Returns an array of objects listing the available groups.

Optional parameters:

 * `filter` (_string_): the [pattern](/api/#filter-patterns) to apply on group names
 * `limit` (_integer_): the maximum number of items to return
 * `offset` (_integer_): the offset to start fetching from

Response:

```javascript
[
    {
        "id": "386c8361-517f-404e-6c34-870983ab66e8",
        "name": "group0",
        "description": "A great group description.",
        "modified": "2013-01-02T12:34:56+01:00"
    }
]
```

A `X-Total-Records` HTTP header containing the total number of records is returned along with the response.

### Get a single group

```
GET /api/v1/library/sourcegroups/<id>
GET /api/v1/library/metricgroups/<id>
```

Returns a group object with its name, description and matching rules entries.

Response:

```javascript
{
    "id": "386c8361-517f-404e-6c34-870983ab66e8",
    "name": "group0",
    "description": "A great group description.",
    "entries": [
        {
            "origin": "origin0",
            "pattern": "glob:example.*"
        }
    ]
}
```

### Create a new group

```
POST /api/v1/library/sourcegroups/
POST /api/v1/library/metricgroups/
```

Takes a group from the request body and stores it in the library, then returns a `Location` HTTP header pointing to the
newly created item location.

Optional parameters:

 * `inherit` (_string_): the UUID of the group item to inherit from

Additional status codes:

 * __201 Created:__ the group item has been successfully created
 * __404 Not Found:__ the group item to inherit from does not exist
 * __409 Conflict:__ another group with the same name already exists

See _Get a single group_ above for group object format.

### Update an existing group

```
PUT /library/sourcegroups/<id>
PUT /library/metricgroups/<id>
```

Takes a group from the request body and overwrites an existing library group item.

Additional status codes:

 * __404 Not Found:__ the item to overwrite does not exist
 * __409 Conflict:__ another group with the same name already exists

See _Get a single group_ above for group object format.

### Delete an existing group

```
DELETE /library/sourcegroups/<id>
DELETE /library/metricgroups/<id>
```

Removes an existing group item from the library.

Additional status codes:

 * __404 Not Found:__ the item to delete does not exist

### Expand query tuples

```
POST /api/v1/library/expand
```

Takes an array of query tuples from the request body and returns their expanded versions.

A query tuple consists of a list of 3 values: origin, source and metric.

When querying the back-end, both source and metric fields can be a reference to a group, then beginning with `group:`
prefix.

```javascript
[
        ["origin0", "host1.renm.org", "group:group0"]
]
```

Response:

```javascript
[
    [
        ["origin0", "host1.renm.org", "metric0"],
        ["origin0", "host1.renm.org", "metric1"],
        ["origin0", "host1.renm.org", "metric2"],
        ["origin0", "host1.renm.org", "metric3"]
    ]
]
```

## Scales

### List scales

```
GET /api/v1/library/scales/
```

Returns an array of objects listing the available scales.

Optional parameters:

 * `filter` (_string_): the [pattern](/api/#filter-patterns) to apply on group names
 * `limit` (_integer_): the maximum number of items to return
 * `offset` (_integer_): the offset to start fetching from

Response:

```javascript
[
    {
        "id": "95e7f164-9ad1-4e7a-7e44-02783f1f3c2c"
        "name": "scale0",
        "description": "A great scale description.",
        "modified": "2013-01-02T12:34:56+01:00"
    }
]
```

A `X-Total-Records` HTTP header containing the total number of records is returned along with the response.

### Get a single scale

```
GET /api/v1/library/scales/<id>
```

Returns a scale object with its name, description and matching rules entries.

Response:

```javascript
{
    "id": "95e7f164-9ad1-4e7a-7e44-02783f1f3c2c"
    "name": "scale0",
    "description": "A great scale description.",
    "value": 1.345
}
```

### Create a new scale

```
POST /api/v1/library/scales/
```

Takes a scale from the request body and stores it in the library, then returns a `Location` HTTP header pointing to the
newly created item location.

Optional parameters:

 * `inherit` (_string_): the UUID of the scale item to inherit from

Additional status codes:

 * __201 Created:__ the scale item has been successfully created
 * __404 Not Found:__ the scale item to inherit from does not exist
 * __409 Conflict:__ another scale with the same name already exists

See _Get a single scale_ above for scale object format.

### Update an existing scale

```
PUT /library/scales/<id>
```

Takes a scale from the request body and overwrites an existing library scale item.

Additional status codes:

 * __404 Not Found:__ the item to overwrite does not exist
 * __409 Conflict:__ another scale with the same name already exists

See _Get a single scale_ above for scale object format.

### Delete an existing scale

```
DELETE /library/scales/<id>
```

Removes an existing scale item from the library.

Additional status codes:

 * __404 Not Found:__ the item to delete does not exist

### Get scales values

```
GET /api/v1/library/scales/values
```

Returns an array of objects listing the available scales along with their names and values.

Response:

```javascript
[
    {
        "name": "scale0",
        "value": 1.234
    }
]
```

## Units _new in version 0.2_

### List units

```
GET /api/v1/library/units/
```

Returns an array of objects listing the available units.

Optional parameters:

 * `filter` (_string_): the [pattern](/api/#filter-patterns) to apply on group names
 * `limit` (_integer_): the maximum number of items to return
 * `offset` (_integer_): the offset to start fetching from

Response:

```javascript
[
    {
        "id": "8d07dedd-cfaf-4041-a625-12a390e76f86"
        "name": "unit0",
        "description": "A great unit description.",
        "modified": "2013-01-02T12:34:56+01:00"
    }
]
```

A `X-Total-Records` HTTP header containing the total number of records is returned along with the response.

### Get a single unit

```
GET /api/v1/library/units/<id>
```

Returns a unit object with its name, description and matching rules entries.

Response:

```javascript
{
    "id": "8d07dedd-cfaf-4041-a625-12a390e76f86"
    "name": "unit0",
    "description": "A great unit description.",
    "value": 1.345
}
```

### Create a new unit

```
POST /api/v1/library/units/
```

Takes a unit from the request body and stores it in the library, then returns a `Location` HTTP header pointing to the
newly created item location.

Optional parameters:

 * `inherit` (_string_): the UUID of the unit item to inherit from

Additional status codes:

 * __201 Created:__ the unit item has been successfully created
 * __404 Not Found:__ the unit item to inherit from does not exist
 * __409 Conflict:__ another unit with the same name already exists

See _Get a single unit_ above for unit object format.

### Update an existing unit

```
PUT /library/units/<id>
```

Takes a unit from the request body and overwrites an existing library unit item.

Additional status codes:

 * __404 Not Found:__ the item to overwrite does not exist
 * __409 Conflict:__ another unit with the same name already exists

See _Get a single unit_ above for unit object format.

### Delete an existing unit

```
DELETE /library/units/<id>
```

Removes an existing unit item from the library.

Additional status codes:

 * __404 Not Found:__ the item to delete does not exist

### Get units labels

```
GET /api/v1/library/units/labels
```

Returns an array of objects listing the available units along with their names and labels.

Response:

```javascript
[
    {
        "name": "unit0",
        "label": "A"
    }
]
```

## Graphs

### List graphs

```
GET /api/v1/library/graphs/
```

Returns an array of objects listing the available graphs.

Optional parameters:

 * `collection` (_string_): the identifier of the collection to filter on
 * `filter` (_string_): the [pattern](/api/#filter-patterns) to apply on graph names
 * `limit` (_integer_): the maximum number of items to return
 * `offset` (_integer_): the offset to start fetching from
 * `templates` (_integer_): flag for returning graph templates (`1` = yes)

Response:

```javascript
[
    {
        "id": "909fe2df-3064-4ee2-5f52-4eca2c953c76",
        "name": "graph0",
        "description": "A great graph description.",
        "modified": "2013-01-02T12:34:56+01:00"
    }
]
```

A `X-Total-Records` HTTP header containing the total number of records is returned along with the response.

### Get a single graph

```
GET /api/v1/library/graphs/<id>
```

Returns a graph object with its name, description, type and groups definitions.

Response:

```javascript
{
    "id": "909fe2df-3064-4ee2-5f52-4eca2c953c76",
    "name": "graph0",
    "description": "A great graph description.",
    "type": 1,
    "groups": [
        {
            "name": "serie0",
            "type": 0,
            "stack_id": 0,
            "series": [
                {
                    "name": "serie0",
                    "origin": "origin0",
                    "source": "source0",
                    "metric": "metric0",
                    "options": {
                        "scale": 1.234
                    }
                }
            ],
            "options": {}
        }
    ],
    "stack_mode": 0,
    "unit_legend": "A great legend",
    "unit_type": 2
}
```

Requesting a linked graph (using a template):

```javascript
{
  "id": "34a15691-5872-462f-7c42-177c18dd8a00",
  "name": "server1.example.net - load",
  "description": "Load average for server1.example.net",
  "template": false,
  "link": "dcde7cf8-f637-4303-592e-402ba3e9f017",
  "attributes": {
    "source": "server1.example.net"
  }
}
```

Graph types:

 * `1`: area
 * `2`: line

Stack modes:

 * `1`: none
 * `2`: mormal
 * `3`: percent

Unit types:

 * `1`: fixed
 * `2`: metric system

Group and serie options:

 * `scale` (_float_): scale factor to apply on a serie or a group
 * `unit` (_string_): legend label to set for a serie or a group

### Create a new graph

```
POST /api/v1/library/graphs/
```

Takes a graph from the request body and stores it in the library, then returns a `Location` HTTP header pointing to the
newly created item location.

Optional parameters:

 * `inherit` (_string_): the UUID of the graph item to inherit from

Additional status codes:

 * __201 Created:__ the graph item has been successfully created
 * __404 Not Found:__ the graph item to inherit from does not exist
 * __409 Conflict:__ another graph with the same name already exists

See _Get a single graph_ above for graph object format.

### Update an existing graph

```
PUT /library/graphs/<id>
```

Takes a graph from the request body and overwrites an existing library graph item.

Additional status codes:

 * __404 Not Found:__ the item to overwrite does not exist
 * __409 Conflict:__ another group with the same name already exists

See _Get a single graph_ above for graph object format.

### Delete an existing graph

```
DELETE /library/graphs/<id>
```

Removes an existing graph item from the library.

Additional status codes:

 * __404 Not Found:__ the item to delete does not exist

## Collections

### List collections

```
GET /api/v1/library/collections/
```

Returns an array of objects listing the available collections.

Optional parameters:

 * `exclude` (_string_): the identifier of the collection to exclude from listing
 * `filter` (_string_): the [pattern](/api/#filter-patterns) to apply on collection names
 * `limit` (_integer_): the maximum number of items to return
 * `offset` (_integer_): the offset to start fetching from
 * `parent` (_string_): the identifier of the parent collection to filter on (use the string `null` for top-level
   collections)

Response:

```javascript
[
    {
        "id": "916f955a-752c-468f-61b3-ace173a6d2da",
        "name": "collection0",
        "description": "A great collection description.",
        "parent": null,
        "has_children": false,
        "modified": "2013-01-02T12:34:56+01:00"
    }
]
```

A `X-Total-Records` HTTP header containing the total number of records is returned along with the response.

### Get a single collection

```
GET /api/v1/library/collections/<id>
```

Returns a collection object with its name, description and graphs entries.

Response:

```javascript
{
    "id": "916f955a-752c-468f-61b3-ace173a6d2da",
    "name": "collection0",
    "description": "A great collection description.",
    "entries": [
        {
            "id": "909fe2df-3064-4ee2-5f52-4eca2c953c76",
            "options": {
                "title": "Chart title",
                "sample": "400",
                "range": "-30d",
                "percentiles": "95",
                "constants": ""
            }
        }
    ]
}
```

### Create a new collection

```
POST /api/v1/library/collections/
```

Takes a collection from the request body and stores it in the library, then returns a `Location` HTTP header pointing to the
newly created item location.

Optional parameters:

 * `inherit` (_string_): the UUID of the collection item to inherit from

Additional status codes:

 * __201 Created:__ the collection item has been successfully created
 * __404 Not Found:__ the collection item to inherit from does not exist
 * __409 Conflict:__ another collection with the same name already exists

See _Get a single collection_ above for group object format.

### Update an existing collection

```
PUT /library/collections/<id>
```

Takes a collection from the request body and overwrites an existing library collection item.

Additional status codes:

 * __404 Not Found:__ the item to overwrite does not exist
 * __409 Conflict:__ another group with the same name already exists

See _Get a single collection_ above for group object format.

### Delete an existing collection

```
DELETE /library/collections/<id>
```

Removes an existing collection item from the library.

Additional status codes:

 * __404 Not Found:__ the item to delete does not exist


### Examples

To create a source group using the API:

```
$ curl -i -X POST -H 'Content-Type: application/json' -d '{
    "name": "group0",
    "description": "A great group description.",
    "entries": [
        {
            "origin": "origin0",
            "pattern": "glob:example.*"
        }
    ]
}' http://127.0.0.1:12003/api/v1/library/sourcegroups/
HTTP/1.1 201 Created
Cache-Control: private, max-age=0
Date: Thu, 15 Jan 2015 18:01:05 GMT
Expires: Thu, 15 Jan 2015 18:01:05 GMT
Location: /api/v1/library/sourcegroups/9c1133ee-b685-4735-4cf9-529c7eb4bd23
Content-Length: 0
Content-Type: text/plain; charset=utf-8
```

<span class="fa fa-info-circle"></span> Note: don't specify a `id` parameter when creating a resource, the back-end assigns an unique identifier at creation.

The URI of the resource created is provided by the `Location` header. To retrieve the group just created:

```
$ curl http://127.0.0.1:12003/api/v1/library/sourcegroups/9c1133ee-b685-4735-4cf9-529c7eb4bd23
{"id":"9c1133ee-b685-4735-4cf9-529c7eb4bd23","name":"group0","description":"A great group description.","entries":[{"pattern":"glob:example.*","origin":"origin0"}]}
```

[0]: http://en.wikipedia.org/wiki/Universally_unique_identifier
