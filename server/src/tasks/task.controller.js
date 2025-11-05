import taskService from "./task.service.js";

class TaskController {
  async getAll(req, res, next) {
    try {
        // call service to get all task data
      const tasks = await taskService.getTasks();
      res.json(tasks);
    } catch (e) {
        // fallback
      next(e);
    }
  }

  async create(req, res, next) {
    try {
        // call service to create task
      const task = await taskService.createTask(req.body);
      res.status(201).json(task);
    } catch (e) {
        // fallback
      next(e);
    }
  }

  async update(req, res, next) {
    try {
        // call service to update task
      const task = await taskService.updateTask(req.params.id, req.body);
      res.json(task);
    } catch (e) {
        // fallback
      next(e);
    }
  }

  async delete(req, res, next) {
    try {
        // call service to delete task
      await taskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (e) {
        // fallback
      next(e);
    }
  }
}

export default new TaskController();