(function() {
    'use strict';

    const PropTypes = require('prop-types');

    const RGB = require('../rgb/rgb.js');

    const propTypes = {
        iter: PropTypes.number.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        margin: PropTypes.shape({
            top: PropTypes.number.isRequired,
            right: PropTypes.number.isRequired,
            bottom: PropTypes.number.isRequired,
            left: PropTypes.number.isRequired,
        }),
    };

    const defaultProps = {
        // iter (required),
        width: 1200,
        height: 900,
        margin: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
    };

    const scheme = {
        propTypes,
        defaultProps,
    }

    module.exports = scheme;
}());
