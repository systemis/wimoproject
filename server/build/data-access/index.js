"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDb = void 0;
var make_user_db_1 = __importDefault(require("./make-user-db"));
var models_1 = require("./models");
var UserDb = make_user_db_1.default({ userDbModel: models_1.UserModel });
exports.UserDb = UserDb;
