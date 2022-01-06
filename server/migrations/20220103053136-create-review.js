'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('review', {
      uuid: {
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
        type: Sequelize.UUID
      },
      user_uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'user',
          key: 'uuid',
        }
      },
      store_uuid: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: 'store',
          key: 'uuid',
        }
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      image: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('review');
  }
};