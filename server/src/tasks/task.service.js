import taskRepo from './task.repository.js';
import { NotFoundError } from '../exceptions/NotFoundError.js'
import { BadRequestError } from '../exceptions/BadRequestError.js'

class TaskService {
  async getTasks() {
    // get all task data
    const tasks = await taskRepo.findAll();

    // group task by status
    const groupedTask = {
      "To Do": [],
      "In Progress": [],
      "Done": [],
    };

    for (const task of tasks) {
      if (groupedTask[task.status]) {
        groupedTask[task.status].push(task);
      } else {
        // fallback
        groupedTask[task.status] = [task];
      }
    }

    return groupedTask;
  }

  async createTask(data) {
    // title field validation
    if (!data.title || data.title.trim() === "") {
        throw new BadRequestError('Title is required');
    }
    // set default value for status
    const newTask = {
      title: data.title.trim(),
      description: data.description || null,
      status: "To Do",
    };

    // create new task
    return await taskRepo.create(newTask); 
  }

  async updateStatus(id, newStatus) {
    // update status task based on id
    const item = await taskRepo.updateStatus(id, newStatus);

    // error handling: task not found
    if (!item){
        throw new NotFoundError('Task not found');
    } 
    return item;
  }

  async deleteTask(id) {
    // delete task based on id
    const deleted = await taskRepo.delete(id);
    
    // error handling: task not found
    if (!deleted){
        throw new NotFoundError('Task not found');
    } 
  }
}

export default new TaskService();
