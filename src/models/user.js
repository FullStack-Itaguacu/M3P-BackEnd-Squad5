const { Sequelize } = require("sequelize");
const { connection } = require("../database/connection");

const User = connection.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "O nome completo precisa ser informado."
      }
   }
  },
  cpf: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: "O cpf informado já esta cadastrado."
    },
    validate: {
      isInt: {
          msg: 'O cpf precisar ser numérico.'
      },
      notEmpty: {
          msg: "O cpf precisa ser informado."
      }
    }
  },
  birthDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
    validate: {
      isDate: {
          msg: 'A data de aniversário esta inválida.'
      }
  },
},
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      msg: "O e-mail informado já esta cadastrado."
  },
  validate: {
      isEmail: {
          msg: 'O e-mail informado esta inválido'
      },
   }
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "O telefone deve ser informado."
      }
  }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      is: { args: /^(?=.*\d)(?=.*[A-Z])(?=.*[$*&@#])[0-9a-zA-Z$*&@#]{8,}$/,
             msg: "A senha deve ter 8 caracteres, 1 Letra Maiúscula, 1 Número e 1 Símbolo no mínimo: $*&@#"
      }
    }
  },
  createdBy: {
    type: Sequelize.INTEGER,
    references: {
      model: { tableName: "users" },
      key: "id",
    },
    allowNull: true,
  },
  typeUser: {
    type: Sequelize.ENUM(["administrador", "comprador"]),
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  updatedAt: {
    type: Sequelize.DATE,
    allowNull: false,
  }
},{ underscored: true, paranoid: true });

module.exports = { User };
