const { Sequelize } = require("sequelize");
const { connection } = require("../database/connection");

const Sale = connection.define(
  "sale",
  {
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
        validate: {
            isInt: {
                msg: 'O ID do comprador precisar ser numérico.'
            },
            notEmpty: {
                msg: "O ID do comprador precisa ser informado."
            }
        }
    },
    seller_id: {
        type: Sequelize.INTEGER,
        references: {
            model: { tableName: "users" },
            key: "id",
        },
        allowNull: false,
        validate: {
            isInt: {
                msg: 'O ID do vendedor precisar ser numérico.'
            },
            notEmpty: {
                msg: "O ID do vendedor precisa ser informado."
            }
        }
    },
    product_id: {
        type: Sequelize.INTEGER,
        references: {
            model: { tableName: "products" },
            key: "id",
        },
        allowNull: false,
        validate: {
            isInt: {
                msg: 'O ID do produto precisar ser numérico.'
            },
            notEmpty: {
                msg: "O ID do produto precisa ser informado."
            }
        }
    },
    amountBuy: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'A quantidade do produto precisar ser numérica.'
            },
            notEmpty: {
                msg: "A quantidade do produto precisa ser informada."
            }
        }
    },
    users_addresses_id: {
        type: Sequelize.INTEGER,
        references: {
            model: { tableName: "usuariosEnderecos" },
            key: "id",
        },
        allowNull: false,
        validate: {
            isInt: {
                msg: 'O ID do endereço precisar ser numérico.'
            },
            notEmpty: {
                msg: "o ID do endereço precisa ser informado."
            }
        }
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
  },
  { underscored: false, paranoid: true }
);

module.exports = { Sale };
