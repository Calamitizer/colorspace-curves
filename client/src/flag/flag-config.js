(function() {
    'use strict';

    const PropTypes = require('prop-types');

    const RGB = require('./rgb.js');

    const propTypes = {
        colors: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
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
        // colors (required),
        width: 1200,
        height: 900,
        margin: {
            top: 0,
            right: 60,
            bottom: 0,
            left: 30,
        },
    };

    const config = {
        propTypes,
        defaultProps,
    }

    module.exports = config;
}());
