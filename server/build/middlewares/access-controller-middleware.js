"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
function accessControllerMiddleware(req, res, next) {
    var origin = getAccessControlAllowOrigin(req);
}
exports.default = accessControllerMiddleware;
function getAccessControlAllowOrigin(req) {
    var allowed_origins = [
        "https://app.wimo.com", // Example when to publish to production 
    ];
    var origin = lodash_1.default.get(req, "headers.origin");
    var is_allowed = allowed_origins.includes(origin);
    if (is_allowed) {
        return origin;
    }
    if (process.env.ACCESS_CONTROL_ALLOW_ORIGIN) {
        return process.env.ACCESS_CONTROL_ALLOW_ORIGIN;
    }
    return process.env.DASHBOARD_URL && process.env.NODE_ENV === "production"
        ? process.env.DASHBOARD_URL
        : "http://localhost:3000"; // For localhost
}
