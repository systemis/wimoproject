"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountModel = exports.UserModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var account_1 = __importDefault(require("../schemas/account"));
var user_1 = __importDefault(require("../schemas/user"));
var UserModel = mongoose_1.default.model('user', user_1.default);
exports.UserModel = UserModel;
var AccountModel = mongoose_1.default.model('account', account_1.default);
exports.AccountModel = AccountModel;
exports.default = Object.freeze({
    UserModel: UserModel,
    AccountModel: AccountModel,
});
