---
title: "API Documentation"
section: "docs"
groups:
   - "docs"
groups_weight: 50
---

# API Documentation

## General Information

This documentation describes the RESTful web API coming along with Facette web front-end.

Unless otherwise stated, all requests and responses bodies use `application/json` as `Content-Type`. The format is
described in the [RFC 4627][0] document.

### Dates and Times

The dates returned by the API are using the [RFC 3399][1] timestamp format.

### Filter Patterns

Some of the API calls can take a filter as optional parameter, those filters can be:

 * a [match][2] pattern (e.g. `glob:host*`)
 * a [regexp][3] pattern (e.g. `regexp:host[13]\.example\.net`)
 * a simple value (e.g. `host1.example.net`)

### Message Responses

When the API is unable to handle the received request or if an error occurred during its processing, a JSON message
response is sent along with an HTTP status code.

For example, if an unknown resource (e.g. origin, source…) is requested upon the API, with an HTTP status code being
`404 Not Found`, the response would look like:

```javascript
{
    "message": "Unable to find requested resource"
}
```

## Documents

 * [Server API](/docs/api/server): access server related data and methods
 * [Catalog API](/docs/api/catalog): retrieve information about existing origins, sources and metrics
 * [Library API](/docs/api/library): manage library items (e.g. groups, charts and collections)
 * [Status](/docs/api/status): list of API HTTP response status codes


[0]: http://tools.ietf.org/html/rfc4627
[1]: http://tools.ietf.org/html/rfc3339
[2]: http://golang.org/pkg/path/#Match
[3]: https://code.google.com/p/re2/wiki/Syntax
