"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Catalog", [
      {
        name: "Ăn uống",
        description:
          "Đồ ăn uống cho nhân viên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Sinh hoạt phí",
        description:
          "Sinh hoạt phí của công ty",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cước xe",
        description:
          "Tiền thuê xe đến nơi chụp",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "In ảnh",
        description:
          "Tiền in ảnh cho khách",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Khác",
        description:
          "Dịch vụ chưa đặt tên",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Catalog", null, {});
  },
};
