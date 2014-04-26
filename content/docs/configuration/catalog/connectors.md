---
title: "Back-end Connectors"
section: "catalog"
groups:
   - "catalog"
groups_weight: 30
---

# Back-end Connectors

## RRD

The `rrd` connector can read [RRDtool](https://oss.oetiker.ch/rrdtool) files to extract stored metrics.

Example origin definition using the `graphite` connector:

```javascript
{
    "connector": {
        "type": "rrd",
        "path": "/var/lib/collectd/rrd",
        "pattern": "(?P<source>[^/]+)/(?P<metric>.+).rrd"
    }
}
```

<span class="fa fa-warning"></span> Caution: in JSON you need to escape the escaping character `\` when writing regular
expressions (e.g. `\d`&nbsp;→&nbsp;`\\d`).

Supported settings:

* `path`: base path on the local filesystem where the RRDtool files are stored
* `pattern`: regular expression (using [RE2 syntax](https://code.google.com/p/re2/wiki/Syntax)) describing the pattern
mapping *sources*/*metrics* to the filesystem structure under the base directory defined with the `path` setting.
`<source>` and `<metric>` regexp named group are mandatory to effectively map a filesystem path to these objects.

## Graphite

The `graphite` connector can query a [Graphite-web HTTP API](https://graphite.readthedocs.org/en/latest/render_api.html)
to access metrics received by its Carbon daemon. When collecting entries from Graphite, the first level of the metric
path of the [Graphite format](https://graphite.readthedocs.org/en/latest/feeding-carbon.html#the-plaintext-protocol) is
mapped to the *source* and the rest of the metric path to the *metric*.

Example origin definition using the `graphite` connector:

```javascript
{
    "connector": {
        "type": "graphite",
		"url": "http://my.graphite.server.example.net/"
    }
}
```

Supported settings:

* `url`: URL of the Graphite webapp (without the `/api` path)
* `allow_insecure_tls`: when accessing the Graphite API through HTTPS, allow invalid or expired SSL certificates (default: `false`)
