'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Contracts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      numberContact: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      package_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      date_get_Image: {
        type: Sequelize.DATE
      },
      start_date: {
        type: Sequelize.DATE
      },
      end_date: {
        type: Sequelize.DATE,
      },
      date_deadLine: {
        type: Sequelize.DATE
      },
      date_delivery: {
        type: Sequelize.DATE
      },
      paid: {
        type: Sequelize.INTEGER
      },
      arise: {
        type: Sequelize.INTEGER
      },
      link_images: {
        type: Sequelize.TEXT
      },
      note_staff: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Contracts');
  }
};

