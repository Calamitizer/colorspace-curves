(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');

    const d3 = require('d3');

    const RGB = require('../rgb/rgb.js'); // remove after unit testing
    const Flag = require('../flag/flag.jsx');
    const requestCurve = require('../request-curve.js');

    console.log('Entry.js has begun running');

    const x = 255;

    /*
    const testColors = [
        [0, 0, 0],
        [x, 0, 0],
        [x, x, 0],
        [0, x, 0],
        [0, x, x],
        [0, 0, x],
        [x, 0, x],
        [x, x, x],
    ];
    */

    const testColors = requestCurve(2);

    class CSC extends React.Component {
        constructor(props) {
            super(props);
            this.state = {};
        }

        render() {
            return (
                <div>
                    <Flag iter={2} />
                </div>
            );
        }
    }

    ReactDOM.render(<CSC />, document.getElementById('mount-point'));
}());
