import { Router } from "express"; 
import { userController } from "../controllers/user.controller"; 
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router(); 

//localhost:3000/api/v1/users  GET
router.get("/", verifyToken, userController.getUsers);
//localhost:3000/api/v1/users/7NS6y4hsi5xLzdtRGjX5M  GET 
router.get("/:id", userController.getUser); 
//localhost:3000/api/v1/users  POST
router.post("/", userController.createUser); 
//localhost:3000/api/v1/users/:id DELETE
router.delete("/:id", userController.deleteUser); 
//localhost:3000/api/v1/users/7NS6y4hsi5xLzdtRGjX5M  PUT
router.put("/:id", userController.updateUser); 
//localhost:3000/api/v1/users/test3@test.com  GET 
router.get("/email/:email", userController.getUserByEmail); 

export default router; 