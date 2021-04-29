import {pricingRules, Product, Rule} from '../interfaces/Products'
import {RuleProcessor} from './RuleProcessor'

export class Checkout {
    products : Product[] = [];
    scannedProducts : {
        id: string,
        amount: number
        price: number
    }[] = [];
    rules = [] as Rule[];

    constructor(pricingRules : pricingRules) {
        pricingRules.products.forEach(p => this.products.push(p));
        pricingRules.rules.forEach(rule => {
            this.rules.push(rule);
        })
    }

    public get scanned(): any[]{
        return this.scannedProducts;
    }

    scan(productID : string): void {
        const payload = {
            id: productID,
            amount: 1,
            price: 0
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
    }

    total(): number {
        let total = 0;
        this.scannedProducts.forEach(scanned => {
            const product = this.products.find(p => p.id === scanned.id)
            const rule = this.rules.find(r => r.id === scanned.id)
            if (product) {
                if (rule) {
                    const processor = new RuleProcessor(rule)
                    // create RuleProcessor object
                    // i used objects with a JSON data structure to allow for easy remote storage of rules
                    // and and easy way to add new rules, if you want to add a new kind of comparison you could do this also
                    const itemCost = processor.apply(product, scanned.amount); // apply rule logic
                    scanned.price = itemCost;
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
    }
}
