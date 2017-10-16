(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');

    const d3 = require('d3');

    const Stripe = require('./flag/stripe.jsx');
    const RGB = require('./flag/rgb.js'); // remove after unit testing

    console.log('Entry.js has begun running');

    class CSC extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div>
                    <h1>RGB</h1>
                    <Stripe color={new RGB(16, 127, 254)} />
                </div>
            );
        }
    }

    ReactDOM.render(<CSC />, document.getElementById('mount-point'));
}());
