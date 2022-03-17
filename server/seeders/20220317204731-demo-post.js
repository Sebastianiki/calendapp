'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Posts', [
      {
        name: 'Post 1',
        description: 'This is a description to post 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Post 2',
        description: 'This is a description to post 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Post 3',
        description: 'This is a description to post 3',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {});
  }
};
