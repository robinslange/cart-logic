// I separated out the interfaces to improve readability and allow reuse across multiple classes.
// this meant I didn't have to redefine this and always require predictable data to ensure easy of implementation if
// another developer had to look at/use this.

export interface Product {
    id: string,
    name: string,
    price: number
};

export interface Rule {
    id: string,
    amountNeeded: number,
    strict: boolean,
    discount: number,
    applyTo: string
};

export interface pricingRules {
    products: Array < Product >,
    rules: Array < Rule >
};
