(function() {
    'use strict';

    const React = require('react');
    const ReactDOM = require('react-dom');

    const d3 = require('d3');

    console.log('Entry.js has begun running');

    class CSC extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div>
                    <h1>RGB</h1>
                </div>
            );
        }
    }

    ReactDOM.render(<CSC />, document.getElementById('mount-point'));
}());
