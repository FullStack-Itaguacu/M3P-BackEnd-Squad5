const { Sequelize } = require("sequelize");
const { connection } = require("../database/connection");

const Address = connection.define(
  "address",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    cep: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O campo de 'CEP' é obrigatório!",
        },
      },
    },
    street: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O campo 'Rua' é obrigatório!",
        },
      },
      get() {
        return this.getDataValue("street");
      },
      set(value) {
        if (value) {
          this.setDataValue("street", value.toUpperCase());
        }
      },
    },
    numberStreet: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O campo 'Número da Rua' é obrigatório!",
        },
      },
    },
    neighborhood: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O campo 'Bairro' é obrigatório!",
        },
      },
      get() {
        return this.getDataValue("neighborhood");
      },
      set(value) {
        if (value) {
          this.setDataValue("neighborhood", value.toUpperCase());
        }
      },
    },
    city: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O campo 'Cidade' é obrigatório!",
        },
      },
      get() {
        return this.getDataValue("city");
      },
      set(value) {
        if (value) {
          this.setDataValue("city", value.toUpperCase());
        }
      },
    },
    state: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "O campo 'Estado' é obrigatório!",
        },
      },
      get() {
        return this.getDataValue("state");
      },
      set(value) {
        if (value) {
          this.setDataValue("state", value.toUpperCase());
        }
      },
    },
    complement: {
      type: Sequelize.STRING,
      allowNull: true,
      get() {
        return this.getDataValue("complement");
      },
      set(value) {
        if (value) {
          this.setDataValue("complement", value.toUpperCase());
        }
      },
    },
    lat: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        min: {
          args: -90,
          msg: " O valor mínimo para latitude é -90",
        },
        max: {
          args: 90,
          msg: "O valor máximo para latitude é 90",
        },
      },
    },
    lon: {
      type: Sequelize.STRING,
      allowNull: true,
      validate: {
        min: {
          args: -180,
          msg: " O valor mínimo para longitude é -180",
        },
        max: {
          args: 180,
          msg: "O valor máximo para longitude é 190",
        },
      },
    },
    createdAt: Sequelize.DATE,
    updateAt: Sequelize.DATE,
  },
  { underscored: true, paranoid: true }
);

module.exports = { Address };
