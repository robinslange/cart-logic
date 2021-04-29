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
        it('should not apply 2 for 1 rule and return correct total', function () {
            assert.equal(processor.apply(product, 1), 5)
        })
    })
})
