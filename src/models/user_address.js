const { Sequelize } = require("sequelize");
const { connection } = require("../database/connection");

const User_address = connection.define("user_address",{
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: { tableName: "users" },
            key: "id",
        },
            allowNull: false,
    },
    address_id: {
        type: Sequelize.INTEGER,
        references: {
            model: { tableName: "addresses" },
            key: "id",
        },
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
    },
},{ underscored: true, paranoid: true })

module.exports = { User_address }