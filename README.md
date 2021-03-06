# Colorspace Curves

A [Hilbert Curve](https://en.wikipedia.org/wiki/Hilbert_curve) is a certain kind of continuous fractal curve. What's special about this map is that it's essentially a one-dimensional path through N-dimensional space that is *space-filling*, meaning that eventually the path will pass through every single point. In a programming context, you could say that the curve offers a way to iterate through a multidimensional dataset in one pass of a loop. Of course, you could also do this by iterating through the data one dimension at a time, e.g. (for 2-D data)

```javascript
for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i].length; j++) {
        // something involving data[i][j]
    }
}
```

So what's the advantage of using a Hilbert curve instead of a dimension-wise crawl? Well, the Hilbert curve preserves locality: Two points along the path are always going to be mapped to two points in the target space that are close together. In contrast, there are points in the naive loop above where we go from `data[i][data[i].length - 1]` to `data[i + 1][0]`, namely when we "finish" a row and jump to the beginning of the next one. If you're doing something like image processing with thresholding, this means the excess of one pixel could be tacked onto some other pixel nowhere near the first one.

So what am I doing with it?

This app uses a 3-D Hilbert curve to walk through RGB colorspace, and visualizes that sequence of colors as a stripes (like a pride flag). The traditional rainbow corresponds to the first-order approximation of a Hilbert curve, so this flag is something like a generalized rainbow. It presents a higher granularity of RGB space (so there are more colors), but it preserves locality (i.e. any two adjacent colors are still pretty close, and so the transition is still smooth).

## Code Structure and Overview

### Client

Located in `/client/src/`.

Entry point: `index.html`, HTML scaffolding for the React component `<CSC />`, which is essentially the entire app.

React components:

* `<CSC />` — the core app component, which controls and renders everything within `index.html`'s `<body>`.
* `<Flag />` — the color flag.
* `<Stripe />` — a stripe of a given color on a `<Flag />`.

The folders are divided by related functionality, in the spirit of separation of concerns.

Each React component (e.g. `<Foo />`) has a dedicated folder containing

* `foo.jsx` — its component definition file
* `foo-schema.js` — its schema file defining its property types and default props
* `foo-style.less` — its Less sheet defining all style common to all instances (i.e. style independent of a particular instance's state and props).

Another folder is `rgb/`, containing the `RGB` class and some helper code to apply transformations to an instance of it.

### Build Pipeline

The raw files in `/client/src/` are processed and bundled into `/client/www/` by the task-runner Gulp.

Build config is located in `/gulpfile.js`, which:

* wipes `/client/www/`,
* compiles, concatenates, and minifies Less files into `style.min.css`,
* crawls JavaScript requirement tree and bundles the minified `bundle.js`,
* transfers HTML files and injects `bundle.js` into `index.html`,
* transfers static assets,
* sets up Webpack to watch JS files in `/client/src/` and re-compiles `bundle.js` upon any changes.

`/client/www/` is the directory actually served by the back-end.

### Server

Located in `/server/`.

Methods (`/server/methods/`):

* `deploy.js` — entry point. initializes the Express server, loads and mounts routers, and starts listening.
* `serve-curve.js` — API supplier. reads and sends curve data from `/server/json/`.

No CRUD operations are required for this app, so there are no other methods.

Routers ('/server/routers/`):

* `site.js` — site router. manages for site-wide routing.
* `api.v1.js` — api router. serves Hilbert curve data in response to API GET requests.
* `asset.js` — asset router. serves static assets such as images, etc. Unused placeholder. 

---

## API Specification

The server exposes a RESTful API to retrieve Hilbert curve data for a given depth of iteration.

### Request Specification

`GET /api/v1/hilbert3/:iter`

where

* `:iter` is the depth of iteration (starting at 1).

### Response Specification

The data are returned according to the following `.json` schema:

```
[
    [<x1>, <y1>, <z1>],
    [<x2>, <y2>, <z2>],
    [<x3>, <y3>, <z3>],
    ...
]
```

### Example

`GET /api/v1/hilbert3/1`
returns (without whitespace)

```
[
    [0, 0, 0],
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 0]
]
```

---

## Hilbert Algorithm

I found the example algorithms online for a 3-D or N-D Hilbert curve to be both scarce and obtuse, so I made a Java program of my own. This is located in `/hilbert-3d/`. The output JSONs are static, and aren't generated on-demand by the API or anything fancy; the code is just provided as reference. In case anyone else is searching for such an algorithm and stumbles upon mine, it's hopefully more intuitive than what I found.

First of all, the data I manipulate are not sequences of positions, but just sequences of steps. For example, I represent the first iterate,

```
[
    [0, 0, 0],
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 0],
    [1, 1, 0],
    [1, 1, 1],
    [1, 0, 1],
    [1, 0, 0]
]
```

by

```
[
    [ 0,  0, +1],
    [ 0, +1,  0],
    [ 0,  0, -1],
    [+1,  0,  0],
    [ 0,  0, +1],
    [ 0, -1,  0],
    [ 0,  0, -1],
```

or in other words, the sequence of unit steps `[+z, +y, -z, +x, +z, -y, -z]`. Since the final curve is just the partial sum of its sequence of steps, this means you never have to deal with the messy busines of *translating* a curve, only rotating it.

The eight rotations are hard-coded, and obtained by basically just staring at the first two pictures on [this page](http://www.math.uwaterloo.ca/~wgilbert/Research/HilbertCurve/HilbertCurve.html) until my brain started hurting.

Mathematical details:
the rotations of 3-D coordinate space can be represented in code by the 48 3x3 matrices satisfying

* each row or column contains exactly one nonzero element.
* each nonzero element is +1 or -1.

For example,

```
[
    [ 0,  1,  0],
    [-1,  0,  0],
    [ 0,  0,  1]
]
```

This basically amounts to choosing a permutation of the three axes (where are the matrix's 1s?) and then choosing which axes are inverted (which of the matrix's 1s are negative?).

(3!) * (2^3) = 48 rotations.

Note that *proper* rotations can be characterized by specifying that the matrix has an *even* number of 1s. These correspond to the 24 (proper) symmetries of the cube.
