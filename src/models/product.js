const { connection } = require("../database/connection");
const { STRING, INTEGER, ENUM, DECIMAL } = require("sequelize");
const { User } = require("./user");

const Product = connection.define("product", {
  name: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo nome do produto é obrigatório!",
      },
    },
  },
  labName: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo nome do laboratório é obrigatório!",
      },
    },
  },
  imageLink: {
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
  unitPrice: {
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
  typeProduct: {
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
  totalEstoque: {
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
  userId: {
    type: INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: true,
    notNull: {
      msg: "O campo user_id é obrigatório",
    },
  },
});

Product.belongsTo(User);
User.hasMany(Product);

module.exports = { Product };
