"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(_a) {
        var _id = _a._id, first_name = _a.first_name, last_name = _a.last_name, mobile_phone = _a.mobile_phone, email = _a.email;
        this._id = _id || '';
        this.first_name = first_name;
        this.last_name = last_name;
        this.mobile_phone = mobile_phone;
        this.email = email;
    }
    User.prototype.validateEmail = function (email) {
        var emailRegex = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return emailRegex.test(email);
    };
    return User;
}());
exports.default = User;
