import { Request, Response } from "express";
import { userService } from "../services/user.service";
import { authService } from "../services/auth.service";

const login = async (req: Request, res: Response)=>{
    try {
        const {email, password} = req.body;
        const token = await authService.loginWithEmailAndPassword(email, password);
        res.json({token})
    } catch (error) {
        console.log(error);
        if (error instanceof Error){
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: "Server error"})
        }
    }
};

const register = async (req: Request, res: Response)=>{
    try {
        const {email, password} = req.body;
        const newUser = await userService.createUser(email, password);
        res.json({newUser});
    } catch (error) {
        console.log(error);
        if (error instanceof Error){
            res.status(500).json({error: error.message});
        } else {
            res.status(500).json({error: "Server error"})
        }
    }
};

export const authController = {
    login,
    register
}


