(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');

    const d3 = require('d3');

    const RGB = require('../rgb/rgb.js'); // remove after unit testing
    const Flag = require('../flag/flag.jsx');
    const FlagHeader = require('../flag-header/flag-header.jsx');
    const requestCurve = require('../request-curve.js');

    /*
    const x = 255;

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
            this.state = {
                iter: 1,
            };

            this.handleIterChange = this.handleIterChange.bind(this);
        }

        handleIterChange(iter) {
            this.setState({
                iter: iter,
            });
        }

        render() {
            return (
                <div className="csc">
                    <FlagHeader
                        iter={this.state.iter}
                        onIterChange={this.handleIterChange}
                    />
                    <hr />
                    <Flag iter={this.state.iter} />
                </div>
            );
        }
    }

    ReactDOM.render(<CSC />, document.getElementById('mount-point'));
}());
