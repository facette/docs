---
title: "Filters"
section: "catalog"
groups:
   - "catalog"
groups_weight: 30
---

# Filters

Facette *filters* allows you to change how *origins*, *sources* and *metrics* appear in the Facette catalog, and
discard the ones you don't want to deal with. The `filters` section of a *provider* definition defines rules that are
evaluated at *origins* inventory, renaming or discarding specific *sources* or *metrics* using regular expressions
([RE2 syntax][0]).

<span class="fa fa-warning"></span> Caution: in JSON you need to double the escaping character `\` when writing regular
expressions (e.g. `\d`&nbsp;→&nbsp;`\\d`).

Filter rule settings:

 * `target` (type: _string_): object to target (`origin`, `source` or `metric`)
 * `pattern` (type: _string_): pattern to match
 * `rewrite` (type: _string_): replacement pattern
 * `discard` (type: *boolean*): discarding flag

Supported `target` values (type _string_):

 * `all`: match filter `pattern` on all names (default)
 * `origin`: match filter `pattern` on *origin* names only
 * `source`: match filter `pattern` on *source* names only
 * `metric`: match filter `pattern` on *metric* names only

## Examples

Discard all entries whose *source* match the pattern “host3.example.net”:

```javascript
{
    "connector": {
        …
    },

    "filters": [
        { "target": "source", "pattern": "host3.example.net", "discard": true }
    ]
}
```

Rewrite sources (such as “host3_example_net” becomes “host3.example.net”), and metrics (such as
“cpu-0.cpu.system.value” becomes “cpu.0.system”):

```javascript
{
    "connector": {
        …
    },

    "filters": [
        { "target": "source", "pattern": "_", "rewrite": "." },
        { "target": "metric", "pattern": "^cpu-(\\d+)\\.cpu-(.+)\\.value$", "rewrite": "cpu.$1.$2" }
    ]
}
```

<span class="fa fa-info-circle"></span> Note: filtering rules are evaluated in the order you define them, so watch out
for ordering issues when defining “chained” rules, as a *origin*/*source*/*metric* name may have been previously
rewritten and a subsequent rule pattern may not match its original name.


[0]: https://code.google.com/p/re2/wiki/Syntax
