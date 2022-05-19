"use strict";
exports.__esModule = true;
var Reservation = /** @class */ (function () {
    function Reservation(id, table, startDateTime, endDateTime, customer) {
        this.id = id;
        this.table = table;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.customer = customer;
    }
    return Reservation;
}());
exports["default"] = Reservation;
