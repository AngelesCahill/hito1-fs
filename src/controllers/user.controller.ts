import { Request, Response} from 'express';
import { userService } from '../services/user.service';

const getUsers = async (req: Request, res: Response) => { 
    try { 
        const users = await userService.getAllUsers(); 
        res.json(users); 
    } 
    catch (error) { 
        console.log(error);
        res.status(500).json({ message: "Internal server error" }) 
    } 
};
    
const getUser = async (req: Request, res: Response) => { 
    try { 
        const { id } = req.params; 
        const user = await userService.getUserById(id); 
        if (!user) { 
            res.status(404).json({ message: "User not found" }); 
        } else { 
            res.json(user); 
        } 
    } 
    catch (error) { 
        console.log(error); 
        res.status(500).json({ message: "Internal server error" }); 
    } 
};

const getUserByEmail = async (req: Request, res: Response) => { 
    try { 
        const { email } = req.params; 
        const user = await userService.getUserByEmail(email); 
        if (!user) { 
            res.status(404).json({ message: "User not found" }); 
        } else { 
            res.json(user); 
        } 
    } 
    catch (error) { 
        console.log(error); 
        res.status(500).json({ message: "Internal server error" }); 
    } 
};

const createUser = async (req: Request, res: Response) => { 
    const { email, password } = req.body; 
    try { 
        const newUser = await userService.createUser(email, password); 
        res.status(201).json({newUser}); 
    } 
    catch (error) { 
        console.log(error); 
        if (error instanceof Error) { 
            res.status(500).json({ message: error.message }); 
        } else { 
            res.status(500).json({ message: "Internal server error" }); 
        } 
    } 
};

const deleteUser = async (req: Request, res: Response) => { 
    const { id } = req.params; 
    try { 
        await userService.deleteUser(id); 
        res.status(204).json({message: "Usuario eliminado"}); 
    } 
    catch (error) { 
        console.log(error); 
        if (error instanceof Error) { 
            res.status(500).json({ message: error.message }); 
        } else { 
            res.status(500).json({ message: "Internal server error" }); 
        } 
    } 
};

const updateUser = async (req: Request, res: Response) => { 
    const { id } = req.params; 
    const { email, password } = req.body; 
    try { 
        await userService.updateUser(id, email, password); 
        res.json({ message: "User updated" }); 
    } 
    catch (error) { 
        console.log(error); 
        if (error instanceof Error) { 
            res.status(500).json({ message: error.message }); 
        } else { 
            res.status(500).json({ message: "Internal server error" }); 
        } 
    } 
};

export const userController = { 
    createUser, 
    getUsers, 
    getUser, 
    deleteUser, 
    updateUser, 
    getUserByEmail
}; 