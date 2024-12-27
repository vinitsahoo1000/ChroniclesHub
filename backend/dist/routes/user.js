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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const chronicleshub_common_1 = require("@vinitsahoo1000/chronicleshub-common");
const client_1 = require("@prisma/client");
const bcrypt_1 = __importDefault(require("bcrypt"));
const zod_1 = require("zod");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("../middleware");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const multer_1 = __importDefault(require("multer"));
exports.userRouter = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.userRouter.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = chronicleshub_common_1.signupInput.parse(req.body);
        const existingUser = yield prisma.user.findFirst({
            where: {
                OR: [
                    { email: payload.email },
                    { username: payload.username }
                ]
            }
        });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = yield bcrypt_1.default.hash(payload.password, 10);
        const user = yield prisma.user.create({
            data: {
                email: payload.email,
                name: payload.name,
                username: payload.username,
                password: hashedPassword
            }
        });
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
        res.send({
            msg: "User signed up successfully!!",
            token: token
        });
    }
    catch (e) {
        if (e instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                message: "Invalid input",
                error: e.errors
            });
        }
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.userRouter.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = chronicleshub_common_1.loginInput.parse(req.body);
        const user = yield prisma.user.findFirst({
            where: {
                OR: [
                    { email: payload.email },
                    { username: payload.username }
                ]
            }
        });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        const passwordMatch = yield bcrypt_1.default.compare(payload.password, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET);
        res.send({
            msg: "User logged in successfully!!",
            token: token
        });
    }
    catch (e) {
        if (e instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                message: "Invalid input",
                error: e.errors
            });
        }
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.userRouter.get("/verify", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const username = req.username;
        const userId = req.userId;
        res.send({
            msg: "User verified successfully!!",
            username: username,
            userId: userId
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.userRouter.put("/profilePhotoUpdate", middleware_1.authMiddleware, upload.single("profilePhoto"), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const user = yield prisma.user.findFirst({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        let profilePhotoUrl = null;
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: 'profile-photos',
                resource_type: 'image'
            });
            profilePhotoUrl = result.secure_url;
        }
        const updatedUser = yield prisma.user.update({
            where: {
                id: userId
            },
            data: {
                imageUrl: profilePhotoUrl
            }
        });
        if (!updatedUser) {
            return res.status(500).json({ message: "Failed to update profile photo" });
        }
        return res.send({
            message: "Profile photo updated successfully",
            user: updatedUser
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.userRouter.put("/update", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const payload = chronicleshub_common_1.userUpdateInput.parse(req.body);
        const user = yield prisma.user.findFirst({
            where: {
                id: userId
            }
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const inputTaken = yield prisma.user.findFirst({
            where: {
                OR: [
                    { email: payload.email },
                    { username: payload.username }
                ]
            }
        });
        if (inputTaken) {
            return res.status(400).json({ message: "Email or username already taken" });
        }
        const updatedUser = yield prisma.user.update({
            where: {
                id: userId
            },
            data: {
                email: payload.email,
                name: payload.name,
                username: payload.username
            }
        });
        if (!updatedUser) {
            return res.status(500).json({ message: "Failed to update user" });
        }
        return res.send({
            message: "User updated successfully",
            user: updatedUser
        });
    }
    catch (e) {
        if (e instanceof zod_1.z.ZodError) {
            return res.status(400).json({
                message: "Invalid input",
                error: e.errors
            });
        }
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
