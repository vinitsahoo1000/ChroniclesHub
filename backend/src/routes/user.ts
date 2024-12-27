import express,{Request,Response} from "express";
import { loginInput, signupInput,userUpdateInput } from "@vinitsahoo1000/chronicleshub-common";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { z } from "zod";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middleware";
import cloudinary from "../config/cloudinary";
import multer from "multer";

export const userRouter = express();
const prisma = new PrismaClient();
const upload = multer({dest:"uploads/"});


userRouter.post("/signup",async(req:Request,res:Response):Promise<any>=>{
    try{
        const payload = signupInput.parse(req.body)

        const existingUser = await prisma.user.findFirst({
            where:{
                OR:[
                    {email:payload.email},
                    {username:payload.username}
                ]
            }
        })

        if(existingUser){
            return res.status(400).json({message:"User already exists"})
        }

        const hashedPassword = await bcrypt.hash(payload.password,10)

        const user = await prisma.user.create({
            data:{
                email:payload.email,
                name:payload.name,
                username:payload.username,
                password:hashedPassword
            }
        })

        const token = jwt.sign({userId:user.id,email:user.email},process.env.JWT_SECRET as string)

        res.send({
        msg: "User signed up successfully!!",
        token: token
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

userRouter.post("/login",async(req:Request,res:Response):Promise<any>=>{
    try{
        const payload = loginInput.parse(req.body)
        const user = await prisma.user.findFirst({
            where:{
                OR:[
                    {email:payload.email},
                    {username:payload.username}
                ]
            }
        })

        if(!user){
            return res.status(400).json({message:"User not found"})
        }

        const passwordMatch = await bcrypt.compare(payload.password,user.password)
        if(!passwordMatch){
            return res.status(400).json({message:"Invalid password"})
        }

        const token = jwt.sign({userId:user.id,email:user.email},process.env.JWT_SECRET as string)
        res.send({
        msg: "User logged in successfully!!",
        token: token
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


userRouter.get("/verify",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    try{
    const username = req.username;
    const userId = req.userId;

    res.send({
        msg: "User verified successfully!!",
        username: username,
        userId: userId
    })}
    catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
});


userRouter.put("/profilePhotoUpdate",authMiddleware,upload.single("profilePhoto"),async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId;

    try{
        const user = await prisma.user.findFirst({
            where:{
                id:userId
            }
        })

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        let profilePhotoUrl = null;

        if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path,{
                folder:'profile-photos',
                resource_type:'image'
            })
            profilePhotoUrl = result.secure_url;
        }

        const updatedUser = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                imageUrl:profilePhotoUrl
            }
        })

        if(!updatedUser){
            return res.status(500).json({message:"Failed to update profile photo"})
        }

        return res.send({
            message: "Profile photo updated successfully",
            user: updatedUser
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})


userRouter.put("/update",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId;

    try{
        const payload = userUpdateInput.parse(req.body)

        const user = await prisma.user.findFirst({
            where:{
                id:userId
            }
        })

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const inputTaken = await prisma.user.findFirst({
            where:{
                OR:[
                    {email:payload.email},
                    {username:payload.username}
                ]
            }
        })

        if(inputTaken){
            return res.status(400).json({message:"Email or username already taken"})
        }

        const updatedUser = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                email:payload.email,
                name:payload.name,
                username:payload.username
            }
        })

        if(!updatedUser){
            return res.status(500).json({message:"Failed to update user"})
        }

        return res.send({
            message: "User updated successfully",
            user: updatedUser
        })
    }
    catch(e){
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

