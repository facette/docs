---
title: "Using Facette"
menu:
  main:
    weight: 40
keywords:
   - "apache"
   - "facette"
   - "log"
   - "nginx"
   - "reverse proxy"
   - "server"
   - "ssl"
   - "tls"
   - "usage"
---

# Using Facette

Once built, please make sure either the `facette` binary is available in your `PATH` or provide the full path to the
binary.

```
$ facette -h
Usage: facette [OPTIONS]

Options:
   -L  logging level (error, warning, notice, info, debug)
   -V  display software version and exit
   -c  configuration file path
   -h  display this help and exit
   -l  log file path
```

To run the server, simply execute the command (`facette` doesn't need to be run as root unless you specify a `bind`
port lower than 1024):

```
$ facette -c path/to/facette.json
```

<span class="fa fa-info-circle"></span> If the path to the configuration file is omitted, the default
`/etc/facette/facette.json` one will be loaded. If the path to the log file is omitted, output will be written to
*stderr*.

Distribution packages usually provide an init script to manage the service, please refer to your distribution-specific
service management system.

## Use Facette with a HTTP reverse-proxy

You can use a HTTP reverse-proxy in front of Facette if you prefer not to expose the web application directly, for
example if you want to secure it with SSL/TLS or enforce user access control.

Here are basic configuration sample to get you started:

### Nginx

```
server {
    listen 80;

    server_name facette.example.net;

    location / {
        proxy_set_header Host $http_host;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_pass http://localhost:12003;
    }
}
```

### Apache

```
<VirtualHost *:80>
    ServerName facette.example.net

    RequestHeader set X-Forwarded-Proto "http"

    ProxyRequests Off
    ProxyPreserveHost On
    ProxyPass / http://localhost:12003/
    ProxyPassReverse / http://localhost:12003/
</VirtualHost>
```

<span class="fa fa-info-circle"></span> Note: `mod_proxy` and `mod_proxy_http` modules must be enabled. The
`X-Forwarded-Proto` header must be passed in order to make _OpenSearch_ work properly when using HTTPS (and requires
`mod_headers` to be enabled in Apache).
