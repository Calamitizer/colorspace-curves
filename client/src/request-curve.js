(function() {
    'use strict';

    const axios = require('axios');

    const RGB = require('./flag/rgb.js');

    const requestCurve = iter => {
        const uri = `/api/v1/h3/${iter}`;

        // const scale = x => ((x + 1) * Math.pow(2, 8 - iter)) - 1;
        const scale = x => x * ((Math.pow(2, 8) - 1) / (Math.pow(2, iter) - 1));

        const format = pos => pos.map(scale);

        const curve = axios
            .get(uri)
            .then(res => res.data)
            .then(curve => curve.map(pos => pos.map(scale)));

        return curve;
    };

    module.exports = requestCurve;

}());
