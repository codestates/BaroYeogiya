'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [
      {
        uuid: "7db42d8c-a2c4-4642-98b9-f7c05cc85627",
        user_uuid: "4769ff5f-97ac-4e0c-a033-eaffffae7913",
        store_uuid: "e1fc20e0-fbdd-46b1-81b5-0f0e09f1f8c8",
        content: "사장님이 너무 친절해요!",
        image: null,
        created_at: new Date("2021-01-02")
      },
      {
        uuid: "41a9f160-c585-43ce-9914-68454c61e74d",
        user_uuid: "6c7aad57-bab4-4046-aa72-1d43e1f634a2",
        store_uuid: "e1fc20e0-fbdd-46b1-81b5-0f0e09f1f8c8",
        content: "음식이 너무 짜요....",
        image: null,
        created_at: new Date("2021-01-02")
      },
      {
        uuid: "29f56a2a-0f77-40f4-a80d-66b7a044009c",
        user_uuid: "6c7aad57-bab4-4046-aa72-1d43e1f634a2",
        store_uuid: "bb81c917-23ec-4e9a-a8e3-bfb84d857e03",
        content: "잘 먹고 갑니다.",
        image: null,
        created_at: new Date("2021-01-05")
      },
      {
        uuid: "c33e7a90-bd83-4b94-9b85-f47f98a2423a",
        user_uuid: "6c7aad57-bab4-4046-aa72-1d43e1f634a2",
        store_uuid: "e02ca82f-6ad6-4ba4-a953-b298f34c80fb",
        content: "분위기가 너무 좋아요.",
        image: null,
        created_at: new Date("2021-01-06")
      }
    ];

    await queryInterface.bulkInsert('review', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('review', null, {});
  }
};
