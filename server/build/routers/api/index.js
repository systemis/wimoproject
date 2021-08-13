"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("../../express-callback/index"));
var controllers_1 = require("../../controllers");
var userRouter = express_1.default.Router();
userRouter.get('/', index_1.default(controllers_1.getUsersController)); // Get users information list 
userRouter.post('/', index_1.default(controllers_1.createUserController)); // Get users information list 
userRouter.post('/sms-vertification/', index_1.default(controllers_1.sendVertificationController));
exports.default = userRouter;
