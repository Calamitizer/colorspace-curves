(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');
    const PropTypes = require('prop-types'); // necessary to import here?
    const d3 = require('d3');
    const axios = require('axios');
    const shortid = require('shortid');

    const schema = require('./flag-schema.js');

    const Stripe = require('../stripe/stripe.jsx');
    const requestCurve = require('../request-curve.js');
    const RGB = require('../rgb/rgb.js');
    const RGBPerm = require('../rgb/rgb-perm.js');

    class Flag extends React.Component {
        static propTypes = schema.propTypes
        static defaultProps = schema.defaultProps

        constructor(props) {
            super(props);
            this.state = {
                colors: [],
            };

            this.handleColorsLoad = this.handleColorsLoad.bind(this);
        }

        // will eventually be interactive
        // (prop of <Flag />, state of <CSC />).
        // for now, I just picked one that looks good =p
        // perm = new RGBPerm([1, 2, 3], [-1, +1, +1])
        perm = new RGBPerm([1, 2, 3], [-1, +1, +1])

        updateColors(iter) {
            this.handleColorsLoad(false);
            requestCurve(iter)
                .then(colors => {
                    console.log('colors before:');
                    console.log(colors);
                    return colors;
                })
                .then(colors => {
                    return colors.map(color => {
                        return this.perm.transform(color);
                    });
                })
                .then(colors => {
                    console.log('colors before:');
                    console.log(colors);
                    return colors;
                })
                .then(colors => {
                    this.setState({
                        colors: colors,
                    });
                    this.handleColorsLoad(true);
                });
        }

        handleColorsLoad(status) {
            this.props.onColorsLoad(status);
        }

        // make arrow/static?
        makeStripe(c) {
            const stripe = (
                <Stripe
                    className="stripe"
                    key={shortid.generate()}
                    color={new RGB(...c)}
                    width={this.props.width}
                    height={this.props.height / this.state.colors.length}
                />
            );

            return stripe;
        }

        positionStripes() {
            // <Flag /> must position its <Stripe /> children, since a
            // React component should not be concerned with its position.

            const stripeHeight = this.props.height / this.state.colors.length;

            d3
                .select(this.node)
                .selectAll('g.stripe')
                .attr('transform', (_, i) => {
                    return `translate(0, ${i * stripeHeight})`;
                });
        }


        componentWillMount() {/* */}

        componentDidMount() {
            this.node = ReactDOM.findDOMNode(this);
            this.updateColors(this.props.iter);
        }

        componentWillReceiveProps(nextProps) {
            if ((nextProps.iter !== this.props.iter) && (nextProps.iter !== 0)) {
                this.updateColors(nextProps.iter);
            }
        }

        shouldComponentUpdate(nextProps, nextState) {
            return true;
        }

        componentWillUpdate() {/* */}

        componentDidUpdate() {
            this.positionStripes();
        }

        componentWillUnmount() {/* */}

        render() {
            const {
                width,
                height,
                margin,
            } = this.props;

            return (
                <svg
                    className='flag'
                    width={width + margin.left + margin.right}
                    height={height + margin.top + margin.bottom}
                >
                    <rect
                        className='flag-border'
                        x={margin.left}
                        y={margin.top}
                        width={width}
                        height={height}
                    />
                    <g
                        className='flag-g'
                        transform={`translate(${margin.left},${margin.top})`}
                    >
                        {this.state.colors.map(this.makeStripe, this)}
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
