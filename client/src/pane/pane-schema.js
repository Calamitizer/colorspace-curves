(function() {
    'use strict';

    const PropTypes = require('prop-types');

    const propTypes = {
        colorsLoaded: PropTypes.bool.isRequired,
    };

    const defaultProps = {
        // colorsLoaded: required
    };

    const scheme = {
        propTypes,
        defaultProps,
    };

    module.exports = scheme;
}());
