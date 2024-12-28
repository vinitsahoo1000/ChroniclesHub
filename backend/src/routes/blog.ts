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

        let imageUrl = null;
        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder:"posts/",
                resource_type:"image"
            })
            imageUrl = result.secure_url;
        }

        const blog = await prisma.blog.update({
            where:{
                id:blogId
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

blogRouter.get("/:id",async(req:Request,res:Response):Promise<any>=>{
    const blogId = req.params.id
    try{
        const blog = await prisma.blog.findUnique({
            where:{
                id:blogId
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