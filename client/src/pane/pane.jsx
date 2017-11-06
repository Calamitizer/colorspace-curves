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
            const newIter = Pane.parseIter(e.target.value);
            this.props.onIterChange(newIter);
        }

        static parseIter(value) {
            const minIter = 1;
            const maxIter = 4;

            if (value === '') {
                return 0; // signifies blank input
            }

            return Math.max(Math.min(value, maxIter), minIter);
            /*
            return (
                (!value && value !== 0)
                    ? ''
                    : Math.max(Math.min(value, 

            return (value === '') ? value :

            const parsed = parseInt(value, 10);
            const iter = Number.isNaN(parsed) ? 0 : parsed; 
            // constrain within [minIter, maxIter]
            return Math.max(Math.min(iter, maxIter), minIter);
            */
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
                            value={iter || ''}
                            onChange={this.handleIterChange}
                        />
                    </form>

                    <hr />

                    <h2>Colors loaded: {'' + colorsLoaded}</h2>
                </div>
            );
        }

    }

    module.exports = Pane;

}());
