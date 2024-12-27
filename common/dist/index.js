"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCommentInput = exports.createCommentInput = exports.updateBlogInput = exports.createBlogInput = exports.userUpdateInput = exports.loginInput = exports.signupInput = void 0;
const zod_1 = __importDefault(require("zod"));
exports.signupInput = zod_1.default.object({
    email: zod_1.default.string().email(),
    name: zod_1.default.string().min(1),
    username: zod_1.default.string().min(1),
    password: zod_1.default.string().min(8),
});
exports.loginInput = zod_1.default.object({
    email: zod_1.default.string().email().optional(),
    username: zod_1.default.string().min(1).optional(),
    password: zod_1.default.string().min(8),
});
exports.userUpdateInput = zod_1.default.object({
    email: zod_1.default.string().email().optional(),
    name: zod_1.default.string().min(1).optional(),
    bio: zod_1.default.string().min(1).optional(),
    imageUrl: zod_1.default.string().min(1).optional(),
    username: zod_1.default.string().min(1).optional(),
    password: zod_1.default.string().min(8).optional(),
});
exports.createBlogInput = zod_1.default.object({
    title: zod_1.default.string().min(1),
    body: zod_1.default.string().min(1),
});
exports.updateBlogInput = zod_1.default.object({
    id: zod_1.default.string().min(1),
    title: zod_1.default.string().min(1).optional(),
    body: zod_1.default.string().min(1).optional(),
});
exports.createCommentInput = zod_1.default.object({
    body: zod_1.default.string().min(1),
});
exports.updateCommentInput = zod_1.default.object({
    body: zod_1.default.string().min(1).optional(),
});
