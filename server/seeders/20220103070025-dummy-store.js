'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        uuid: "e1fc20e0-fbdd-46b1-81b5-0f0e09f1f8c8",
        address: "N서울타워",
        image: null,
        latitude: 37.55119489756075,
        longitude: 126.9882212339351
      },
      {
        uuid: "bb81c917-23ec-4e9a-a8e3-bfb84d857e03",
        address: "경복궁",
        image: null,
        latitude: 37.57961509140872,
        longitude: 126.97704325823415
      },
      {
        uuid: "e02ca82f-6ad6-4ba4-a953-b298f34c80fb",
        address: "창덕궁",
        image: null,
        latitude: 37.57942824637229,
        longitude: 126.99105135004126
      }
    ];

    await queryInterface.bulkInsert('store', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('store', null, {});
  }
};
