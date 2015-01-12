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
   - "kairosdb"
   - "https"
   - "influxdb"
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

You have to set a regular expression pattern that matches the Carbon [metric path format][3] in order to translate
original Graphite series names into catalog *source* and *metrics* (e.g. for a metric path
`www1.network.eth0.if_octets.tx`, the *source* would be “www1” and the *metric* “network.eth0.if_octets.tx”).

Example *provider* definition using the **Graphite** connector:

```javascript
{
    "connector": {
        "type": "graphite",
        "url": "http://my.graphite.server.example.net/",
        "pattern": "(?P<source>[^\\.]+)\\.(?P<metric>.+)"
    },

    …
}
```

Mandatory settings:

 * `url` (type _string_): URL of the Graphite webapp (without the `/api` path)
 * `pattern` (type _string_): regular expression ([RE2 syntax][1]) describing the pattern mapping *sources*/*metrics*
    to the metrics series names.
    `<source>` and `<metric>` regexp named group are mandatory to effectively map a series name to these objects

Optional settings:

 * `allow_insecure_tls` (type _boolean_): allow invalid or expired SSL certificates when accessing the Graphite API
 through HTTPS, (default: `false`)
 * `timeout` (type _integer_): delay in seconds before declaring a timeout (default: `10`)

## KairosDB

The **KairosDB** connector (type `kairosdb`) can query a [KairosDB REST API][5] to access time series.

You don't need pattern matching, because catalog *source* and *metric* are modelled distinguishable in KairosDB.
The *metric* is accessible directly and the *source* is modelled as a named tag list for each metric. This list defaults to `{"host", "name"}` at the moment. Means that *source* is build from metrics `host` tag or `name` tag if `host` is not applied. Because C*/KairosDB could store high frequency series, it makes sense to retrieve plots by aggregation. The standard aggregation for each metric actually defaults to `{ "name": "max", "sampling": { "value": 5, "unit": "minutes" } }` (the max value for each 5min is returned). Both, source tag list and aggregation function, needs definitely be configurable in the future.

Example *provider* definition using the **KairosDB** connector:

```javascript
{
    "connector": {
        "type": "kairosdb",
        "url": "http://localhost:8080/",
    },

    …
}
```

Mandatory settings:

 * `url` (type _string_): URL of the KairosDB REST API (without the `/api/...` path)
 
Optional settings:

 * `allow_insecure_tls` (type _boolean_): allow invalid or expired SSL certificates when accessing the Graphite API
 through HTTPS, (default: `true`)
 * `timeout` (type _integer_): delay in seconds before declaring a timeout (default: `10`)

API calls used:

 * `/api/v1/metricnames` and `/api/v1/datapoints/query/tags` for populating the catalog
 * `/api/v1/datapoints/query` for retrieving the plots

## InfluxDB

The **InfluxDB** connector (type `influxdb`) can query a InfluxDB database through the [HTTP API][4] to access stored
metrics.

You have to set a regular expression pattern that matches the InfluxDB series names in order to translate
them into catalog *source* and *metrics* (e.g. for a series named `webapp1.req.5xx`, the *source* would be “webapp1”
and the *metric* “req.5xx”).

Example *provider* definition using the **Graphite** connector:

```javascript
{
    "connector": {
        "type": "influxdb",
        "host": "my.influxdb.server.example.net:8086",
        "database": "webapps",
        "pattern": "(?P<source>[^\\.]+)\\.(?P<metric>.+)"
    },

    …
}
```

Mandatory settings:

 * `database` (type _string_): InfluxDB database to query series from
 * `pattern` (type _string_): regular expression ([RE2 syntax][1]) describing the pattern mapping *sources*/*metrics*
    to the metrics series names.
    `<source>` and `<metric>` regexp named group are mandatory to effectively map a series name to these objects

Optional settings:

 * `host` (type _string_): address of the InfluxDB API (default: `"localhost:8086"`)
 * `username` (type _string_): username to connect to the database (default: `"root"`)
 * `password` (type _string_): password to connect to the database (default: `"root"`)

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
[4]: http://influxdb.com/docs/v0.8/api/reading_and_writing_data.html
[5]: http://kairosdb.github.io/kairosdocs/restapi/
