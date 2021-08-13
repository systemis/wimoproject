"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendVertificationController = exports.createUserController = exports.getUsersController = void 0;
var use_cases_1 = require("../use-cases/");
var get_user_1 = __importDefault(require("./get-user"));
var create_user_1 = __importDefault(require("./create-user"));
var send_vertification_1 = __importDefault(require("./send-vertification"));
var getUsersController = get_user_1.default({ getUsers: use_cases_1.getUsers });
exports.getUsersController = getUsersController;
var createUserController = create_user_1.default({ createUser: use_cases_1.createUser });
exports.createUserController = createUserController;
var sendVertificationController = send_vertification_1.default();
exports.sendVertificationController = sendVertificationController;
