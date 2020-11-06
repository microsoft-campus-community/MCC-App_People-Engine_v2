"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./routes/router"));
var app = express_1.default();
app.use("/api", router_1.default);
app.listen(process.env.PORT || 3001, function () {
    console.info("Server is running on Port 3001!");
});
//# sourceMappingURL=index.js.map