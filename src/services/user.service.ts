import { nanoid } from "nanoid"; 
import { UserModel } from "../models/user.model";
import bcrypt from "bcryptjs";

const getAllUsers = async () => { 
    const users = await UserModel.readUsers(); 
    return users; 
}; 
    
const getUserById = async (id: string) => { 
    const users = await UserModel.readUsers(); 
    const user = users.find((user) => user.id === id); 
    return user; 
}; 
    
const getUserByEmail = async (email: string) => { 
    const users = await UserModel.readUsers(); 
    const user = users.find((user) => user.email === email); 
    return user; 
}; 

const createUser = async (email: string, password: string) => { 
    const user = await getUserByEmail(email); 
    if (user) { throw new Error("User already exists"); }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = { 
        id: nanoid(), 
        email, 
        password: hashedPassword
    }; 
        
    const users = await UserModel.readUsers();
    users.push(newUser); 
    await UserModel.writeUsers(users); 
    return newUser;
}
       
const deleteUser = async (id: string) => { 
    const user = await getUserById(id); 
    if (!user) { throw new Error("User not found") } 
    const users = await UserModel.readUsers(); 
    const filteredUsers = users.filter((user) => user.id !== id); 
    return await UserModel.writeUsers(filteredUsers); 
};

const updateUser = async (id: string, email: string, password: string) => { 
    const user = await getUserById(id); 
    if (!user) { throw new Error("User not found") } 
    const users = await UserModel.readUsers(); 
    const updatedUsers = users.map((user) => { 
        if (user.id === id) { 
            return { ...user, email, password, }
        } 
    return user; 
    }); 
    return await UserModel.writeUsers(updatedUsers); 
}; 
   
export const userService = { 
    getAllUsers, 
    getUserById, 
    getUserByEmail, 
    createUser, 
    deleteUser, 
    updateUser, 
    };