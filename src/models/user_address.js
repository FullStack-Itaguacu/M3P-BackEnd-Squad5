const { Sequelize } = require("sequelize");
const { connection } = require("../database/connection");

const User_address = connection.define(
  "user_address",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: { tableName: "users" },
            key: "id",
        },
            allowNull: false,
        validate: {
            isInt: {
                    msg: 'O ID do usuário precisar ser numérico.' },
            notEmpty: {
                    msg: "O ID do usuário precisa ser informado." }
            }
    },
    address_id: {
        type: Sequelize.INTEGER,
        references: {
            model: { tableName: "addresses" },
            key: "id",
        },
        allowNull: false,
        validate: {
            isInt: {
                    msg: 'O ID do endereço precisar ser numérico.' },
            notEmpty: {
                    msg: "O ID do endereço precisa ser informado." }
            }
    },
    createdAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
      allowNull: false,
    },
  },
  { underscored: false, paranoid: true }
);

module.exports = { User_address };
