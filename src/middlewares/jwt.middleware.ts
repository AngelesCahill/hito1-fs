import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
export const verifyToken = async (req: Request, res: Response, next: NextFunction)=>{
    //Leer header
    const authHeader = req.headers.authorization;
    if(!authHeader){
        res.status(401).json("No contiene Bearer Header");
        return 
    }
    const token = authHeader.split(" ")[1];

    try {
        const payload = jwt.verify(token, "secret");
        console.log(payload);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Token inválido"})
    }
};