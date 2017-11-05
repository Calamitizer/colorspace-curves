(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');

    const schema = require('./pane-schema.js');

    class Pane extends React.Component {
        static propTypes = schema.propTypes
        static defaultProps = schema.defaultProps

        constructor(props) {
            super(props);
            this.state = {
                /* */
            };

            this.handleIterChange = this.handleIterChange.bind(this);
        }

        handleIterChange(e) {
            const newIter = this.parseIter(e.target.value);
            this.props.onIterChange(newIter);
        }

        parseIter(value) {
            const minIter = 1;
            const maxIter = 5;

            const parsed = parseInt(value, 10); const iter = Number.isNaN(parsed) ? 0 : parsed; 
            // constrain within [minIter, maxIter]
            return Math.max(minIter, Math.min(iter, maxIter));
        }

        componentWillMount() {
            /* */
        }

        componentDidMount() {
            /* */
        }

        componentDidUpdate() {
            /* */
        }

        render() {
            const {
                iter,
                colorsLoaded,
            } = this.props;

            return (
                <div className='pane'>
                    <form>
                        <span><h2>Iteration level:</h2></span>
                        <input
                            type='number'
                            value={iter}
                            onChange={this.handleIterChange}
                        />
                    </form>

                    <hr />

                    <h2>Colors loaded: {colorsLoaded}</h2>
                </div>
            );
        }

    }

    module.exports = Pane;

}());
