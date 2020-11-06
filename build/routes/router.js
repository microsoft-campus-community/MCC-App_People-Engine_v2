"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var users_1 = __importDefault(require("./users"));
var router = express_1.default.Router();
router.use("/users", users_1.default);
exports.default = router;
//# sourceMappingURL=router.js.map