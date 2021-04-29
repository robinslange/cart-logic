"use strict";
exports.__esModule = true;
exports.Checkout = void 0;
var RuleProcessor_1 = require("./RuleProcessor");
var Checkout = /** @class */ (function () {
    function Checkout(pricingRules) {
        var _this = this;
        this.products = [];
        this.scannedProducts = [];
        this.rules = [];
        pricingRules.products.forEach(function (p) { return _this.products.push(p); });
        pricingRules.rules.forEach(function (rule) {
            _this.rules.push(rule);
        });
    }
    ;
    Checkout.prototype.matchID = function (productID) {
        this.products.forEach(function (p) {
            if (p.id === productID) {
                return true;
            }
            else {
                return false;
            }
        });
    };
    Checkout.prototype.scan = function (productID) {
        var payload = {
            id: productID,
            amount: 1
        };
        if (this.scannedProducts.some(function (p) { return p.id === productID; })) {
            this.scannedProducts.forEach(function (p) {
                if (p.id === productID) {
                    p.amount += 1;
                }
            });
        }
        else {
            this.scannedProducts.push(payload);
        }
    };
    ;
    Checkout.prototype.total = function () {
        var _this = this;
        var total = 0;
        this.scannedProducts.forEach(function (scanned) {
            var product = _this.products.find(function (p) { return p.id === scanned.id; });
            var rule = _this.rules.find(function (r) { return r.id === scanned.id; });
            if (product) {
                if (rule) {
                    var processor = new RuleProcessor_1.RuleProcessor(rule); // create RuleProcessor object
                    var itemCost = processor.apply(product, scanned.amount); // apply rule logic
                    total += itemCost;
                }
                else {
                    total += product.price * scanned.amount;
                }
            }
            else {
                throw new Error("Product not listed.");
            }
            // add cost to total
            // if no rule exists just add price to total
        });
        return total;
    };
    ;
    return Checkout;
}());
exports.Checkout = Checkout;
