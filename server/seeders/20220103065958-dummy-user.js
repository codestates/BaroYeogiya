'use strict';

const { v4 } = require('uuid');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        uuid: "4769ff5f-97ac-4e0c-a033-eaffffae7913",
        user_id: "test01",
        pw: "password01",
        name: "테스트01",
        created_at: new Date("2022-01-01")
      },
      {
        uuid: "6c7aad57-bab4-4046-aa72-1d43e1f634a2",
        user_id: "test02",
        pw: "password02",
        name: "테스트02",
        created_at: new Date("2022-01-03")
      }
    ];

    await queryInterface.bulkInsert('user', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user', null, {});
  }
};
