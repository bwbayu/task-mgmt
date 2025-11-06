import express, { json } from 'express';
import cors from 'cors';
import taskRoutes from './src/tasks/task.route.js';
import errorHandler from './src/middlewares/errorHandler.js';
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL
}));

app.use(json());
// routes
app.use('/api/tasks', taskRoutes);
// middleware
app.use(errorHandler);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));