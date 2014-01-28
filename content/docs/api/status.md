---
title: "HTTP Status Codes"
section: "api"
groups:
   - "api"
groups_weight: 40
---

# HTTP Status Codes

## 200 OK

The request was successful and the server is returning data in the response body.

## 201 Created

The request was successful resulting in the creation of a new item. The response body is empty.

## 400 Bad Request

The request or the data supplied along with the request is invalid, could not be processed or when mandatory fields are
not met.

## 401 Unauthorized

The authentication credentials are missing or invalid.

## 404 Not Found

The requested item or an item to inherit from could not be found. Could be returned by `POST` creation requests.

## 405 Method Not Allowed

The requested method is not supported the API resource.

## 409 Conflict

An item with the same name and type already exists. Could be returned by `POST` and `PUT` creation requests.

## 415 Unsupported Media Type

The request used a `Content-Type` not supported by the API resource.

## 503 Service Unavailable

The server is currently unavailable. Such response is sent when the server is being initialized or reloading its
configuration.
