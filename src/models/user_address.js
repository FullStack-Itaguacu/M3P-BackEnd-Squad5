const { Sequelize } = require("sequelize");
const { connection } = require("../database/connection");

const User_Address = connection.define("users_address",{
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
            allowNull: false,
        validate: {
            isInt: {
                    msg: 'O ID do usuário precisar ser numérico.' },
            notEmpty: {
                    msg: "O ID do usuário precisa ser informado." }
            }
    },
    addressId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'addresses',
            key: 'id',
        },
        allowNull: false,
        validate: {
            isInt: {
                    msg: 'O ID do endereço precisar ser numérico.' },
            notEmpty: {
                    msg: "O ID do endereço precisa ser informado." }
            }
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
},{ underscored: true, paranoid: true })

module.exports = { User_Address }

