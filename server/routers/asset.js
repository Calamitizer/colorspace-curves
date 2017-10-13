(function() {
    'use strict';

    var serveStatic = require('serve-static');
    var path = require('path');

    var root = path.join(__dirname, '../../client/www');
    var options = {
        index: false,
    };

    var assetRouter = serveStatic(root, options);

    module.exports = assetRouter;
}());
