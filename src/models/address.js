const { Sequelize } = require("sequelize");
const { connection } = require("../database/connection");

const Address = connection.define("address",{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    zip: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'O CEP precisar ser numérico.'
            },
            notEmpty: {
                msg: "O CEP precisa ser informado."
            }
        }
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O endereço precisa ser informado."
            }
        }
    },
    numberStreet: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isInt: {
                msg: 'O número do endereço precisar ser numérico.'
            },
            notEmpty: {
                msg: "O número do endereço precisa ser informado."
            }
        }
    },
    neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O bairro precisa ser informado."
            }
        }
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "A cidade precisa ser informada."
            }
        }
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "O estado precisa ser informado."
            }
        }
    },
    complement: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    lat: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    lon: {
        type: Sequelize.STRING,
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

module.exports = { Address };