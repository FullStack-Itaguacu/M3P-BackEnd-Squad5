"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "users",
      [
        {
          full_name: "John Doe",
          cpf: 888888888888,
          birth_date: "01/01/1999",
          email: "email@email.com",
          phone: 999999999,
          password: "Abc123@#",
          type_user: "administrador",
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          full_name: "James Doe",
          cpf: 888888888880,
          birth_date: "01/01/1999",
          email: "mail@email.com",
          phone: 999999999,
          password: "Abc123@#",
          type_user: "comprador",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
