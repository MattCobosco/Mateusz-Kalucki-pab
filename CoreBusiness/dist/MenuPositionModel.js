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
var Unit;
(function (Unit) {
    Unit[Unit["piece"] = 0] = "piece";
    Unit[Unit["g"] = 1] = "g";
    Unit[Unit["ml"] = 2] = "ml";
    Unit[Unit["kg"] = 3] = "kg";
    Unit[Unit["l"] = 4] = "l";
})(Unit || (Unit = {}));
var MenuPosition = /** @class */ (function () {
    function MenuPosition(name, price, type, description, products) {
        this.name = name;
        this.price = price;
        this.type = type;
        this.description = description;
        this.products = products;
    }
    return MenuPosition;
}());
exports["default"] = MenuPosition;
