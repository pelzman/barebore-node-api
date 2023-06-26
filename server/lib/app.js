"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const engine_1 = require("./engine");
/*
implement your server code here
*/
const server = http_1.default.createServer((req, res) => {
    if (req.method === "POST" && req.url === "/data/add") {
        return engine_1.createDataBase(req, res);
    }
});
server.listen(3005, () => console.log(`server start running on port ${3005}`));
