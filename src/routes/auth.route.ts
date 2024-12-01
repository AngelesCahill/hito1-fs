//Ruta encargada del login, logout y register
import {Router} from 'express';
import { authController } from '../controllers/auth.controller';

const router = Router();

//http://localhost:3000/api/v1/auth/login
router.post("/login", authController.login);
//http://localhost:3000/api/v1/auth/register
router.post("/register", authController.register);

export default router;