---
title: "Authentication"
section: "configuration"
groups:
   - "configuration"
groups_weight: 20
---

# Authentication

An authentication is required for all requests modifying the server configuration or altering the stored data (e.g.
items creation, resources reload). It uses HTTP Basic authentication as described in the 11.1 section of the
[RFC 1945][1] document.

## Simple Handler

Right now, the simple authentication handler is still pretty basic and will need some additional work and refine in the
future. It only stores login and password pairs in a single file.

To create a new user please use the `facettectl` utility then reload the server to take into account the change:

```
facettectl useradd facette
facettectl reload
```

Example (password being `facette'):

```javascript
{
    "facette": "DEnfb3dCCY/NsuET4TwvX8ojD8fhxrcagGd1lbeXqL0="
}
```


[1]: http://www.ietf.org/rfc/rfc1945.txt
