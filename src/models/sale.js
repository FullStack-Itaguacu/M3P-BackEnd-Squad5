const { Sequelize } = require("sequelize");
const { connection } = require("../database/connection");

const Sale = connection.define("sale",{
    buyerId: {
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
    sellerId: {
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
    productId: {
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
    usersAddressesId: {
        type: Sequelize.INTEGER,
        references: {
            model: { tableName: "users_addresses" },
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
    deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
    },
},{ underscored: true, paranoid: true });

module.exports = { Sale };
