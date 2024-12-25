"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mainRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_1 = require("./user");
const blog_1 = require("./blog");
exports.mainRouter = (0, express_1.default)();
exports.mainRouter.use('/user', user_1.userRouter);
exports.mainRouter.use('/blog', blog_1.blogRouter);
