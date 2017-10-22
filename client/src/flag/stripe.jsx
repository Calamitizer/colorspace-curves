(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');
    const ReactFauxDOM = require('react-faux-dom');
    const PropTypes = require('prop-types');
    const d3 = require('d3');

    const scheme = require('./stripe-scheme.js');
    const RGB = require('./rgb.js');

    class Stripe extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        static propTypes = scheme.propTypes
        static defaultProps = scheme.defaultProps

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
                        x={width / 2}
                        y={height / 2}
                        textAnchor='middle'
                        dominantBaseline='central'
                        fontSize="35"
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
