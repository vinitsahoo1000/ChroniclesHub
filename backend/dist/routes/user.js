"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.userRouter = (0, express_1.default)();
exports.userRouter.get('/', (req, res) => {
    res.send({
        msg: "User Router!!!"
    });
});
