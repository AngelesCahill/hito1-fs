import {readFile, writeFile} from 'node:fs/promises';
import path from 'node:path';
import { Project } from "../interfaces/project.interface"; 

const __dirname = import.meta.dirname;
const pathFile = path.resolve(__dirname + "../../../data/projects.json");

const readProjects = async () => { 
    const projectsJSON = await readFile(pathFile, "utf-8"); 
    return JSON.parse(projectsJSON) as Project[]; 
    }; 
    
    const writeProjects = async (projects: Project[]) => { 
    const projectJSON = JSON.stringify(projects, null, 2); 
    return await writeFile(pathFile, projectJSON); 
    }; 
    
    export const ProjectModel = { 
    readProjects, 
    writeProjects, 
    };