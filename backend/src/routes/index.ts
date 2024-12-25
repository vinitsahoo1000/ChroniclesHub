import express from "express";
import { userRouter } from "./user";
import { blogRouter } from "./blog";


export const mainRouter = express();


mainRouter.use('/user',userRouter);
mainRouter.use('/blog',blogRouter);
