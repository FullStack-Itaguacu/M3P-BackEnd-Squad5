//const { checkBody } = require('../services/checkBody')
const { Product } = require("../models/product");
class ProductsController {
  async createProduct(request, response) {
    try {
      console.log(request.payload);
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
      const productId = request.params.productId;
      const product = await ProductModel.findById(productId)

      if(!product){
        return response.status(404).send({
          error: "Produto não encontrado.",
          cause: error.message
        })
      }

      //200 caso o produto existir.
      return response.status(200).send(product);
    } catch (error) {
      console.error("Erro no endpoint /products/:productId:", error);

      //Erro de autenticação
      if(error.name === "AuthenticationError"){
        return response.status(401).send({
          error: "A autenticação é necessária para acessar este endpoint."
        });
      }
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
      //Verificar se o usuário é um ADMIN através do payload do token JWT
      const token = request.header('Authorization');

      if(!token){
        return response.status(401).send({
          error:"Acesso não autorizado. Token JWT não fornecido.",
          cause: error.message
        });
      }

      const decodedToken = jwt.verify(token, JWT_SECRET_KEY)

      if (decodedToken.payload.administrador !== 'S') {
          return response.status(403).send({
          error: "Acesso não autorizado!"
        });
      }

      const productId = request.params.productId;
      //Verifica se o produto existe
      const product = await Product.findByPk(productId);

      if(!product){
        return response.status(404).send({
          error: "Produto não encontrado.",
          cause: error.message
        });
      }

      //Campos a serem atualizados do corpo da requisição.
      const {
        name,
        imageLink,
        dosage,
        totalStock,
      } = request.body

      //Atualizar os campos no produto
      if (name !== undefined){
        product.name = name;
      }
      if (imageLink !== undefined){
        product.imageLink = imageLink;
      }
      if (dosage !== undefined){
        product.dosage = dosage;
      }
      if (totalStock !== undefined){
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
