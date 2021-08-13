"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var userSchema = new Schema({
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    mobile_phone: { type: String, required: true, trim: true },
}, {
    timestamps: {
        createdAt: "created_at",
        updatedAt: "updated_at",
    },
    autoCreate: true,
});
exports.default = userSchema;
