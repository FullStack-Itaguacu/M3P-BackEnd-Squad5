//const { checkBody } = require('../services/checkBody')

const { Sale } = require("../models/sale");
const { connection } = require("../database/connection");
const { Product } = require("../models/product");
const { User } = require("../models/user");

class SalesController {
  async createSales(request, response) {
    const transaction = await connection.transaction();
    const buyerId = request.payload.id;
    try {
      const data = request.body;
      for (const sale of data) {
        const { productId, amountBuy, usersAddressesId, typePayment } = sale;

        if (!productId || !amountBuy || !usersAddressesId || !typePayment) {
          return response
            .status(422)
            .send({ message: "Preencha todos os campos!" });
        }
        const product = await Product.findByPk(productId);
        if (!product)
          return response.status(404).send("Produto não encontrado");
        if (amountBuy > product.totalStock) {
          return response.status(409).send({
            message:
              "Quantidade de produtos inferior a quantidade de produtos da compra!",
          });
        }
        const total = amountBuy * product.unitPrice;
        product.totalStock = product.totalStock - amountBuy;
        await product.save();
        const sellerId = product.userId;
        const saleData = await Sale.create(
          {
            buyerId,
            sellerId,
            productId,
            amountBuy,
            usersAddressesId,
            typePayment,
            total,
          },
          { transaction }
        );
      }
      await transaction.commit();
      response.status(201).send({ message: "Registros criados com sucesso!" });
    } catch (error) {
      await transaction.rollback();
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  //Servirá  para listar compras de usuário ou vendas de administrador
  //E servirá para calcular os dados do dashboard
  async listSalesById(request, response) {
    try {
      const { buyer_id } = request.query;

      let lista = {};

      if (buyer_id) {
        lista = buyer_id;
      }

      const data = Sale.findAll({
        where: lista,
      });

      response.status(200).send(data);
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  async listSalesAdmin(request, response) {
    try {
      const { seller_id } = request.query;

      let lista = {};

      if (seller_id) {
        lista = seller_id;
      }

      if (typeUser === "comprador") {
        response.status(403).send({
          message:
            "O usuário é comprador, para ativar essa função o usuário deve ser aministrador!",
        });
      }

      const data = Sale.findAll({
        where: lista,
      });

      response.status(200).send(data);
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }
}

module.exports = new SalesController();
