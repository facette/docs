---
title: "Provider Connectors"
menu:
  main:
    parent: "Configuring Facette"
    weight: 10
keywords:
   - "catalog"
   - "configuration"
   - "connector"
   - "documentation"
   - "facette"
   - "filter"
   - "graphite"
   - "https"
   - "origin"
   - "provider"
   - "regexp"
   - "rrdcached"
   - "rrdtool"
   - "settings"
   - "tls"
   - "upstream"
---

# Provider Connectors

## RRD

The **RRD** connector (type `rrd`) can read [RRDtool][0] files to extract stored metrics.

Example *provider* definition using the **RRD** connector:

```javascript
{
    "connector": {
        "type": "rrd",
        "path": "/var/lib/collectd/rrd",
        "pattern": "(?P<source>[^/]+)/(?P<metric>.+).rrd",
        "daemon": "unix:/var/run/rrdcached.sock"
    },

    …
}
```

<span class="fa fa-warning"></span> Caution: in JSON you need to double the escaping character `\` when writing regular
expressions (e.g. `\d`&nbsp;→&nbsp;`\\d`).

Mandatory settings:

 * `path` (type _string_): base path on the local filesystem where the RRDtool files are stored
 * `pattern` (type _string_): regular expression ([RE2 syntax][1]) describing the pattern mapping *sources*/*metrics*
    to the filesystem structure under the base directory defined with the `path` setting.
    `<source>` and `<metric>` regexp named group are mandatory to effectively map a filesystem path to these objects

Optional settings:

 * `daemon` (type _string_): rrdcached daemon socket address, see `-l` option in `rrdcached(1)` manual for details

## Graphite

The **Graphite** connector (type `graphite`) can query a [Graphite-web HTTP API][2] to access metrics received by its
Carbon daemon.

When collecting entries from Graphite, the first level of the metric path of the
[Graphite format][3] is mapped to the *source* and the rest of the metric path to the *metric* (e.g. for a metric path
`www1.network.eth0.if_octets.tx`, *source* is “www1” and *metric* is “network.eth0.if_octets.tx”).

Example *provider* definition using the **Graphite** connector:

```javascript
{
    "connector": {
        "type": "graphite",
		"url": "http://my.graphite.server.example.net/"
    },

    …
}
```

Mandatory settings:

 * `url` (type _string_): URL of the Graphite webapp (without the `/api` path)

Optional settings:

 * `allow_insecure_tls` (type _boolean_): allow invalid or expired SSL certificates when accessing the Graphite API
 through HTTPS, (default: `false`)
 * `timeout` (type _integer_): delay in seconds before declaring a timeout (default: `10`)

## Facette

The **Facette** connector (type `facette`) can query another Facette instance to retrieve and include the upstream
catalog to inherit its *origins*, *sources* and *metrics*; the connector then forwards plot queries to the upstream
instance when remote metrics are requested in a local graph definition.

This feature can be useful in various cases, for exemple when your metrics are sharded into several nodes for
performance/space reasons, or if your want to aggregate metrics from different tools in the same Facette instance.

Example *provider* definition using the **Facette** connector:

```javascript
{
    "connector": {
        "type": "facette",
        "upstream": "http://demo.facette.io/"
    },

    …
}
```

Mandatory settings:

 * `upstream` (type _string_): URL of the upstream Facette instance (without the `/api` path)

Optional settings:

 * `timeout` (type _integer_): delay in seconds before declaring a timeout (default: `10`)


[0]: https://oss.oetiker.ch/rrdtool
[1]: https://code.google.com/p/re2/wiki/Syntax
[2]: https://graphite.readthedocs.org/en/latest/render_api.html
[3]: https://graphite.readthedocs.org/en/latest/feeding-carbon.html#the-plaintext-protocol
