---
title: API Documentation
description: API documentation of Facette time series data visualization software (version 0.3)
menu:
  main-prev:
    weight: 50
keywords:
- api
- catalog
- documentation
- facette
- filter
- graph
- http
- json
- library
- metric
- origin
- plot
- regexp
- rest
- restful
- source
- time series
version: prev
---

# API Documentation

## General Information

This documentation describes the RESTful web API exposed by the Facette back-end and used by the web front-end.

Unless otherwise stated, all requests and responses bodies use `application/json` as `Content-Type`. The format is
described in the [RFC 4627][0] document.

### Dates and Times

The dates returned by the API are using the [RFC 3399][1] timestamp format.

Some of the API calls can specify a `range` parameter accepting the format `[-]<number>{y,mo,d,h,m,s}`. For example,
the last day can be expressed with the following expressions:

 * `-1d`
 * `-24h`
 * `-1440m`
 * `-86400s`

It is also possible to combine multiple units, such as `-1h30m`.


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

 * [Server API](/api/server): access server related data and methods
 * [Catalog API](/api/catalog): retrieve information about existing origins, sources and metrics
 * [Library API](/api/library): manage library items (e.g. groups, charts and collections)
 * [Plots API](/api/plots): retrieve graph plots
 * [Status](/api/status): list of API HTTP response status codes


[0]: http://tools.ietf.org/html/rfc4627
[1]: http://tools.ietf.org/html/rfc3339
[2]: http://golang.org/pkg/path/#Match
[3]: https://code.google.com/p/re2/wiki/Syntax
