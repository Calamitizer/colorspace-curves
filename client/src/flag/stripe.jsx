(function() {
    'use strict';

    const React = require('react');
    const ReactFauxDOM = require('react-faux-dom');
    const PropTypes = require('prop-types');
    const d3 = require('d3');
    const axios = require('axios'); // move later

    const config = require('./config.js');
    const RGB = require('./rgb.js');

    class Stripe extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        static defaultProps = config.defaultProps
        static propTypes = config.propTypes

        componentDidMount() {}

        render() {
            const {
                color,
                width,
                height,
                margin,
            } = this.props;

            return (
                <div>
                    <h1>Color: {color.formatHex}, {color.formatCSS}</h1>
                </div>
            );
        }
    }

    module.exports = Stripe;
}());
