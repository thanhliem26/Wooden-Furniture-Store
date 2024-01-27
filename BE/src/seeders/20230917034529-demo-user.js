'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      fullName: 'Admin',
      password: '$2b$10$htE9KQ9tpKNJyzps6bdhNutSEFZemiKWBuT2JrYUp0IjKWqGusJTO', /*12345678 */
      email: 'admin@gmail.com',
      phoneNumber: null,
      address: null,
      dateOfBirth: new Date(),
      sex: 1,
      role_user: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
