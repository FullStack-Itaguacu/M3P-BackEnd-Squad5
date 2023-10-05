const { connection } = require("../database/connection");
const { STRING, INTEGER, ENUM, DECIMAL } = require("sequelize");
const { Usuario } = require("./usuario");

const Produto = connection.define("produto", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo nome do produto é obrigatório!",
      },
    },
  },
  lab_name: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo nome do laboratório é obrigatório!",
      },
    },
  },
  image_link: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo de imagem do produto é obrigatório!",
      },
    },
  },
  dosage: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo de dosagem é obrigatório!",
      },
    },
  },
  description: {
    type: STRING,
    allowNull: true,
  },
  unit_price: {
    type: DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: 0.01,
        msg: " O valor mínimo é 0,01",
      },
      notNull: {
        msg: "O campo de preço unitário é obrigatório!",
      },
    },
  },
  type_product: {
    type: ENUM(["controlado", "não controlado"]),
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo tipo de medicamento é obrigatório",
      },
      isIn: {
        args: ["controlado", "não controlado"],
        msg: "O campo somente recebe 'controlado' e 'não controlado'",
      },
    },
  },
  total_estoque: {
    type: INTEGER,
    allowNull: false,
    validate: {
      min: {
        args: 0,
        msg: " O valor mínimo é 0",
      },
      notNull: {
        msg: "O campo estoque total é obrigatório",
      },
    },
  },
  user_id: {
    type: INTEGER,
    references: {
      model: Usuario,
      key: "id",
    },
    allowNull: true,
    notNull: {
      msg: "O campo user_id é obrigatório",
    },
  },
});

module.exports = { Produto };
