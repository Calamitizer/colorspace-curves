(function() {
    'use strict';

    class RGB {
        constructor(r, g, b) {
            this.comps = [
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
                this.comps
                    .map(Math.round)
                    .map(RGB.toHex)
                    .map(el => el.toUpperCase())
                    .map(el => '0'.repeat(2 - el.length) + el)
                    .join('')
            );
        }

        get formatCSS() {
            return `rgb(${this.comps.join(', ')})`;
        }

        invert() {
            return new RGB(...this.comps.map(x => 255 - x));
        }

        transform(t) {
            // t: an RGBTransform
            const newComps = new RGB(...t.transform(this.comps));
            return newComps;
        }
    }

    module.exports = RGB;
}());
