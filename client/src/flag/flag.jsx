(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');
    const PropTypes = require('prop-types'); // necessary to import here?
    const d3 = require('d3');
    const axios = require('axios');
    const shortid = require('shortid');

    const scheme = require('./flag-scheme.js');
    const RGB = require('./rgb.js');
    const Stripe = require('./stripe.jsx');

    class Flag extends React.Component {
        static propTypes = scheme.propTypes
        static defaultProps = scheme.defaultProps

        constructor(props) {
            super(props);
            this.state = {
                data: [],
                dataLoaded: false,
            };
        }

        makeStripe(c) {
            const stripe = (
                <Stripe
                    className="stripe"
                    key={shortid.generate()}
                    color={new RGB(...c)}
                    width={this.props.width}
                    height={this.props.height / this.props.colors.length}
                />
            );

            return stripe;
        }

        componentWillMount() {
            /* */
        }

        componentDidMount() {
            this.node = ReactDOM.findDOMNode(this);

            // position stripes
            const stripeHeight = this.props.height / this.props.colors.length;

            d3
                .select(this.node)
                .selectAll('g.stripe')
                .attr('transform', (s, i) => {
                    return `translate(0, ${i * stripeHeight})`;
                });
        }

        render() {
            const {
                colors,
                width,
                height,
                margin,
            } = this.props;

            return (
                <svg
                    width={width + margin.left + margin.right}
                    height={height + margin.top + margin.bottom}
                >
                    <g
                        className='flag'
                        transform={`translate(${margin.left},${margin.top})`}
                    >
                        {colors.map(this.makeStripe, this)}
                    </g>
                </svg>
            );


            /*
            const flag = d3
                .select(new ReactFauxDOM.Element('svg'))
                .classed('flag-container', true)
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            const graphic = flag
                .append('g')
                .classed('flag', true)
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const stripes = graph.selectAll('g.stripe');

            const entered = stripes
                .data(colors, (color) => color.id)
                .enter()
                .append('g')
                .classed('stripe', true)

            return flag.toReact();
            */
        }
    }

    module.exports = Flag;

}());
