import { createBlogInput, updateBlogInput } from "@vinitsahoo1000/chronicleshub-common";
import express,{Request,Response} from "express";
import { PrismaClient } from "@prisma/client";
import z from "zod";
import multer from "multer";
import { authMiddleware } from "../middleware";
import cloudinary from "../config/cloudinary";

const prisma = new PrismaClient();

export const blogRouter = express();
const upload = multer({dest:"uploads/"});

blogRouter.post("/post",authMiddleware,upload.single('image'),async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId
    try{
        const payload = createBlogInput.parse(req.body)

        let imageUrl = null;
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder:"posts/",
                resource_type:"image"
            })
            imageUrl = result.secure_url;
        }
        const blog = await prisma.blog.create({
            data:{
                title:payload.title,
                content:payload.content,
                authorId: userId!,
                imageUrl:imageUrl
            }
        })

        res.send({
            msg: "Blog created successfully!!",
            blog: blog
        })

    }catch(e){
        if(e instanceof z.ZodError){
            return res.status(400).json({
                message:"Invalid input",
                error: e.errors
            })
        }

        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
});


blogRouter.put("/update/:id",authMiddleware,upload.single('image'),async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId
    const blogId = req.params.id
    try{
        const payload = updateBlogInput.parse(req.body)

        let imageUrl = undefined;
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder:"posts/",
                resource_type:"image"
            })
            imageUrl = result.secure_url;
        }

        const existingBlog = await prisma.blog.findUnique({
            where: { id: blogId, authorId: userId }
        });

        // If no new image is uploaded, use the existing image URL
        if (!imageUrl) {
            imageUrl = existingBlog?.imageUrl;
        }

        const blog = await prisma.blog.update({
            where:{
                id:blogId,
                authorId: userId
            },
            data:{
                title:payload.title,
                content:payload.content,
                imageUrl:imageUrl
            }
        })

        res.send({
            msg: "Blog updated successfully!!",
            blog: blog
        })

    }catch(e){
        if(e instanceof z.ZodError){
            return res.status(400).json({
                message:"Invalid input",
                error: e.errors
            })
        }

        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})

blogRouter.get("/bulk",async(req:Request,res:Response):Promise<any>=>{
    try{
        const blogs = await prisma.blog.findMany({
            orderBy:{
                createdAt:"desc"
            },
            include:{
                likes:true,
                comments:true,
                author:true
            }
        })

        res.send(blogs)
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})

blogRouter.put("/:blogId/like",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId;
    const {blogId} = req.params;

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: blogId
            }
        })
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }

        const alreadyLiked = await prisma.blog.findFirst({
            where:{
                id: blogId,
                likes:{
                    some:{
                        id:userId
                    }
                }
            }
        })

        if(alreadyLiked){
            return res.status(400).json({message:"Blog already liked"})
        }

        await prisma.blog.update({
            where:{
                id: blogId
            },
            data:{
                likes:{
                    connect:{
                        id:userId
                    }
                }
            }
        })
        return res.send({
            msg: "Blog liked successfully"
        })
        
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})

blogRouter.put("/:blogId/unlike",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId;
    const {blogId} = req.params;

    try{
        const blog = await prisma.blog.findFirst({
            where:{
                id: blogId
            }
        })

        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }

        const alreadyLiked = await prisma.blog.findFirst({
            where:{
                id: blogId,
                likes:{
                    some:{
                        id:userId
                    }
                }
            }
        })

        if(!alreadyLiked){
            return res.status(400).json({message:"Blog not liked"})
        }

        await prisma.blog.update({
            where:{
                id: blogId
            },
            data:{
                likes:{
                    disconnect:{
                        id:userId
                    }
                }
            }
        })
        return res.send({
            msg: "Blog unliked successfully"
        })
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})

blogRouter.post("/:blogId/comment",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId;
    const {blogId} = req.params;
    const content = req.body.content;

    try{    
        const blog = await prisma.blog.findFirst({
            where:{
                id: blogId
            }
        })
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }

        const comment = await prisma.comment.create({
            data:{
                content: content,
                blogId: blogId,
                authorId: userId!
            }
        })

        return res.status(200).send({
            msg: "Comment posted successfully",
            comment: comment
        })

    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})


blogRouter.delete("/delete/:id",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const userID = req.userId;
    const blogID = req.params.id;
    try{
        const blog = await prisma.blog.findUnique({
            where:{
                id:blogID
            }
        })
        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }

        if(blog.authorId !== userID){
            return res.status(403).json({message:"Unauthorized"})
        }

        await prisma.blog.delete({
            where:{
                id:blogID
            }
        })
        res.send({message:"Blog deleted successfully"})
    }
    catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})

blogRouter.delete("/:blogId/comment/:commentId",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId;
    const {blogId,commentId} = req.params;

    try{
        const comment = await prisma.comment.findFirst({
            where:{
                id:commentId,
                blogId:blogId
            }
        })
        if(!comment){
            return res.status(404).json({message:"Comment not found"})
        }

        if(comment.authorId !== userId){
            return res.status(403).json({message:"Unauthorized"})
        }

        await prisma.comment.delete({
            where:{
                id:commentId
            }
        })

        res.send({message:"Comment deleted successfully"})
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})


blogRouter.get("/:blogId/comments",async(req:Request,res:Response):Promise<any>=>{
    const blogId = req.params.blogId;
    try{
        const comments = await prisma.comment.findMany({
            where:{
                blogId: blogId
            },
            include:{
                author:{
                    select:{
                        id: true,
                        name:true,
                        imageUrl:true,
                        username:true
                    }
                }
            }
        })

        if (!comments || comments.length === 0) {
            return res.status(200).json([]);
        }

        res.status(200).send(comments);
    }catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server error"})
    }
})


blogRouter.get("/:id",async(req:Request,res:Response):Promise<any>=>{
    const blogId = req.params.id
    try{
        const blog = await prisma.blog.findUnique({
            where:{
                id:blogId
            },
            include:{
                likes:true,
                author: {
                    select: {
                    id: true,
                    name: true,
                    email: true,
                    username: true,
                    bio: true,
                    imageUrl: true
                    },
                },
            }
        })

        if(!blog){
            return res.status(404).json({message:"Blog not found"})
        }

        res.send(blog)
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})