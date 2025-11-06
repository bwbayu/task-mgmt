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

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      // call service to update status
      const task = await taskService.updateStatus(id, status);
      res.status(200).json(task);
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