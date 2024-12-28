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
exports.blogRouter = void 0;
const chronicleshub_common_1 = require("@vinitsahoo1000/chronicleshub-common");
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const zod_1 = __importDefault(require("zod"));
const multer_1 = __importDefault(require("multer"));
const middleware_1 = require("../middleware");
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const prisma = new client_1.PrismaClient();
exports.blogRouter = (0, express_1.default)();
const upload = (0, multer_1.default)({ dest: "uploads/" });
exports.blogRouter.post("/post", middleware_1.authMiddleware, upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    try {
        const payload = chronicleshub_common_1.createBlogInput.parse(req.body);
        let imageUrl = null;
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: "posts/",
                resource_type: "image"
            });
            imageUrl = result.secure_url;
        }
        const blog = yield prisma.blog.create({
            data: {
                title: payload.title,
                content: payload.content,
                authorId: userId,
                imageUrl: imageUrl
            }
        });
        res.send({
            msg: "Blog created successfully!!",
            blog: blog
        });
    }
    catch (e) {
        if (e instanceof zod_1.default.ZodError) {
            return res.status(400).json({
                message: "Invalid input",
                error: e.errors
            });
        }
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.blogRouter.put("/update/:id", middleware_1.authMiddleware, upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const blogId = req.params.id;
    try {
        const payload = chronicleshub_common_1.updateBlogInput.parse(req.body);
        let imageUrl = null;
        if (req.file) {
            const result = yield cloudinary_1.default.uploader.upload(req.file.path, {
                folder: "posts/",
                resource_type: "image"
            });
            imageUrl = result.secure_url;
        }
        const blog = yield prisma.blog.update({
            where: {
                id: blogId
            },
            data: {
                title: payload.title,
                content: payload.content,
                imageUrl: imageUrl
            }
        });
        res.send({
            msg: "Blog updated successfully!!",
            blog: blog
        });
    }
    catch (e) {
        if (e instanceof zod_1.default.ZodError) {
            return res.status(400).json({
                message: "Invalid input",
                error: e.errors
            });
        }
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.blogRouter.get("/bulk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const blogs = yield prisma.blog.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        res.send(blogs);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.blogRouter.put("/:blogId/like", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.userId;
    const { blogId } = req.params;
    try {
        const blog = yield prisma.blog.findFirst({
            where: {
                id: blogId
            }
        });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        const alreadyLiked = yield prisma.blog.findFirst({
            where: {
                id: blogId,
                likes: {
                    some: {
                        id: userId
                    }
                }
            }
        });
        if (alreadyLiked) {
            return res.status(400).json({ message: "Blog already liked" });
        }
        yield prisma.blog.update({
            where: {
                id: blogId
            },
            data: {
                likes: {
                    connect: {
                        id: userId
                    }
                }
            }
        });
        return res.send({
            msg: "Blog liked successfully"
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.blogRouter.delete("/delete/:id", middleware_1.authMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userID = req.userId;
    const blogID = req.params.id;
    try {
        const blog = yield prisma.blog.findUnique({
            where: {
                id: blogID
            }
        });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.authorId !== userID) {
            return res.status(403).json({ message: "Unauthorized" });
        }
        yield prisma.blog.delete({
            where: {
                id: blogID
            }
        });
        res.send({ message: "Blog deleted successfully" });
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
exports.blogRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const blogId = req.params.id;
    try {
        const blog = yield prisma.blog.findUnique({
            where: {
                id: blogId
            }
        });
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        res.send(blog);
    }
    catch (e) {
        console.error(e);
        res.status(500).json({ message: "Internal server error" });
    }
}));
