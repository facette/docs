---
title: "Authentication"
section: "configuration"
groups:
   - "configuration"
groups_weight: 20
---

# Authentication

An authentication can be required for all requests modifying the server configuration or altering the stored data (e.g.
items creation, resources reload). It uses HTTP Basic authentication as described in the section 11 of the
[RFC 1945][1] document.

## No authentication

If you do not wish to restrict access to the Facette application, set the authentication type to `none`.

Example:

```javascript
{
    ...

    "auth": {
        "type": "none"
    },

    ...
}
```

## Simple authentication

The **simple** authentication (type `simple`) restricts access to the application to a specific set of users identified
by a username and a password defined in a file. This authentication handler is pretty basic and will need
some additional work and refinement in the future: at the moment, it only stores login and password pairs in a single
file.

Mandatory settings:

 * `path` (type *string*): path to the file containing the users definitions

Example:

```javascript
{
    ...

    "auth": {
        "type": "simple",
        "path": "/etc/facette/auth.json"
    },

    ...
}
```

To create a new user please use the `facettectl` utility then reload the server to take the change into account:

```
$ facettectl useradd facette
Password:
Repeat Password:
$ facettectl reload
```

Example output to the `/etc/facette/auth.json` file (defined by the `path` setting) after adding the user "facette"
(passwords are hashed):

```javascript
{
    "facette": "DEnfb3dCCY/NsuET4TwvX8ojD8fhxrcagGd1lbeXqL0="
}
```


[1]: http://tools.ietf.org/html/rfc2616#section-11
