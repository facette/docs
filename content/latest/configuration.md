---
title: Configuration
description: Configuration of Facette time series data visualization software
menu:
  main-latest:
   weight: 30
keywords:
- back-end
- backend
- configuration
- documentation
- driver
- facette
- front-end
- log
- mysql
- postgresql
- settings
- socket
- sqlite
- syslog
- tcp
- unix
- yaml
version: "latest"
---

# Configuration

The configuration file uses [YAML](http://yaml.org/) format and is provided to the service with the `-c` argument. If
not specified, Facette will look for the `/etc/facette/facette.yaml` file.

For a complete example configuration file, see
[facette.yaml](https://raw.githubusercontent.com/facette/facette/master/docs/examples/facette.yaml).

## Main Settings

| Key                       |  Type  | Default           | Description                                                                                                 |
|:--------------------------|:------:|:------------------|:------------------------------------------------------------------------------------------------------------|
| `cache.path`              | string | `var/cache`       | Cache directory path                                                                                        |
| `defaults.time_range`     | string | `-1h`             | Default time range for plots retrieval                                                                      |
| `http.base_path`          | string |                   | Root path behind which the service is located (e.g. `/facette`)                                             |
| `http.enable_ui`          |  bool  | `true`            | Front-end activation flag                                                                                   |
| `http.expose_version`     |  bool  | `false`           | Prevent build details from being exposed in API                                                             |
| `http.graceful_timeout`   |  int   | `30`              | Timeout before forcefully shutdown remaining connections                                                    |
| `http.listen`             | string | `localhost:12003` | Socket to listen on (use `unix:/path/to/facette.sock?mode=0644&user=facette&group=facette` for UNIX socket) |
| `http.read_only`          |  bool  | `false`           | Read-only flag, preventing modifications through API calls                                                  |
| `logger.file.level`       | string | `info`            | File logging level (`error`, `warning`, `notice`, `info` or `debug`)                                        |
| `logger.file.path`        | string |                   | Logging file path (if `-` logging goes to *stdout*; if empty file logging is disabled)                      |
| `logger.syslog.address`   | string |                   | Syslog logging server address (if empty, host-local logging is performed)                                   |
| `logger.syslog.facility`  | string | `daemon`          | Syslog logging [facility](https://en.wikipedia.org/wiki/Syslog#Facility))                                   |
| `logger.syslog.level`     | string |                   | Syslog logging level (`error`, `warning`, `notice`, `info` or `debug`; if empty syslog logging is disabled) |
| `logger.syslog.tag`       | string | `facette`         | Syslog logging tag                                                                                          |
| `logger.syslog.transport` | string | `udp`             | Syslog logging network transport protocol (`tcp`, `udp` or `unix`)                                          |
| `storage.debug`           |  bool  | `false`           | Enable back-end storage debugging                                                                           |
| `storage.driver`          | string | `sqlite`          | Back-end storage driver name (`sqlite`, `pgsql` or `mysql`)                                                 |
| `storage.*`               |        |                   | *See "Back-end Settings" below for details*                                                                 |

## Back-end Settings

### SQLite

| Key            | Type   | Default | Description               |
|:---------------|:------:|:--------|:--------------------------|
| `storage.path` | string | data.db | SQLite database file path |

### PostgreSQL

| Key                | Type   | Default   | Description              |
|:-------------------|:------:|:----------|:-------------------------|
| `storage.host`     | string | localhost | PostgreSQL host address  |
| `storage.port`     | int    | 5432      | PostgreSQL host port     |
| `storage.dbname`   | string | facette   | PostgreSQL database name |
| `storage.user`     | string | facette   | PostgreSQL user name     |
| `storage.password` | string |           | PostgreSQL user password |

### MySQL

| Key                | Type   | Default   | Description         |
|:-------------------|:------:|:----------|:--------------------|
| `storage.host`     | string | localhost | MySQL host address  |
| `storage.port`     | int    | 3306      | MySQL host port     |
| `storage.dbname`   | string | facette   | MySQL database name |
| `storage.user`     | string | facette   | MySQL user name     |
| `storage.password` | string |           | MySQL user password |
