import { nanoid } from "nanoid"; 
import { ProjectModel } from "../models/project.model";

const getAllProjects = async () => { 
    const projects = await ProjectModel.readProjects(); 
    return projects; 
}; 
    
const getProjectById = async (id: string) => { 
    const projects = await ProjectModel.readProjects(); 
    const project = projects.find((project) => project.id === id); return project; 
}; 

const createProject = async (userId: string, title: string, description: string, imageUrl: string) => { 
    const newProject = { id: nanoid(), userId, title, description, imageUrl}; 
    const projects = await ProjectModel.readProjects();
    projects.push(newProject); 
    return await ProjectModel.writeProjects(projects); 
}; 
        
const deleteProject = async (id: string) => { 
    const project = await getProjectById(id); 
    if (!project) { throw new Error("Project not found") } 
    const projects = await ProjectModel.readProjects(); 
    const filteredProjects = projects.filter((project) => project.id !== id); 
    return await ProjectModel.writeProjects(filteredProjects); 
};
    
const updateProject = async (id: string, userId: string, title: string, description: string, imageUrl: string) => { 
    const project = await getProjectById(id); 
    if (!project) { throw new Error("Project not found") } 
    const projects = await ProjectModel.readProjects(); 
    const updatedProjects = projects.map((project) => { 
        if (project.id === id) { 
            return { ...project, userId, title, description, imageUrl}
        } 
    return project; 
    }); 
    return await ProjectModel.writeProjects(updatedProjects); 
}; 
   
export const projectService = { 
    getAllProjects,
    getProjectById,
    createProject,
    deleteProject,
    updateProject
    };