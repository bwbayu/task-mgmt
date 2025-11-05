import { Task } from '../../db/models/task.model.js';

class TaskRepository {
  async findAll() {
    // get all data from Task table
    return await Task.findAll();
  }

  async create(data) {
    // insert new data to Task table
    return await Task.create(data);
  }

  async update(id, data) {
    // update data based on id
    const task = await Task.findByPk(id);
    if (!task) return null;
    return await task.update(data);
  }

  async delete(id) {
    // delete data based on id
    const task = await Task.findByPk(id);
    if (!task) return null;
    await task.destroy();
    return task;
  }
}

export default new TaskRepository();
