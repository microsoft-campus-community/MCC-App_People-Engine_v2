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
exports.getAllUsers = void 0;
var node_fetch_1 = __importDefault(require("node-fetch"));
var url_1 = require("url");
var config_1 = __importDefault(require("../config"));
function getAllUsers() {
    return __awaiter(this, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, query("/users")];
                case 1:
                    users = _a.sent();
                    return [2, users];
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
function query(database, method, payload, token) {
    return __awaiter(this, void 0, void 0, function () {
        var options, request, json;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!!token) return [3, 2];
                    return [4, getApplicationToken()];
                case 1:
                    token = _a.sent();
                    _a.label = 2;
                case 2:
                    options = {
                        method: method || "GET",
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    };
                    if (payload) {
                        options.body = JSON.stringify(payload);
                        options.headers["Content-Type"] = "application/json";
                    }
                    return [4, node_fetch_1.default("https://graph.microsoft.com/v1.0/" + database, options)];
                case 3:
                    request = _a.sent();
                    return [4, request.json()];
                case 4:
                    json = _a.sent();
                    return [2, json];
            }
        });
    });
}
function getApplicationToken() {
    return __awaiter(this, void 0, void 0, function () {
        var formInput, request, json, token;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    formInput = new url_1.URLSearchParams;
                    formInput.append("grant_type", "client_credentials");
                    formInput.append("client_id", config_1.default.graphClientId);
                    formInput.append("client_secret", config_1.default.graphClientSecret);
                    formInput.append("scope", "https://graph.microsoft.com/.default");
                    return [4, node_fetch_1.default("https://login.microsoftonline.com/" + config_1.default.graphTenant + "/oauth2/v2.0/token", {
                            method: "POST",
                            body: formInput
                        }).catch(function (e) {
                            throw e;
                        })];
                case 1:
                    request = _a.sent();
                    return [4, request.json()];
                case 2:
                    json = _a.sent();
                    token = json.access_token;
                    return [2, token];
            }
        });
    });
}
//# sourceMappingURL=graph.js.map