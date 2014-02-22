---
title: "API Documentation"
section: "docs"
groups:
   - "docs"
groups_weight: 40
---

# API Documentation

## General Information

This documentation describes the RESTful web API coming along with Facette web front-end.

An authentication is required when modifying the server configuration or altering the stored data. See
[Authentication Configuration](/docs/configuration/authentication) for further details.

Unless otherwise stated, all requests and responses bodies use `application/json` as `Content-Type`. The format is
described in the [RFC 4627][0] document.

### Dates and Times

The dates returned by the API are using the [RFC 3399][1] timestamp format.

### Filter Patterns

Some of the API calls can take a filter as optional parameter, those filters can be:

 * a [match][2] pattern (e.g. `glob:host*`)
 * a [regexp][3] pattern (e.g. `regexp:host[13]\.example\.net`)
 * a simple value (e.g. `host1.example.net`)

## Documents

 * [Server API](/docs/api/server): access server related data and methods
 * [Catalog API](/docs/api/catalog): retrieve information about existing origins, sources and metrics
 * [Library API](/docs/api/library): manage library items (e.g. groups, charts and collections)


[0]: http://www.ietf.org/rfc/rfc4627.txt
[1]: http://www.ietf.org/rfc/rfc3339.txt
[2]: http://golang.org/pkg/path/#Match
[3]: https://code.google.com/p/re2/wiki/Syntax
