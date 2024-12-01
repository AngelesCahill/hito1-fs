import { Request, Response } from "express";
import { projectService } from "../services/project.service";

const getProjects = async (req: Request, res: Response) => { 
    try { 
        const projects = await projectService.getAllProjects(); 
        res.json(projects); 
    } 
    catch (error) { 
        console.log(error);
        res.status(500).json({ message: "Internal server error" }) 
    } 
};

const getProjectById = async (req: Request, res: Response)=>{
    try {
        const {id}= req.params;
        const project = await projectService.getProjectById(id);
        if (!project){
            res.status(404).json({message: "Project not found"});
        } else {
            res.json(project);
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" }) 
    }
};

const createProject = async (req: Request, res: Response)=>{
    const {userId, title, description, imageUrl} = req.body;
    try {
        await projectService.createProject(userId, title, description, imageUrl); 
        res.status(201).json({ message: "Project created" }); 
    } catch (error) {
        console.log(error); 
        if (error instanceof Error) { 
            res.status(500).json({ message: error.message }); 
        } else { 
            res.status(500).json({ message: "Internal server error" }); 
        }
    }
};

const deleteProjectById = async (req: Request, res: Response)=>{
    const {id} = req.params;
    try {
        await projectService.deleteProject(id); 
        res.status(204).json({message: "Proyecto eliminado"}); 
    } catch (error) {
        console.log(error); 
        if (error instanceof Error) { 
            res.status(500).json({ message: error.message }); 
        } else { 
            res.status(500).json({ message: "Internal server error" }); 
        }
    }
};

const updateProject = async (req: Request, res: Response) => { 
    const { id } = req.params; 
    const { userId, title, description, imageUrl } = req.body; 
    try { 
        await projectService.updateProject(id, userId, title, description, imageUrl); 
        res.json({ message: "Project updated" }); 
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

export const projectController = { 
    createProject, 
    getProjects, 
    getProjectById, 
    deleteProjectById, 
    updateProject, 
}; 