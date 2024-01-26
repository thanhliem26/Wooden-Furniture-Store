"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("TypeContract", [
      {
        name: "Cưới",
        description:
          "Dịch vụ chụp ảnh cưới",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Kỷ yếu",
        description:
          "Dịch vụ chụp ảnh kỷ yếu",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cho bé",
        description:
          "Dịch vụ chụp ảnh cho bé",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Thuê đồ",
        description:
          "Dịch vụ chụp khách hàng thuê đồ",
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
    return queryInterface.bulkDelete("TypeContract", null, {});
  },
};
