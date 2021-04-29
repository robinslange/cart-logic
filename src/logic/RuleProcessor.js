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
        var cost = 0;
        if (this.strict) {
            if (amount === this.amountNeeded) {
                cost = this.applyToMath(product, amount);
            }
            else if (amount > this.amountNeeded) {
                var remainder = amount % 2;
                var tempAmount = amount - remainder;
                if (remainder > 0) {
                    cost += this.applyToMath(product, tempAmount);
                    var remainderCost = remainder * product.price;
                    cost += remainderCost;
                }
                else {
                    cost = this.applyToMath(product, tempAmount);
                }
            }
            else {
                cost = product.price * amount;
            }
        }
        else {
            if (amount >= this.amountNeeded) {
                cost = this.applyToMath(product, amount);
            }
            else {
                cost = product.price * amount;
            }
        }
        return cost;
    };
    ;
    RuleProcessor.prototype.applyToMath = function (product, amount) {
        var cost = 0;
        if (this.applyTo === 'single') {
            var discountAmount = product.price * this.discount;
            var discountedPrice = product.price - discountAmount;
            cost = discountedPrice * amount;
        }
        if (this.applyTo === 'total') {
            cost = (product['price'] * amount) * this.discount;
        }
        return cost;
    };
    ;
    return RuleProcessor;
}());
exports.RuleProcessor = RuleProcessor;
