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
var lodash_1 = __importDefault(require("lodash"));
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var dotenv_1 = __importDefault(require("dotenv"));
var make_db_1 = __importDefault(require("./data-access/make-db"));
var api_1 = __importDefault(require("./routers/api"));
var data_access_1 = require("./data-access");
var twilio_config_1 = __importDefault(require("./twilio-config"));
var twilio_1 = __importDefault(require("twilio"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var client = twilio_1.default(twilio_config_1.default.SID, twilio_config_1.default.TOKEN);
dotenv_1.default.config();
var app = express_1.default();
app.use(body_parser_1.default.json({ limit: "10mb", strict: true }));
app.use(body_parser_1.default.urlencoded({ extended: false })); // use queryString library
app.set("trust proxy", true); // Express sitting behind proxy
app.use(cors_1.default());
app.use("/api", api_1.default);
make_db_1.default().then(function () { return __awaiter(void 0, void 0, void 0, function () {
    var user, account_list, password;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, data_access_1.UserDb.findByEmail({ email: 'systemofpeter@gmail.com' })];
            case 1:
                user = _a.sent();
                if (!!user) return [3 /*break*/, 3];
                console.log('making user');
                return [4 /*yield*/, data_access_1.UserDb.insert({
                        first_name: 'dragon2 ',
                        last_name: 'pham',
                        mobile_phone: '090002',
                        email: 'systemofpeter@gmail.com'
                    })];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3: return [4 /*yield*/, data_access_1.AccountDB.findAll()];
            case 4:
                account_list = _a.sent();
                if (!!lodash_1.default.size(account_list)) return [3 /*break*/, 7];
                console.log('account db is empty, creating new account');
                return [4 /*yield*/, bcrypt_1.default.hash('Profile', bcrypt_1.default.genSaltSync(10))];
            case 5:
                password = _a.sent();
                console.log(password);
                return [4 /*yield*/, data_access_1.AccountDB.insert({
                        email: 'tphamdn@gmail.com',
                        name: 'Pham Van Thinh',
                        password: password,
                        posts: [],
                    })];
            case 6:
                _a.sent();
                return [3 /*break*/, 8];
            case 7:
                console.log('Account Info: ', account_list[0]);
                _a.label = 8;
            case 8: return [2 /*return*/];
        }
    });
}); }).catch(function (err) { return console.error("error when create db: ", err); });
function create() {
    return __awaiter(this, void 0, void 0, function () {
        var phone_number, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phone_number = "+840905631878";
                    console.log(phone_number);
                    return [4 /*yield*/, client.verify.services(twilio_config_1.default.SERVICE_ID)
                            .verifications.create({
                            to: "+" + phone_number,
                            channel: 'sms'
                        })];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    return [2 /*return*/];
            }
        });
    });
}
function vertify(code) {
    return __awaiter(this, void 0, void 0, function () {
        var phone_number, response;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    phone_number = "+84905631878";
                    console.log(phone_number);
                    return [4 /*yield*/, client.verify.services(twilio_config_1.default.SERVICE_ID)
                            .verificationChecks.create({
                            to: "+" + phone_number,
                            code: code,
                            // statusCallback: 'http://postb.in/1234abcd'
                        })];
                case 1:
                    response = _a.sent();
                    console.log(response);
                    return [2 /*return*/];
            }
        });
    });
}
var PORT = process.env.port || 3290;
app.listen(PORT, function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log("server is listening on port " + PORT);
        return [2 /*return*/];
    });
}); });
