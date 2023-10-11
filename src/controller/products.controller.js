//const { checkBody } = require('../services/checkBody')
const { Product } = require("../models/product");
class ProductsController {
  async createProduct(request, response) {
    try {
      const isAdmin = request.payload.administrador;
      if (isAdmin == "N") {
        return response.status(403).send({ msg: "Sem autorização de acesso" });
      }
      const {
        name,
        labName,
        imageLink,
        dosage,
        dosageUnit,
        description,
        unitPrice,
        typeProduct,
        totalStock,
      } = request.body;
      const userId = request.payload.id;
      const data = await Product.create({
        name,
        labName,
        imageLink,
        dosage,
        dosageUnit,
        description,
        unitPrice,
        typeProduct,
        totalStock,
        userId,
      });
      return response
        .status(201)
        .send({ msg: "Produto criado com sucesso", body: data });
    } catch (error) {
      const statusCode = error.errors[0].message.status || 400;
      const message = error.errors[0].message.msg || error.message;
      console.log(error.errors[0].message);
      return response.status(statusCode).send({
        msg: message,
      });
    }
  }

  //Servirá para criar usuário vendedor(admin) ou usuário comprador(user)
  async listProductsByAdmin(request, response) {
    try {
      return response.status(201).send({ msg: "--- listProducts ---" });
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  // Atualizar usuário - comprador para usuário - admin
  async listProductsById(request, response) {
    try {
      return response
        .status(201)
        .send({ msg: "--- listProductsById ---", endpoint: request.url });
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  async listProducts(request, response) {
    try {
      return response
        .status(201)
        .send({ msg: "--- listProducts ---", endpoint: request.url });
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  async updateProductsByAdminById(request, response) {
    try {
      return response
        .status(201)
        .send({ msg: "--- updateProductsById ---", endpoint: request.url });
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }
}

module.exports = new ProductsController();
