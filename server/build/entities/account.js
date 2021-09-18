"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Account = /** @class */ (function () {
    function Account(_a) {
        var _id = _a._id, email = _a.email, name = _a.name, password = _a.password, posts = _a.posts;
        this._id = _id || '';
        this.email = email;
        this.name = name;
        this.password = password;
        this.posts = posts;
    }
    return Account;
}());
exports.default = Account;
