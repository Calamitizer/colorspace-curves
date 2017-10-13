(function() {
    'use strict';

    var path = require('path');
    var fs = require('fs');

    var fetchCurve = function(iter) {
        var filename = `h3-${iter}.json`;
        var filepath = path.join(__dirname, '..', 'json', filename);

        return new Promise(function(resolve, reject) {
            fs.readFile(filepath, 'utf8', function(err, data) {
                if (err) {
                    reject(err);
                }
                resolve(data);
            })
        });
    };

    module.exports = fetchCurve;
}());
