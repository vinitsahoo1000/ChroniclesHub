import { Request,Response,NextFunction } from "express"
import jwt from "jsonwebtoken";

declare global {
    namespace Express {
        interface Request {
        userId?: string;
        username?: string;
    }
    }
}

export const authMiddleware = (req:Request,res:Response,next:NextFunction):void=>{
    const authHeader = req.headers['authorization'] || "";

    if(!authHeader){
        res.status(401).send({
            error: "Authorization header missing."
        })
        return;
    }

    const jwtToken = authHeader.split(' ')[1]

    if(!jwtToken){
        res.status(401).send({
            error: "Authorization header missing."
        })
        return;
    }

    jwt.verify(jwtToken,process.env.JWT_SECRET!,(err,decoded)=>{
        if(err||!decoded){
            res.status(403).send({
                error:"Invalid token. Access denied"
            })
            return;
        }

        const payload = decoded as jwt.JwtPayload;

        req.userId = payload.userId;    
        req.username = payload.email;
        next();
    })
}

