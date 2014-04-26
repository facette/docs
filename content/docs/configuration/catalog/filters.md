---
title: "Filters"
section: "catalog"
groups:
   - "catalog"
groups_weight: 30
---

# Filters

Facette allows you to describe how *sources* and *metrics* appear in the Facette catalog, and discard the ones you
don't want to deal with thanks to *filters*. The `filters` section of an *origin* allows you to defined rules that
can rename or discard specific *sources* or *metrics* using regular expressions
([RE2 syntax](https://code.google.com/p/re2/wiki/Syntax)).

<span class="fa fa-warning"></span> Caution: in JSON you need to escape the escaping character `\` when writing regular
expressions (e.g. `\d`&nbsp;→&nbsp;`\\d`).

Filter rule settings:

 * `target` (type: *string*): object to target (`source` or `metric`)
 * `pattern` (type: *string*): pattern to match
 * `rewrite` (type: *string*): replacement pattern
 * `discard` (type: *boolean*): discarding flag

Supported `target` values (type *string*):

 * `source`: apply filter `pattern` on *source* names only
 * `metric`: apply filter `pattern` on *metric* names only
 * `both`: apply rule on both *source* and *metric* names (default)

## Examples

Discard all entries whose *source* match the pattern "host3.example.net":

```javascript
{
    "filters": [
        { "target": "source", "pattern": "host3.example.net", "discard": true }
    ]
}
```

Rewrite sources (such as "host3_example_net" becomes "host3.example.net"), and metrics (such as
"cpu-0.cpu.system.value" becomes "cpu.0.system"):

```javascript
{
    "filters": [
        { "target": "source", "pattern": "_", "rewrite": "." },
        { "target": "metric", "pattern": "^cpu-(\\d+)\\.cpu-(.+)\\.value$", "rewrite": "cpu.$1.$2" }
    ]
}
```

Note: filtering rules are evaluated in the order you define them, so watch out for ordering issues when defining
"chained" rules, as a *source*/*metric* name may have been previously rewritten and a subsequent rule pattern may not
match its original name.
