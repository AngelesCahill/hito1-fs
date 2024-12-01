import { Router } from "express"; 
import { projectController } from "../controllers/project.controller"; 
import { verifyToken } from "../middlewares/jwt.middleware";

const router = Router(); 

// CRUD son todas rutas protegidas
router.use(verifyToken);

// http://localhost:3000/api/v1/projects GET
router.get("/", projectController.getProjects); 
// http://localhost:3000/api/v1/projects/:id GET
router.get("/:id", projectController.getProjectById); 
// http://localhost:3000/api/v1/projects POST
router.post("/", projectController.createProject); 
// http://localhost:3000/api/v1/projects/:id DELETE
router.delete("/:id", projectController.deleteProjectById); 
// http://localhost:3000/api/v1/projects/:id PUT
router.put("/:id", projectController.updateProject); 

export default router; 