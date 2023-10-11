"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("addresses", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      zip: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      street: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      numberStreet: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      complement: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lat: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      lon: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("addresses");
  },
};
