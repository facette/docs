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

 * `bind` (type _string_): network address and port to listen on (format: `"[addr]:port"`)
 * `base_dir` (type _string_): base Facette application directory holding static files
 * `data_dir` (type _string_): directory used to store application data
 * `providers_dir` (type _string_): path to the folder containing providers configuration files

Optional settings:

 * `pid_file` (type _string_): path to the PID file
 * `url_prefix` (type _string_): URL prefix behind which the server is located if not running at the root of the HTTP
   virtual host (e.g. `"/facette"`)

Example:

```javascript
{
    "bind": ":12003",
    "base_dir": "/usr/share/facette",
    "providers_dir": "/etc/facette/providers",
    "data_dir": "/var/lib/facette",
    "pid_file": "/var/run/facette/facette.pid",

    ...
}
```
