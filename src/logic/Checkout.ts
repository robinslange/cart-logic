import {pricingRules, Product} from '../interfaces/Products'
import {RuleProcessor} from './RuleProcessor'

export class Checkout {
    products : Product[] = [];
    scannedProducts : {
        id: string,
        amount: number
    }[] = [];
    rules = [];

    constructor(pricingRules : pricingRules) {
        pricingRules.products.forEach(p => this.products.push(p));
        pricingRules.rules.forEach(rule => {
            this.rules.push(rule);
        })
    };

    private matchID(productID : string) {
        this.products.forEach(p => {
            if (p.id === productID) {
                return true;
            } else {
                return false;
            }
        })
    }

    scan(productID : string) {
        var payload = {
            id: productID,
            amount: 1
        };
        if (this.scannedProducts.some(p => p.id === productID)) {
            this.scannedProducts.forEach(p => {
                if (p.id === productID) {
                    p.amount += 1
                }
            })
        } else {
            this.scannedProducts.push(payload);
        }
    };

    total() {
        var total = 0;
        this.scannedProducts.forEach(scanned => {
            var product = this.products.find(p => p.id === scanned.id)
            var rule = this.rules.find(r => r.id === scanned.id)
            if (product) {
                if (rule) {
                    var processor = new RuleProcessor(rule)
                    // create RuleProcessor object
                    // i used objects with a JSON data structure to allow for easy remote storage of rules
                    // and and easy way to add new rules, if you want to add a new kind of comparison you could do this also
                    var itemCost = processor.apply(product, scanned.amount); // apply rule logic
                    total += itemCost;
                } else {
                    total += product.price * scanned.amount;
                }
            } else {
                throw new Error("Product not listed.")
            }
            // add cost to total
            // if no rule exists just add price to total

        });
        return total;
    };
}
