'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Dev',
        email: 'dev@example.com',
        password: bcrypt.hashSync( 'Dev123#', bcrypt.genSaltSync() ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User 1',
        email: 'user1@example.com',
        password: bcrypt.hashSync( 'User123#', bcrypt.genSaltSync() ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User 2',
        email: 'user2@example.com',
        password: bcrypt.hashSync( 'User123#', bcrypt.genSaltSync() ),
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
