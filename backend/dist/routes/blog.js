"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.blogRouter = (0, express_1.default)();
exports.blogRouter.get('/', (req, res) => {
    res.send({
        msg: "Blog Router!!"
    });
});
