import {pricingRules} from '../src/interfaces/Products';
import {Checkout} from '../src/logic/Checkout';

const pricingRules: pricingRules = {
    products: [
        {
            id: 'MUG',
            name: 'Cabify Coffee Mug',
            price: 5
        }, {
            id: 'TSHIRT',
            name: 'Cabify T-Shirt',
            price: 20
        }, {
            id: 'CAP',
            name: 'Cabify Cap',
            price: 10
        },

    ],
    rules: [
        {
            id: 'MUG',
            amountNeeded: 2,
            strict: true, // if strict limit to amountNeeded
            discount: 0.5,
            applyTo: 'total', // applies discount to total
        }, {
            id: 'TSHIRT',
            amountNeeded: 3,
            strict: false, // if not strict then to any number >=
            discount: 0.05,
            applyTo: 'single', // applies discount to each item
        }

    ]

}
const co = new Checkout(pricingRules);
// console.log(co)
co.scan('MUG');
co.scan('MUG');
co.scan('TSHIRT');
co.scan('TSHIRT');

var assert = require('assert');

describe('co', function () {
    describe('total', function () {
        it('should return the correct total', function () {
            assert.equal(co.total(), 45)
        })
    })
})
