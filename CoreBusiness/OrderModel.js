"use strict";
exports.__esModule = true;
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["Submitted"] = 0] = "Submitted";
    OrderStatus[OrderStatus["InProgress"] = 1] = "InProgress";
    OrderStatus[OrderStatus["Completed"] = 2] = "Completed";
    OrderStatus[OrderStatus["BillIssued"] = 3] = "BillIssued";
})(OrderStatus || (OrderStatus = {}));
var Order = /** @class */ (function () {
    function Order(employee, items, status, table, price) {
        this.employee = employee;
        this.items = items;
        this.status = status;
        this.table = table;
        this.price = price;
    }
    return Order;
}());
exports["default"] = Order;
