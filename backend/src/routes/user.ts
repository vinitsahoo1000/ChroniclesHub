import express from "express";

export const userRouter = express();

userRouter.get('/',(req,res) =>{
    res.send({
        msg: "User Router!!!"
    })
})