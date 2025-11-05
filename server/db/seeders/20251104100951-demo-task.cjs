'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up (queryInterface) {
    return queryInterface.bulkInsert('Tasks', [
      {
        id: uuidv4(),
        title: 'task 1',
        description: 'desc task 1',
        status: 'To Do',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'task 2',
        status: 'In Progress',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(),
        title: 'task 3',
        description: 'desc task 3',
        status: 'Done',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down (queryInterface) {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};
