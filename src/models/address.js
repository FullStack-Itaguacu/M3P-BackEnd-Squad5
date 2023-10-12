const { Sequelize } = require("sequelize");
const { connection } = require("../database/connection");

const Address = connection.define("address",{
    addressId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    zip: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    numberStreet: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    neighborhood: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
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