const { Sequelize } = require("sequelize");
const { connection } = require("../database/connection");

const User = connection.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    fullName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    cpf: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    birthDate: {
      type: Sequelize.DATEONLY,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    createdBy: {
      type: Sequelize.INTEGER,
      references: {
        model: { tableName: "users" },
        key: "id",
      },
      allowNull: true,
    },
    typeUser: {
      type: Sequelize.ENUM(["administrador", "comprador"]),
      allowNull: false,
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

module.exports = { User };
