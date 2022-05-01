"use strict";
exports.__esModule = true;
var Customer = /** @class */ (function () {
    function Customer(customerId, name, email, phone, address) {
        this.customerId = customerId;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.address = address;
        this.loyaltyPoints = 0;
    }
    return Customer;
}());
exports["default"] = Customer;
