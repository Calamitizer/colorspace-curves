(function() {
    'use strict';

    var express = require('express');

    var cf = require('../config.js');
    var serveCurve = require('../methods/serve-curve.js');

    var apiRouter = express.Router();

    var apiRE = (function() {
        var intRE = '([1-9]\\d*)';
        var maybeSlash = '(?:\\/)?';

        var re = new RegExp([
            [
                '^',
                'hilbert3',
                intRE,
            ].join('\\/'),
            maybeSlash,
            '$',
        ].join(''));
        // '^\\/h3\\/([1-9]\\d*)(?:\\/)?$'

        return re;
    }());

    apiRouter
        .use(function(req, res, next) {
            console.log('API request made');
            next();
        })
        .get(apiRE, function(req, res) {
            var iter = req.params[0];
            serveCurve(iter).then(function(data) {
                res.json(data);
            });
        });

    module.exports = apiRouter;
}());
