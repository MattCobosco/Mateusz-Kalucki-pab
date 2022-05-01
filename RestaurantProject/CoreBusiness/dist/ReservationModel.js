"use strict";
exports.__esModule = true;
var Reservation = /** @class */ (function () {
    function Reservation(reservationId, table, startDateTime, endDateTime, customer) {
        this.reservationId = reservationId;
        this.tableNumber = table.tableNumber;
        this.startDateTime = startDateTime;
        this.endDateTime = endDateTime;
        this.customerId = customer.customerId;
    }
    return Reservation;
}());
exports["default"] = Reservation;
