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

        const existingEmail = await prisma.user.findFirst({
            where: { email: payload.email },
        });

        const existingUsername = await prisma.user.findFirst({
            where: { username: payload.username },
        });

        if (existingEmail) {
            return res.status(400).json({ message: "Email is already in use" });
        }
        
        if (existingUsername) {
            return res.status(400).json({ message: "Username is already taken" });
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
        message: "User signed up successfully!!",
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
        message: "User logged in successfully!!",
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
        message: "User verified successfully!!",
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
                username:payload.username,
                bio:payload.bio
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

userRouter.put("/passwordUpdate",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId;

    try{
        const password = z.string().min(8).parse(req.body.password)
        if(!password){
            return res.status(400).json({message:"Invalid password"})
        }

        const user = await prisma.user.findFirst({
            where:{
                id:userId
            }
        })
        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const updatedUser = await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                password:hashedPassword
            }
        })
        if(!updatedUser){
            return res.status(500).json({message:"Failed to update password"})
        }

        return res.send({
            message: "Password updated successfully",
            user: updatedUser
        })
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})


userRouter.put("/follow/:userId",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const followerId = req.userId; //authenticated user
    const {userId} = req.params;   //user to follow

    try{
        const userToFollow = await prisma.user.findFirst({
            where:{
                id: userId
            }
        })
        if(!userToFollow){
            return res.status(404).json({message:"User not found"})
        }

        const alreadyFollowing = await prisma.follows.findFirst({
            where:{
                follower_id:followerId,
                following_id:userId
            }
        })

        if(alreadyFollowing){
            return res.status(400).json({message:"Already following this user"})
        }

        await prisma.follows.create({
            data: {
                follower_id: followerId!,
                following_id: userId
            }
        })

        return res.send({
            message: "Followed successfully"
        })
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})

userRouter.put("/unfollow/:userId",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const followerId = req.userId; //authenticated user
    const {userId} = req.params;  //user to unfollow

    try{
        const userToUnfollow = await prisma.user.findFirst({
            where:{
                id: userId
            }
        })

        if(!userToUnfollow){
            return res.status(404).json({message:"User not found"})
        }

        const alreadyFollowing = await prisma.follows.findFirst({
            where:{
                follower_id:followerId,
                following_id:userId
            }
        })

        if(!alreadyFollowing){
            return res.status(400).json({message:"Not following this user"})
        }

        await prisma.follows.deleteMany({
            where:{
                follower_id: followerId,
                following_id: userId
            }
        })

        return res.send({
            message: "Unfollowed successfully"
        })
    }
    catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})

userRouter.get("/details",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const userId = req.userId;

    try{
        const user = await prisma.user.findFirst({
            where:{
                id:userId
            },
            select:{
                id: true,
                name: true,
                bio: true,
                imageUrl: true,
                email: true,
                username: true,
                blog:true,
                liked: true,
                follower: true,
                following: true
            }
        })

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        return res.send({
            message: "User details fetched successfully",
            user: user
        })
    }catch(e){
        console.error(e);
        res.status(500).json({message:"Internal server error"})
    }
})

userRouter.get("/profile/:username",authMiddleware,async(req:Request,res:Response):Promise<any>=>{
    const userID = req.userId;
    const {username} = req.params;

    try{
        const user = await prisma.user.findFirst({
            where:{
                username:username
            },
            select:{
                id:true,
                email:true,
                name:true,
                username:true,
                bio:true,
                imageUrl:true,
                follower:true,
                following:true,
                blog: true
            }
        })

        if(!user){
            return res.status(404).json({message:"User not found"})
        }

        return res.send({
            message: "User profile fetched successfully",
            user: user
        })

    }catch(e){
        return res.status(500).json({message:"Internal server error"})
    }
})