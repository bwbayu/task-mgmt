import { DataTypes, Model, sql } from '@sequelize/core';
import sequelize from '../../config/database.js';

export class Task extends Model {}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: sql.uuidV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Title cannot be empty',
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
    },
    status: {
      type: DataTypes.ENUM('To Do', 'In Progress', 'Done'),
      allowNull: false,
      defaultValue: 'To Do',
      validate: {
        isIn: {
          args: [['To Do', 'In Progress', 'Done']],
          msg: "Status must be one of: 'To Do', 'In Progress', or 'Done'",
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Task',
    tableName: 'Tasks',
    timestamps: true,
  }
);

export default Task;
