const { connection } = require("../database/connection");
const { Sequelize } = require("sequelize");
const { User } = require("./user");

const Product = connection.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: {
      msg: "O nome do produto deve ser informado."
   },
  },

  labName: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: {
      msg: "O nome do laboratório deve ser informado."

   }
  },

  imageLink: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: {
      msg: "A imagem do produto deve ser informada."

   }
  },

  dosage: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "A dosagem do produto precisa ser informada."
      },
    },
    labName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: {
            msg: "Campo nome do laboratório deve ser preenchido",
            status: "422",
          },
        },
      },
    },
    imageLink: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: { msg: "Link da imagem deve ser preenchido", status: "422" },
        },
      },
    },
    dosage: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: { msg: "Dosagem deve ser preenchido", status: "422" } },
      },
    },
    dosageUnit: {
      type: Sequelize.ENUM("mg", "mcg", "g", "ml", "%", "Outro"),
      allowNull: false,
      isIn: {
        args: [["mg", "mcg", "g", "ml", "%", "Outro"]],
        msg: 'O campo somente recebe "mg", "mcg", "g", "ml", "%", "Outro"',
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
          msg: { msg: "Preço unitário deve ser preenchido", status: "422" },
        },
      },
    },
    typeProduct: {
      type: Sequelize.ENUM([
        "Medicamento controlado",
        "Medicamento não controlado",
      ]),
      isIn: {
        args: [["Medicamento controlado", "Medicamento não controlado"]],
        msg: "O campo somente recebe 'Medicamento controlado' e 'Medicamento não controlado'",
      },
      allowNull: false,
    },
    totalStock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: { msg: "Estoque deve ser preenchido", status: "422" } },
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
  },
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
},
},{ underscored: true, paranoid: true });


module.exports = { Product };
