import express, { json } from 'express';
import taskRoutes from './src/tasks/task.route.js';
import errorHandler from './src/middlewares/errorHandler.js';
const app = express();

app.use(json());
// routes
app.use('/api/tasks', taskRoutes);
// middleware
app.use(errorHandler);

const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));