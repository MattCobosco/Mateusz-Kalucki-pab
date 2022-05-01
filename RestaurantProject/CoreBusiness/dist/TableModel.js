"use strict";
exports.__esModule = true;
var TableStatus;
(function (TableStatus) {
    TableStatus[TableStatus["Available"] = 0] = "Available";
    TableStatus[TableStatus["Occupied"] = 1] = "Occupied";
    TableStatus[TableStatus["Dirty"] = 2] = "Dirty";
    TableStatus[TableStatus["OutOfOrder"] = 3] = "OutOfOrder";
})(TableStatus || (TableStatus = {}));
var Table = /** @class */ (function () {
    function Table(tableNumber, seats, status) {
        this.tableNumber = tableNumber;
        this.seats = seats;
        this.status = status;
    }
    return Table;
}());
exports["default"] = Table;
