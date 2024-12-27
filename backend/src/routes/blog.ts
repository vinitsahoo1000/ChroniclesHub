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