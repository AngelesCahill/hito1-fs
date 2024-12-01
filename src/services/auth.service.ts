import { userService } from "./user.service";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const loginWithEmailAndPassword = async(email: string, password: string)=>{
    const users = await userService.getAllUsers();

    //1.-Verificar que existe el usuario
    const user = users.find((item) =>  item.email === email );
    if(!user){
        throw new Error("User not found");
    }

    //2.-Comparar los hash de contraseña. 
    //El método compare nos da un true o un false
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(!isValidPassword){
        throw new Error("Invalid password");
    }

    //3.-Generar el token JWT www.jwt.io
    //npm install jsonwebtoken
    //npm i --save-dev @types/jsonwebtoken
    const token = jwt.sign({email: user.email},"secret", {
        expiresIn: "1h"
    });
    return token;
};


export const authService = {
    loginWithEmailAndPassword,
}

