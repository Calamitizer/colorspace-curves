(function() {
    'use strict';

    var express = require('express');
    var path = require('path');

    var root = path.join(__dirname, '../../client/www');

    var siteRouter = express.Router();

    siteRouter
        .use(function(req, res, next) {
            console.log('Site request made.\n'
                + 'Base: ' + req.baseUrl + '\n'
                + 'Original: ' + req.originalUrl + '\n'
                + 'Url: ' + req.Url);
            next();
        })
        .get('*', function(req, res) {
            res
                .status(200)
                .sendFile('/index.html', {
                    root: root,
                });
        });

    module.exports = siteRouter;
}());
