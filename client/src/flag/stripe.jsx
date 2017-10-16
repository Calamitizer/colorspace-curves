(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');
    const ReactFauxDOM = require('react-faux-dom');
    const PropTypes = require('prop-types');
    const d3 = require('d3');

    const config = require('./stripe-config.js');
    const RGB = require('./rgb.js');

    class Stripe extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        static propTypes = config.propTypes
        static defaultProps = config.defaultProps

        componentDidMount() {
            /*
            this.d3Node = d3.select(ReactDOM.findDOMNode(this));
            this.d3Node
                .datum(this.props.color)
                .attr('x', 200);
            */

            d3
                .select(ReactDOM.findDOMNode(this))
                .datum(this.props.color)
                .select('rect.stripe-rect');
                //.attr('color'... //figure out syntax

            console.log(typeof this.props.color);
            console.log(this.props.color);
        }

        render() {
            const color = this.props.color;

            return (
                <g className='stripe'>
                    <rect className='stripe-rect' />
                    <text x='50' y='100'>{color.formatHex}</text>
                </g>
            );


            /*
            const stripe = new ReactFauxDOM.Element('div');

            return stripe.toReact();
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
            */
        }
    }

    module.exports = Stripe;

}());
