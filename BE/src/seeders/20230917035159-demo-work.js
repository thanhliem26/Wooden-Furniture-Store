"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Works", [
      {
        name: "Thợ chụp ảnh",
        description:
          "Người chịu trách nhiệm về việc chụp ảnh, cũng như xuất ảnh cho khách",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nhân viên Sale",
        description:
          "Người chịu trách nhiệm về lấy dự án về cho cty",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nhân viên makeup",
        description:
          "Người chịu trách nhiệm về việc trang điểm, cũng như trang phục cho khách",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Works", null, {});
  },
};
