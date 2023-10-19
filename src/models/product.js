const { connection } = require("../database/connection");
const { Sequelize } = require("sequelize");
const { User } = require("./user");

const Product = connection.define(
  "product",
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: {
            msg: "Campo nome do produto deve ser preenchido",
            status: 422,
          },
        },
      },
    },

    labName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: {
            msg: "Campo nome do laboratório deve ser preenchido",
            status: 422,
          },
        },
      },
    },
    imageLink: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: { msg: "Link da imagem deve ser preenchido", status: 422 },
        },
      },
    },
    dosage: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: { msg: "Dosagem deve ser preenchido", status: 422 },
        },
      },
    },
    unitDosage: {
      type: Sequelize.ENUM("mg", "mcg", "g", "ml", "%", "Outro"),
      allowNull: false,
      validate: {
        notNull: {
          isIn: {
            args: [["mg", "mcg", "g", "ml", "%", "Outro"]],
            msg: {
              msg: 'O campo somente recebe "mg", "mcg", "g", "ml", "%", "Outro"',
              status: 400,
            },
          },
          msg: { msg: "Unidade de dosagem deve ser preenchido", status: 422 },
        },
      },
    },

    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    unitPrice: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        min: {
          args: 0.01,
          msg: "O valor mínimo é 0.01",
        },
        notNull: {
          msg: { msg: "Preço unitário deve ser preenchido", status: 422 },
        },
      },
    },
    typeProduct: {
      type: Sequelize.ENUM(["controlado", "não controlado"]),
      allowNull: false,
      validate: {
        isIn: {
          args: [["controlado", "não controlado"]],
          msg: "O campo somente recebe 'controlado' e 'não controlado'",
        },
      },
    },

    totalStock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: { msg: "Estoque deve ser preenchido", status: 422 },
        },
        min: {
          args: [0],
          msg: "O estoque mínimo é 0",
        },
      },
    },
    userId: {
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
    deletedAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
  },
  { paranoid: true }
);

module.exports = { Product };
