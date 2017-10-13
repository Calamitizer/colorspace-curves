(function() {
    'use strict';

    require('dotenv').config();

    var express = require('express');
    var morgan = require('morgan');
    var bodyParser = require('body-parser');

    var path = require('path');
    var http = require('http');

    var assetRouter = require('../routers/asset.js');
    var siteRouter = require('../routers/site.js');

    var csc = express();

    csc
        .use(morgan('dev'))
        .use(bodyParser.json())
        .use(bodyParser.urlencoded({
            extended: true,
        }))
        .use('/', assetRouter)
        .use('/', siteRouter);

    var port = process.env.PORT || 4353; // "CS"

    csc.set('port', port);
    var server = http.createServer(csc);
    server.listen(port);

}());
