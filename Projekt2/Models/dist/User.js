"use strict";
exports.__esModule = true;
var jsonwebtoken_1 = require("jsonwebtoken");
var User = /** @class */ (function () {
    function User(user) {
        if (user) {
            this.id = user.id;
            this.login = user.login;
            this.password = user.password;
            this.notesCreatedIds = user.notesCreatedIds;
            this.tagsCreatedIds = user.tagsCreatedIds;
        }
        else {
            this.login = '';
            this.password = '';
            this.notesCreatedIds = [];
            this.tagsCreatedIds = [];
        }
    }
    User.prototype.UserIsAuthorized = function (authData, secret) {
        var token = authData.split(' ')[1];
        var payload = jsonwebtoken_1["default"].verify(token, secret);
        var checkValue = "";
        if (this.id) {
            checkValue = this.id.toString();
        }
        if (this.id && payload == checkValue)
            return true;
        else
            return false;
    };
    return User;
}());
exports["default"] = User;
