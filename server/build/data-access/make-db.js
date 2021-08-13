"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeDatabaseOptions = exports.makeLogsDatabseURL = exports.makeDatabaseURL = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
function makeDb() {
    return __awaiter(this, void 0, void 0, function () {
        var DATABASE_URL, DATABASE_OPTIONS, is_not_connected;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    DATABASE_URL = makeDatabaseURL();
                    DATABASE_OPTIONS = makeDatabaseOptions();
                    is_not_connected = mongoose_1.default.connection.readyState == 0;
                    if (!is_not_connected) return [3 /*break*/, 2];
                    console.log("Setting up database...");
                    return [4 /*yield*/, mongoose_1.default.connect(DATABASE_URL, DATABASE_OPTIONS)];
                case 1:
                    _a.sent();
                    console.log("Successfully connected to DB");
                    _a.label = 2;
                case 2: return [2 /*return*/, mongoose_1.default];
            }
        });
    });
}
function makeDatabaseURL() {
    var _a = process.env, _b = _a.MONGO_USERNAME, MONGO_USERNAME = _b === void 0 ? 'admin' : _b, _c = _a.MONGO_PASSWORD, MONGO_PASSWORD = _c === void 0 ? 'Passw0rd' : _c, _d = _a.MONGO_HOSTNAME, MONGO_HOSTNAME = _d === void 0 ? 'localhost' : _d, _e = _a.MONGO_PORT, MONGO_PORT = _e === void 0 ? 27017 : _e, _f = _a.MONGO_DB, MONGO_DB = _f === void 0 ? 'wimo' : _f;
    var DATABASE_URL = process.env.DATABASE_URL ||
        "mongodb://" + MONGO_USERNAME + ":" + MONGO_PASSWORD + "@" + MONGO_HOSTNAME + ":" + MONGO_PORT + "/" + MONGO_DB + "?authSource=admin";
    console.log("url: " + DATABASE_URL);
    return DATABASE_URL;
}
exports.makeDatabaseURL = makeDatabaseURL;
function makeLogsDatabseURL() {
    var DATABASE_URL = process.env.LOGS_DATABASE_URL;
    return DATABASE_URL || makeDatabaseURL();
}
exports.makeLogsDatabseURL = makeLogsDatabseURL;
function makeDatabaseOptions() {
    var options = {
        useNewUrlParser: true,
        connectTimeoutMS: 10000,
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
    };
    return options;
}
exports.makeDatabaseOptions = makeDatabaseOptions;
exports.default = makeDb;
