'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        user_uuid: "4769ff5f-97ac-4e0c-a033-eaffffae7913",
        store_uuid: "e1fc20e0-fbdd-46b1-81b5-0f0e09f1f8c8"
      },
      {
        user_uuid: "4769ff5f-97ac-4e0c-a033-eaffffae7913",
        store_uuid: "bb81c917-23ec-4e9a-a8e3-bfb84d857e03"
      },
      {
        user_uuid: "4769ff5f-97ac-4e0c-a033-eaffffae7913",
        store_uuid: "e02ca82f-6ad6-4ba4-a953-b298f34c80fb"
      },
      {
        user_uuid: "6c7aad57-bab4-4046-aa72-1d43e1f634a2",
        store_uuid: "e1fc20e0-fbdd-46b1-81b5-0f0e09f1f8c8"
      },
      {
        user_uuid: "6c7aad57-bab4-4046-aa72-1d43e1f634a2",
        store_uuid: "bb81c917-23ec-4e9a-a8e3-bfb84d857e03"
      }
    ];

    await queryInterface.bulkInsert('user_store', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_store', null, {});
  }
};
