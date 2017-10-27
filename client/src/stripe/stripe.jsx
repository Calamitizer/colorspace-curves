(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');
    const ReactFauxDOM = require('react-faux-dom');
    const PropTypes = require('prop-types');
    const d3 = require('d3');

    const schema = require('./stripe-schema.js');
    const RGB = require('../rgb/rgb.js');

    class Stripe extends React.Component {
        static propTypes = schema.propTypes
        static defaultProps = schema.defaultProps

        constructor(props) {
            super(props);
            this.state = {};
        }

        componentDidMount() {
            /*
            this.d3Node = d3.select(ReactDOM.findDOMNode(this));
            this.d3Node
                .datum(this.props.color)
                .attr('x', 200);

            d3
                .select(ReactDOM.findDOMNode(this))
                .datum(this.props.color)
                .select('rect.stripe-rect');
                //.attr('color'... //figure out syntax

            console.log(typeof this.props.color);
            console.log(this.props.color);
            */
        }

        render() {
            const {
                color,
                width,
                height,
                margin,
            } = this.props

            return (
                <g className='stripe'>
                    <rect
                        className='stripe-rect'
                        width={width}
                        height={height}
                        fill={color.formatHex}
                    />
                    <text
                        className='stripe-text'
                        x={width / 2}
                        y={height / 2}
                        fill={color.invert().formatHex}
                    >{color.formatHex}</text>
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
