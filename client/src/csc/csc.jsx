(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');

    const d3 = require('d3');

    const RGB = require('../rgb/rgb.js'); // remove after unit testing
    const Flag = require('../flag/flag.jsx');
    const Pane = require('../pane/pane.jsx');
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
                colorsLoaded: false,
            };

            this.handleIterChange = this.handleIterChange.bind(this);
            this.handleColorsLoad = this.handleColorsLoad.bind(this);
        }

        handleIterChange(iter) {
            this.setState({
                iter: iter,
            });
        }

        handleColorsLoad(status) {
            this.setState({
                colorsLoaded: status,
            });
        }

        render() {
            return (
                <div className="csc">
                    <Pane
                        iter={this.state.iter}
                        colorsLoaded={this.state.colorsLoaded}
                        onIterChange={this.handleIterChange}
                    />

                    <hr />

                    <Flag
                        iter={this.state.iter}
                        onColorsLoad={this.handleColorsLoad}
                    />
                </div>
            );
        }
    }

    ReactDOM.render(<CSC />, document.getElementById('mount-point'));
}());
