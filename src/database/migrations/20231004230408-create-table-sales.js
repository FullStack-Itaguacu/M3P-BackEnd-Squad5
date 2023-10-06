"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("seles", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      buyer_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "users" },
          key: "id",
        },
        allowNull: false,
      },
      seller_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "users" },
          key: "id",
        },
        allowNull: false,
      },
      product_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "products" },
          key: "id",
        },
        allowNull: false,
      },
      amountBuy: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      users_addresses_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { tableName: "users_addresses" },
          key: "id",
        },
        allowNull: false,
      },
      total: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      typePayment: {
        type: Sequelize.ENUM(
          "credito",
          "debito",
          "pix",
          "boleto",
          "transferencia"
        ),
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
        allowNull: true
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("seles");
  },
};
