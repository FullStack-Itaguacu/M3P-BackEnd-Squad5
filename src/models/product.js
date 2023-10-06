const { connection } = require("../database/connection");
const { Sequelize } = require("sequelize");
const { User } = require("./user");

const Product = connection.define("product", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  labName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  imageLink: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dosage: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  unitPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
  },
  typeProduct: {
    type: Sequelize.ENUM(["controlado", "não controlado"]),
    allowNull: false,
  },
  totalStock: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: Sequelize.INTEGER,
    references: {
      model: { tableName: "users" },
      key: "id",
    },
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
},{ underscored: true, paranoid: true });

module.exports = { Product };
