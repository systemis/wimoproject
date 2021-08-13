"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUsers = void 0;
var data_access_1 = require("../data-access");
var get_uses_1 = __importDefault(require("./get-uses"));
var create_user_1 = __importDefault(require("./create-user"));
var getUsers = get_uses_1.default(data_access_1.UserDb);
exports.getUsers = getUsers;
var createUser = create_user_1.default(data_access_1.UserDb);
exports.createUser = createUser;
