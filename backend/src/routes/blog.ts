import express from "express";

export const blogRouter = express();


blogRouter.get('/',(req,res) =>{
    res.send({
        msg: "Blog Router!!"
    })
})

