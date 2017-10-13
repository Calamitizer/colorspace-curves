(function() {
    'use strict';

    var path = require('path');

    var dir = {
        in: path.join(__dirname, 'client', 'src'),
        out: path.join(__dirname, 'client', 'www'),
    };

    var config = {
        context: __dirname,
        entry: path.join(dir.in, 'entry.jsx'),
        output: {
            path: dir.out,
            filename: 'bundle.js',
        },
        module: {
            loaders: [
                {
                    test: /\.jsx?$/,
                    include: dir.in,
                    exclude: /node_modules/,
                    loader: 'babel',
                },
                {
                    test: /\.json$/,
                    include: dir.in,
                    exclude: /node_modules/,
                    loader: 'json',
                },
            ],
        },
        watch: true,
    };

    module.exports = config;
}());
