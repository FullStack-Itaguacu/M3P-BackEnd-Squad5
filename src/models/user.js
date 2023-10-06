const { connection } = require("../database/connection");
const { STRING, DATE, INTEGER, ENUM } = require("sequelize");
const { Address } = require("./address");

const User = connection.define("user", {
  full_name: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo nome é obrigatório!",
      },
    },
  },
  cpf: {
    type: STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo nome do laboratório é obrigatório!",
      },
      len: {
        args: [11, 11],
        msg: "CPF deve ter exatamente 11 caracteres.",
      },
    },
    unique: {
      msg: "CPF já cadastrado",
    },
  },
  birth_date: {
    type: DATE,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo data de nascimento é obrigatório!",
      },
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
      notNull: {
        msg: "O campo e-mail é obrigatório!",
      },
      isEmail: { msg: "Endereço de e-mail inválido" },
    },
    allowNull: false,
    unique: { msg: "E-mail já cadastrado" },
  },
  phone: {
    type: STRING,
    allowNull: true,
    validate: {
      notNull: {
        msg: "O campo telefone é obrigatório",
      },
    },
  },
  password: {
    type: STRING,
    validate: {
      notNull: {
        msg: "O campo senha é obrigatório",
      },
      is: {
        args: /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[@$!%*#?~(&)+=^_-]).{8,}/,
        msg: "Senha deve conter no mínimo 8 caracteres, com uma letra maiúscula, uma letra minúscula e um digíto",
      },
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
    validate: {
      notNull: {
        msg: "O campo tipo de usuário é obrigatório",
      },
      isIn: {
        args: ["administrador", "comprador"],
        msg: "O campo somente recebe 'administrador' e 'comprador'",
      },
    },
  },
});

User.belongsToMany(Address, { through: "users_addresses" });
Address.belongsToMany(User, { through: "users_addresses" });

module.exports = { User };
