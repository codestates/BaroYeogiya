'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('store', {
      uuid: {
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      address: {
        allowNull: false,
        type: Sequelize.STRING
      },
      image: {
        type: Sequelize.TEXT
      },
      latitude: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      longitude: {
        allowNull: false,
        type: Sequelize.DOUBLE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('store');
  }
};