# Colorspace Curves

## Code Overview

### Project Structure

### Client

### Server
Located in `/server/`.

##### Methods (`/server/methods/`)

* `deploy.js` — entry point. initializes the Express server, loads and mounts routers, and starts listening.
* `serve-curve.js` — 


### Deployment Pipeline

---

## API

The server exposes a RESTful API to retrieve Hilbert curve data for a given depth of iteration.

### Request Specification

`GET /api/v1/hilbert3/:iter`

where

* `:iter` is the depth of iteration (starting at 1).

### Response Specification

The data are returned according to the following `.json` schema:

```json
[
    [<x1>, <y1>, <z1>],
    [<x2>, <y2>, <z2>],
    [<x3>, <y3>, <z3>],
]
```

### Example

`GET /api/v1/hilbert3/1`

returns (without whitespace)

```json
[
    [0,0,0],
    [0,0,1],
    [0,1,1],
    [0,1,0],
    [1,1,0],
    [1,1,1],
    [1,0,1],
    [1,0,0]
]
```

---

## Hilbert Algorithm
