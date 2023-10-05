const { connection } = require("../database/connection");
const { STRING, DATE, INTEGER, ENUM } = require("sequelize");

const Usuario = connection.define("usuario", {
  full_name: {
    type: STRING,
    allowNull: false,
  },
  cpf: {
    type: STRING,
    validate: {
      len: {
        args: [11, 11],
        msg: "CPF deve ter exatamente 11 caracteres.",
      },
    },
    unique: {
      msg: "CPF já cadastrado",
    },
    allowNull: false,
  },
  birth_date: {
    type: DATE,
    allowNull: false,
    validate: {
      customValidator(value) {
        if (new Date(value) < new Date()) {
          throw new Error("Data de nascimento inválida");
        }
      },
    },
  },
  email: {
    type: STRING,
    validate: {
      isEmail: { msg: "Endereço de e-mail inválido" },
    },
    allowNull: false,
    unique: { msg: "E-mail já cadastrado" },
  },
  phone: {
    type: STRING,
    allowNull: true,
  },
  password: {
    type: STRING,
    validate: {
      is: {
        args: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@$!%*#?~(&)+=^_-]).{8,}/,
        msg: "Senha deve conter no mínimo 8 caracteres, com uma letra maiúscula, uma letra minúscula e um digíto",
      },
    },
    allowNull: false,
  },
  endereco_id: {
    type: INTEGER,
    references: {
      model: Endereco,
      key: "id",
    },
    allowNull: false,
  },
  criado_por: {
    type: INTEGER,
    allowNull: true,
    references: {
      model: Usuario,
      key: "id",
    },
  },
  type_user: {
    type: ENUM(["administrador", "comprador"]),
    allowNull: false,
    defaultValue: "comprador",
  },
});

module.exports = { Usuario };
