'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('user_store', {
      user_uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'uuid',
        },
      },
      store_uuid: {
        primaryKey: true,
        type: Sequelize.UUID,
        references: {
          model: 'store',
          key: 'uuid',
        },
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('user_store');
  }
};