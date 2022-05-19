"use strict";
exports.__esModule = true;
var Customer = /** @class */ (function () {
    function Customer(id, name, email, phone, address) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.loyaltyPoints = 0;
    }
    return Customer;
}());
exports["default"] = Customer;
