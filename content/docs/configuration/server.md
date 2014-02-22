---
title: "Server Configuration"
section: "configuration"
groups:
   - "configuration"
groups_weight: 10
---

# Server Configuration

## Base Configuration

The main configuration file is passed using `-c` argument when launching the `facette` server. Is not specified, its
default location is `/etc/facette/facette.json`.

Mandatory settings:

 * __bind__: the address and port to listen on (type: `string`)
 * __base_dir__: the base Facette application directory holding static files (type: `string`)
 * __data_dir__: the directory used to store application data (type: `string`)
 * __origin_dir__: the path to the folder containing origin configuration files (type: `string`)
 * __auth__: the settings used by the authentication back-end (type: `object`)

Optional settings:

 * __pid_file__: the path to the pid file (type: `string`)
 * __access_log__: the path to the file to store access logging information (type: `string`, default: `stdout`)
 * __server_log__: the path to the file to store Facette application logging data (type: `string`, default: `stdout`)
 * __url_prefix__: the URL prefix behind which the server is located (type: `string`)
 * __scales__: a list of scaling presets (type: `array`)

Example:

```javascript
{
    "bind": ":12003",
    "base_dir": "/usr/share/facette",
    "data_dir": "/var/lib/facette",
    "pid_file": "/var/run/facette/facette.pid",
    "origin_dir": "/etc/facette/origins",
    "access_log": "/var/log/facette/access.log",
    "server_log": "/var/log/facette/server.log",
    "auth": {
        "type": "simple",
        "path": "/etc/facette/auth.json"
    }
}
```

## Scaling Presets

When creating graphs, it is possible to apply `scale` factor on series and groups. These presets are provided when
selecting this factor.

The `scales` setting accepts as value an `array` of `string` and `float` pairs.

Example:

```javascript
"scales": [
    [ "Bits → Bytes", 0.125 ],
    [ "Bytes → Bits", 8 ],
    [ "× 10³", 1e+3 ],
    [ "× 10⁶", 1e+6 ],
    [ "× 10⁹", 1e+9 ],
    [ "× 10¹²", 1e+12 ],
    [ "÷ 10³", 1e-3 ],
    [ "÷ 10⁶", 1e-6 ],
    [ "÷ 10⁹", 1e-9 ],
    [ "÷ 10¹²", 1e-12 ]
]
```
