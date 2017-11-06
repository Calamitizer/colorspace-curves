(function() {
    'use strict';

    class RGBPerm {
        constructor(perm, sign) {
            /*
            perm: an permutation on 3 elements,
            in the form of a length-3 array
            e.g. [2, 1, 3] refers to the permutation
            sending 1 -> 2, 2 -> 1, and 3 -> 3

            sign: a length-3 array representing
            the signature of which dimensions
            are inverted
            e.g. [-1, +1, -1] inverts
            dimensions 1 and 3
            */
            this.perm = perm;
            this.sign = sign;
        }

        image(i) {
            return this.perm[i - 1];
        }

        preimage(i) {
            return this.perm.indexOf(i) + 1;
        }

        direction(i) {
            return this.sign[i - 1];
        }

        transform(comps) {
            const newComps = comps.map((_, i) => {
                const val = comps[this.preimage(i + 1) - 1];
                return (!!~this.direction(i + 1)
                    ? val
                    : 255 - val
                );
            });

            return newComps;
        }

    }

    const t = new RGBPerm([3, 1, 2], [-1, -1, -1]);
    const comps = [0, 127, 255];
    console.log(t.transform(comps));

    module.exports = RGBPerm;
}());
