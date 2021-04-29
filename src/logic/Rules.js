"use strict";
exports.__esModule = true;
exports.RuleProcessor = void 0;
var RuleProcessor = /** @class */ (function () {
    function RuleProcessor(rule) {
        this.id = rule.id;
        this.amountNeeded = rule.amountNeeded;
        this.strict = rule.strict;
        this.discount = rule.discount;
        this.applyTo = rule.applyTo;
    }
    ;
    RuleProcessor.prototype.apply = function (product, amount) {
        if (this.id === product.id) {
            if (this.strict) {
                if (amount === this.amountNeeded) {
                    this.applyToMath(product, amount);
                }
            }
            else {
                if (amount >= this.amountNeeded) {
                    this.applyToMath(product, amount);
                }
            }
        }
        else {
            this.totalCost = product.price * amount;
        }
        return this.totalCost;
    };
    ;
    RuleProcessor.prototype.applyToMath = function (product, amount) {
        console.log(this.applyTo, product, amount);
        if (this.applyTo === 'single') {
            var discountAmount = (product.price * this.discount);
            var discountPrice = Math.round(product.price - discountAmount);
            this.totalCost = discountPrice * amount;
        }
        if (this.applyTo === 'total') {
            this.totalCost = (product.price * amount) * this.discount;
        }
    };
    ;
    return RuleProcessor;
}());
exports.RuleProcessor = RuleProcessor;
