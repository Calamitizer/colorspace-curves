(function() {
    'use strict';

    const d3 = require('d3');

    const enter = (selection) => {
        selection
            .select('rect.stripeRect')
            .attr('x', (d) => -d.size / 2)
            .attr('y', (d) => -d.size / 2)

}());
