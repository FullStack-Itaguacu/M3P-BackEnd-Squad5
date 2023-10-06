const { connection } = require("../database/connection");
const { INTEGER, ENUM, DECIMAL } = require("sequelize");
const { User } = require("./user");
const { Product } = require("./product");

const Sale = connection.define("sale", {
  buyerId: {
    type: INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo buyer_id é obrigatório",
      },
    },
  },
  sellerId: {
    type: INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo buyer_id é obrigatório",
      },
      isSeller(value) {
        User.findAll({
          where: { id: value, typeUser: administrador },
          attributes: ["id"],
        }).then((seller) => {
          if (seller.length == 0) {
            throw new Error("O usuário não é vendedor/administrador");
          }
        });
      },
    },
  },
  productId: {
    type: INTEGER,
    references: {
      model: Product,
      key: "id",
    },
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo product_id é obrigatório",
      },
    },
  },
  amountBuy: {
    type: INTEGER,
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo quantidade de produto comprado é obrigatório",
      },
    },
  },
  userAdressesId: {
    type: INTEGER,
    allowNull: false,
    references: {
      model: "users_adresses",
      key: "id",
    },
    validate: {
      notNull: {
        msg: "O campo ID do endereço é obrigatório",
      },
    },
  },
  total: {
    type: DECIMAL(10, 2),
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo preço total é obrigatório",
      },
    },
  },
  typePayment: {
    type: ENUM("credito", "debito", "pix", "boleto", "transferencia"),
    allowNull: false,
    validate: {
      notNull: {
        msg: "O campo tipo de medicamento é obrigatório",
      },
      isIn: {
        args: [["credito", "debito", "pix", "boleto", "transferencia"]],
        msg: "O campo somente recebe 'credito', 'debito', 'pix', 'boleto', 'transferencia'",
      },
    },
  },
});

Sale.belongsTo(User);
User.hasMany(Sale);

Sale.belongsTo(Product);
Product.hasMany(Sale);
