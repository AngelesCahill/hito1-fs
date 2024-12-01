import express from "express";
import * as dotenv from 'dotenv';
import userRoute from './routes/user.route';
import projectRoute from './routes/project.route';
import authRoute from './routes/auth.route';

dotenv.config();


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoute);
app.use('/api/v1/projects', projectRoute);
app.use('/api/v1/auth', authRoute);

const PORT = process.env.PORT || 4000;

app.listen(PORT, ()=>{
    console.log("Server running on port: " + PORT)
})