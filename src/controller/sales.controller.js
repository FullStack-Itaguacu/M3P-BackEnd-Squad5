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
      console.log(data);
      for (const sale of data) {
        console.log(sale);
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
      const buyerId = request.payload.id;

      const data = await Sale.findAll({
        where: { buyerId: buyerId },
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
      const sellerId = request.payload.id;
      if (request.payload.administrador !== "S") {
        return response.status(403).send({
          error: "Acesso não autorizado!",
        });
      }

      const data = await Sale.findAll({
        where: { sellerId: sellerId },
      });

      response.status(200).send(data);
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  async dashboard(request, response) {
    try {
      if (request.payload.administrador !== "S") {
        return response.status(403).send({
          error: "Acesso não autorizado!",
        });
      }
      const sellerId = request.payload.id;

      const totalSales = await Sale.sum("total", {
        where: { sellerId: sellerId },
      });

      const totalAmount = await Sale.sum("amountBuy", {
        where: { sellerId: sellerId },
      });

      response
        .status(200)
        .send({ totalValue: totalSales, totalAmount: totalAmount });
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }
}

module.exports = new SalesController();
