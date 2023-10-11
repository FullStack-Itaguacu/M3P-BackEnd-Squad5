const { sign } = require("jsonwebtoken");
const { config } = require("dotenv");

config();

const { User } = require("../models/user");

let administrador = "N";

class UsersController {
  async loginUser(request, response) {
    try {
      const { email, password } = request.body;

      if (!email) {
        throw new Error("O email deve ser informado.");
      }

      if (!password) {
        throw new Error("A senha deve ser informada.");
      }

      const usuario = await User.findOne({
        where: {
          email,
        },
      });

      if (!usuario) {
        return response
          .status(404)
          .send({ message: "Email do usuário não cadastrado" });
      }

      if (usuario.password !== password) {
        throw new Error("Não foi possível realizar o login. Senha inválida.");
      }

      if (usuario.typeUser == "administrador") {
        administrador = "S";
      } else {
        administrador = "N";
      }

      const payload = {
        id: usuario.id,
        email: email,
        administrador: administrador,
      };

      const token = sign(payload, process.env.jwt_secret_key, {
        expiresIn: "2d",
      });

      return response.status(200).send({ token });
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  //Servirá para criar usuário vendedor(admin) ou usuário comprador(user)
  async createOneUser(request, response) {
    try {
      return response
        .status(201)
        .send({ msg: "--- createOneUser ---", endpoint: request.url });
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  // Atualizar usuário - comprador para usuário - admin
  async updateUser(request, response) {
    try {
      return response
        .status(201)
        .send({ msg: "--- ipdateUser ---", endpoint: request.url });
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  // Para atualização de senha
  async changePassword(request, response) {
    try {
      return response
        .status(201)
        .send({ msg: "--- changePassword ---", endpoint: request.url });
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }
}

module.exports = new UsersController();
