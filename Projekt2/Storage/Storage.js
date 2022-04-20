"use strict";
exports.__esModule = true;
var Storage = /** @class */ (function () {
    function Storage(data) {
        this.notes = [];
        this.tags = [];
        this.users = [];
        if (data) {
            this.notes = data.notes;
            this.tags = data.tags;
            this.users = data.users;
        }
    }
    return Storage;
}());
exports["default"] = Storage;
