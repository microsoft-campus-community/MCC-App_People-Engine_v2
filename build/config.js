"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var config = {
    graphClientId: "", graphClientSecret: "", graphTenant: ""
};
config.graphClientId = process.env.CLIENTID || "";
config.graphClientSecret = process.env.CLIENTSECRET || "";
config.graphTenant = process.env.TENANT || "";
if (config.graphClientId === "" || config.graphClientSecret === "" || config.graphTenant === "")
    throw "Configuration incomplete!";
exports.default = config;
//# sourceMappingURL=config.js.map