"use strict";
exports.__esModule = true;
var Type;
(function (Type) {
    Type[Type["Starter"] = 0] = "Starter";
    Type[Type["MainDish"] = 1] = "MainDish";
    Type[Type["SideDish"] = 2] = "SideDish";
    Type[Type["Drink"] = 3] = "Drink";
    Type[Type["Dessert"] = 4] = "Dessert";
})(Type || (Type = {}));
var MenuItem = /** @class */ (function () {
    function MenuItem(name, price, type, description, products) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.description = description;
        this.products = products;
    }
    return MenuItem;
}());
exports["default"] = MenuItem;
