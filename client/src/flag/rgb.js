(function() {
    'use strict';

    const RGB = class RGB {
        constructor(r, g, b) {
            this.color = [
                r,
                g,
                b,
            ];
        }

        static toHex(c) {
            return c.toString(16);
        }

        get formatHex() {
            return '#' + (
                this.color
                    .map(RGB.toHex)
                    .map(el => el.toUpperCase())
                    .map(el => '0'.repeat(2 - el.length) + el)
                    .join('')
            );
        }

        get formatCSS() {
            return `rgb(${this.color.join(', ')})`;
        }

    }

    module.exports = RGB;
}());
