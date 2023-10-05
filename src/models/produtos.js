const { connection } = require("../database/connection");
const { STRING, INTEGER, ENUM, DECIMAL } = require("sequelize");
const { Usuario } = require("./usuario");

const Produto = connection.define("produto", {
  name: {
    type: STRING,
    allowNull: false,
  },
  lab_name: {
    type: STRING,
    allowNull: false,
  },
  image_link: {
    type: STRING,
    allowNull: false,
  },
  dosage: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
    allowNull: true,
  },
  unit_price: {
    type: DECIMAL(10, 2),
    allowNull: true,
  },
  type_product: {
    type: ENUM(["controlado", "não controlado"]),
    allowNull: false,
  },
  total_estoque: {
    type: INTEGER,
    allowNull: false,
  },
  user_id: {
    type: INTEGER,
    references: {
      model: Usuario,
      key: "id",
    },
    allowNull: true,
  },
});

module.exports = { Produto };
