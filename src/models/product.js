const { connection } = require("../database/connection");
const { Sequelize } = require("sequelize");
const { User } = require("./user");

const Product = connection.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: {
      msg: "O nome do produto deve ser informado."
   },
  },

  labName: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: {
      msg: "O nome do laboratório deve ser informado."

   }
  },

  imageLink: {
    type: Sequelize.STRING,
    allowNull: false,
    notEmpty: {
      msg: "A imagem do produto deve ser informada."

   }
  },

  dosage: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "A dosagem do produto precisa ser informada."
      },
      isInt: {
          msg: "A dosagem do produto precisa ser numérica."
      }
  }
  },

  unitDosage: {
    type: Sequelize.ENUM('mg', 'mcg', 'g', 'ml', '%', 'Outro'),
    allowNull: false,
  },

  description: {
    type: Sequelize.STRING,
    allowNull: true,
  },

  unitPrice: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "O valor do produto precisa ser informado."
      },
      isDecimal: {
          msg: "O valor do produto esta inválido."
      }
  }
  },
  typeProduct: {
    type: Sequelize.ENUM(["controlado", "não controlado"]),
    allowNull: false,
  },

  totalStock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: {
          msg: "A quantidade do produto precisa ser informada."
      },
      isInt: {
          msg: "A quantidade do produto precisa ser numérica."
      }
  }
},
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: { tableName: "users" },
      key: "id",
    },
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
  deletedAt: {
    type: Sequelize.DATE,
    allowNull: true,
},
},{ underscored: false, paranoid: true });

module.exports = { Product };
