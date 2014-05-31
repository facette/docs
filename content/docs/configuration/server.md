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

 * `bind` (type *string*): network address and port to listen on (format: `"[addr]:port"`)
 * `base_dir` (type *string*): base Facette application directory holding static files
 * `data_dir` (type *string*): directory used to store application data
 * `origin_dir` (type *string*): path to the folder containing origin configuration files

Optional settings:

 * `pid_file` (type *string*): path to the PID file
 * `server_log` (type *string*): path to the file to store Facette application logging data (default: `"stdout"`)
 * `url_prefix` (type *string*): URL prefix behind which the server is located if not running at the root of the HTTP
   virtual host (e.g. `"/facette"`)

Example:

```javascript
{
    "bind": ":12003",
    "base_dir": "/usr/share/facette",
    "data_dir": "/var/lib/facette",
    "pid_file": "/var/run/facette/facette.pid",
    "origin_dir": "/etc/facette/origins",
    "server_log": "/var/log/facette/server.log",

    ...
}
```
