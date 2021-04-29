import {pricingRules} from './interfaces/Products';
import {Checkout} from './logic/Checkout';


// i assumed the example function with one parameter passed in meant the rules and products
// i took it as pricing, rules in plain English. if pulling data from an document database it may prove better to split this
// however that is a minor change in code so can always be done at a later stage when/if required.
// incoming data could also be shaped to fit this before created new instance of Checkout()
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
// i didn't need to do a continuous .scan('PRODUCT_ID') as when implementing in Vue
// it works just fine with the single .scan('PRODUCT_ID') each time.
// could further enhance with .scan().scan() functionality however in the context of Vue isn't
// exactly necessary.
co.scan('MUG');
co.scan('MUG');
co.scan('TSHIRT');
co.scan('TSHIRT');
co.scan("MUG");
co.scan("TSHIRT");
const total = co.total();
console.log('Total Price is: $' + total)
