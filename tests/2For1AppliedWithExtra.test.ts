import {pricingRules} from '../src/interfaces/Products';
import {RuleProcessor} from '../src/logic/RuleProcessor';

const rule = {
    id: 'MUG',
    amountNeeded: 2,
    strict: true, // if strict limit to amountNeeded
    discount: 0.5,
    applyTo: 'total', // applies discount to total
}
const product = {
    id: 'MUG',
    name: 'Cabify Coffee Mug',
    price: 5
}

const processor = new RuleProcessor(rule);
// console.log(co)

var assert = require('assert');

describe('processor', function () {
    describe('apply', function () {
        it('should apply 2 for 1 rule, and add extra cost of one product', function () {
            assert.equal(processor.apply(product, 3), 10)
        })
    })
})
