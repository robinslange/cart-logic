"use strict";
exports.__esModule = true;
var Checkout_1 = require("./logic/Checkout");
var pricingRules = {
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
            strict: true,
            discount: 0.5,
            applyTo: 'total'
        }, {
            id: 'TSHIRT',
            amountNeeded: 3,
            strict: false,
            discount: 0.05,
            applyTo: 'single'
        }
    ]
};
var co = new Checkout_1.Checkout(pricingRules);
// console.log(co)
co.scan('MUG');
co.scan('MUG');
co.scan('TSHIRT');
co.scan('TSHIRT');
co.scan("MUG");
co.scan("TSHIRT");
var total = co.total();
console.log('Total Price is: $' + total);
