import {pricingRules} from '../src/interfaces/Products';
import {RuleProcessor} from '../src/logic/RuleProcessor';

const rule = {
    id: 'TSHIRT',
    amountNeeded: 3,
    strict: false, // if not strict then to any number >=
    discount: 0.05,
    applyTo: 'single', // applies discount to each item
}

const product = {
    id: 'TSHIRT',
    name: 'Cabify T-Shirt',
    price: 20
}


const processor = new RuleProcessor(rule);
// console.log(co)

var assert = require('assert');

describe('processor', function () {
    describe('apply', function () {
        it('should not apply bulk discount rule and return correct total', function () {
            assert.equal(processor.apply(product, 2), 40)
        })
    })
})
