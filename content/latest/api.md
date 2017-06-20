---
title: API Documentation
description: API documentation of Facette time series data visualization software
menu:
  main-latest:
    weight: 50
keywords:
- api
- back-end
- date
- documentation
- facette
- glob
- http
- http
- json
- regexp
- restful
- time
version: latest
---

# API Documentation

This documentation describes the RESTful HTTP API exposed by the Facette back-end on which the front-end relies.

Unless otherwise stated, all requests and responses bodies use `application/json` as `Content-Type`. The format is
described in the [RFC 4627][0] document.

## Dates and Times

All dates handled and returned by the API are using the [RFC 3399][1] timestamp format.

Some API enpoints accept a `range` parameter giving the `[-]<number>{y,mo,d,h,m,s}` format. For example, the "last day"
can be expressed with the following expressions:

 * `-1d`
 * `-24h`
 * `-1440m`
 * `-86400s`

It is also possible to combine multiple units, such as `-1h 30m`.

## Filter Patterns

Some API enpoints accept an optional `filter` parameter, its value can take one of the following forms:

 * a [glob][2] pattern (e.g. `glob:host*`)
 * a [regexp][3] pattern (e.g. `regexp:host[13]\.example\.net`)
 * a simple value (e.g. `host1.example.net`)

## Message Responses

If the API is unable to handle a specific request or if any error occurred during its processing, a JSON message
response with additional context is sent along with an proper HTTP status code.

For example, requesting an unknown item (e.g. collection, graph…) upon the API, with an HTTP status code being
`404 Not Found`, the response body will contain:

```javascript
{
   "message": "item not found"
}
```


[0]: http://tools.ietf.org/html/rfc4627
[1]: http://tools.ietf.org/html/rfc3339
[2]: https://golang.org/pkg/path/#Match
[3]: https://github.com/google/re2/wiki/Syntax
