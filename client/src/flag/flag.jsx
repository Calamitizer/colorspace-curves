(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');
    const PropTypes = require('prop-types'); // necessary to import here?
    const d3 = require('d3');
    const axios = require('axios');
    const shortid = require('shortid');

    const config = require('./flag-config.js');
    const RGB = require('./rgb.js');
    const Stripe = require('./stripe.jsx');

    class Flag extends React.Component {
        static propTypes = config.propTypes
        static defaultProps = config.defaultProps

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
            this.stripes = this.props.colors.map(this.makeStripe, this);
        }

        componentDidMount() {
            const {
                color,
                width,
                height,
                margin,
            } = this.props;

            const stripeHeight = height / this.props.colors.length;

            const container = d3
                .select(ReactDOM.findDOMNode(this))
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom);

            const flag = container
                .select('g.flag')
                .attr('transform', `translate(${margin.left},${margin.top})`);

            const stripes = flag
                .selectAll('g.stripe')
                .attr('transform', (s, i) => `translate(0, ${i * stripeHeight})`)
                .attr('x', (_, i) => i)

            const rects = stripes
                .select('rect.stripe-rect')
                .attr('width', width)
                .attr('height', stripeHeight)
                .attr('fill', (d) => new RGB(...d.color).formatHex)
                .attr('stroke', 'black');
        }

        render() {
            const {
                colors,
                width,
                height,
                margin,
            } = this.props;

            return (
                <svg>
                    <g className="flag">
                        {this.stripes}
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
