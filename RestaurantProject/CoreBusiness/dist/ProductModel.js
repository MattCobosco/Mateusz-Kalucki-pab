"use strict";
exports.__esModule = true;
var Unit;
(function (Unit) {
    Unit[Unit["piece"] = 0] = "piece";
    Unit[Unit["g"] = 1] = "g";
    Unit[Unit["ml"] = 2] = "ml";
    Unit[Unit["kg"] = 3] = "kg";
    Unit[Unit["l"] = 4] = "l";
})(Unit || (Unit = {}));
var Product = /** @class */ (function () {
    function Product(productId, name, price, quantity, unit) {
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;
        this.unit = unit;
    }
    return Product;
}());
exports["default"] = Product;
