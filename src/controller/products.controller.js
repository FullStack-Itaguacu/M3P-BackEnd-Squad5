//const { checkBody } = require('../services/checkBody')
const { Product } = require("../models/product");
const { Op } = require("sequelize");
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
        unitDosage,
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
        unitDosage,
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
      if (!error.errors) {
        return response.status(500).send({
          error: error.message,
        });
      }
      const statusCode = error.errors[0].message.status || 400;
      const message = error.errors[0].message.msg || error.message;
      return response.status(statusCode).send({
        error: message,
      });
    }
  }

  //Servirá para criar usuário vendedor(admin) ou usuário comprador(user)
  async listProductsByAdmin(request, response) {
    try {
      // Verifica se o usuário é ADMIN
      const isAdmin = request.payload.administrador === "S";
      if (!isAdmin) {
        return response.status(403).send({ msg: "Sem autorização de acesso" });
      }
      let { offset, limit } = request.params;
      if (limit > 20) limit = 20;
      const { name, typeProduct, totalStock } = request.query;
      const userId = request.payload.id;

      let options = {
        limit: parseInt(limit) || 20,
        offset: parseInt(offset) || 0,
        where: { userId },
      };

      if (name) {
        options.where.name = { [Op.like]: `%${name}%` };
      }

      if (typeProduct) {
        options.where.typeProduct = typeProduct;
      }

      if (totalStock) {
        options.order = [["totalStock", totalStock === "asc" ? "ASC" : "DESC"]];
      }

      const products = await Product.findAll(options);

      if (products.length > 0) {
        return response.status(200).json(products);
      } else {
        return response.status(204).send();
      }
    } catch (error) {
      console.error("Erro no endpoint /products/admin:", error);
      if (error.name === "AuthenticationError") {
        return response.status(401).send({
          error: "A autenticação é necessária para acessar este endpoint.",
        });
      }
      if (error.name === "AuthorizationError") {
        return response.status(403).send({
          error:
            "Acesso proibido. Somente usuários ADMIN podem acessar este endpoint.",
        });
      }
      return response.status(500).send({
        error: "Erro interno do servidor.",
      });
    }
  }

  // Atualizar usuário - comprador para usuário - admin
  async listProductsById(request, response) {
    try {
      const productId = request.params.productId;
      const product = await Product.findByPk(productId);

      if (!product) {
        return response.status(404).send({
          error: "Produto não encontrado.",
        });
      }

      //200 caso o produto existir.
      return response.status(200).send(product);
    } catch (error) {
      return response.status(500).send({
        error: error.message,
      });
    }
  }

  async listProducts(request, response) {
    try {
      let { offset, limit } = request.params;
      if (limit > 20) limit = 20;
      const { name, typeProduct, totalStock } = request.query;

      let options = {
        limit: parseInt(limit) || 20,
        offset: parseInt(offset) || 0,
        where: {},
      };

      if (name) {
        options.where.name = { [Op.like]: `%${name}%` };
      }

      if (typeProduct) {
        options.where.typeProduct = typeProduct;
      }

      if (totalStock) {
        options.order = [["totalStock", totalStock === "asc" ? "ASC" : "DESC"]];
      }

      const products = await Product.findAll(options);

      // Verificar se há resultados
      if (products.length > 0) {
        return response.status(200).json({
          data: products,
          totalCount: products.length,
        });
      } else {
        return response.status(204).send("Não há conteudo a ser listado.");
      }
    } catch (error) {
      console.error("Erro no endpoint /products/:offset/:limit:", error);
      if (error.name === "AuthenticationError") {
        return response.status(401).send({
          error: "A autenticação é necessária para acessar este endpoint.",
        });
      }
      return response.status(500).send({
        error: "Erro interno do servidor.",
        msg: error,
      });
    }
  }

  async updateProductsByAdminById(request, response) {
    try {
      //Verificar se o usuário é um ADMIN através do payload do token JWT
      if (request.payload.administrador !== "S") {
        return response.status(403).send({
          error: "Acesso não autorizado!",
        });
      }

      const productId = request.params.productId;
      //Verifica se o produto existe
      const product = await Product.findByPk(productId);

      if (!product) {
        return response.status(404).send({
          msg: "Produto não encontrado.",
        });
      }

      //Campos a serem atualizados do corpo da requisição.
      const { name, imageLink, dosage, totalStock } = request.body;

      //Atualizar os campos no produto
      if (name !== undefined) {
        product.name = name;
      }
      if (imageLink !== undefined) {
        product.imageLink = imageLink;
      }
      if (dosage !== undefined) {
        product.dosage = dosage;
      }
      if (totalStock !== undefined) {
        product.totalStock = totalStock;
      }

      await product.save();

      return response.status(204).send();
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }
}

module.exports = new ProductsController();
