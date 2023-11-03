//const { checkBody } = require('../services/checkBody')
const { Product } = require("../models/product");
const { config } = require("dotenv");
config();
const { Op } = require("sequelize");
const { User } = require("../models/user");

class BuyersController {
  async listBuyers(request, response) {
    try {
      if (request.payload.administrador !== "S") {
        return response.status(403).send({
          error: "Acesso não autorizado!",
        });
      }

      let { offset, limit } = request.params;
      if (limit > 20) limit = 20;
      const { fullName, createdAt } = request.query;

      let options = {
        limit: parseInt(limit) || 20,
        offset: parseInt(offset) || 0,
        where: {},
        attributes: {
          exclude: ["password", "deletedAt"],
        },
      };

      if (fullName) {
        options.where.fullName = { [Op.like]: `%${fullName}%` };
      }

      if (createdAt) {
        options.order = [["createdAt", createdAt === "asc" ? "ASC" : "DESC"]];
      }

      const users = await User.findAll(options);

      if (users.length > 0) {
        return response.status(200).json({
          users,
        });
      } else {
        return response.status(204).send("Não há conteudo a ser listado.");
      }
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  async listBuyersById(request, response) {
    try {
      if (request.payload.administrador !== "S") {
        return response.status(403).send({
          error: "Acesso não autorizado!",
        });
      }

      //Obter o userId da rota
      const userId = request.params.userId;
      const user = await User.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ["password", "deletedAt"],
        },
      });

      if (!user) {
        return response.status(404).send({
          msg: "Usuário não encontrado",
        });
      }

      return response.status(200).send(user);
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  // Atualizar usuário - comprador para usuário - admin
  async updateBuyerById(request, response) {
    try {
      const { userId } = request.params;
      const { fullName, email, cpf, phone, typeUser } = request.body;
      const updatedData = Object.assign(
        {},
        fullName && { fullName },
        email && { email },
        cpf && { cpf },
        phone && { phone },
        typeUser && { typeUser }
      );
      const user = await User.findByPk(userId);
      if (!user) {
        return response.status(404).send({
          msg: "Usuário não encontrado.",
        });
      }
      if (user.typeUser == "comprador" && typeUser == "administrador") {
        return response
          .status(422)
          .send(
            "Não é possível alterar usuário de comprador para administrador"
          );
      }
      const data = await User.update(updatedData, { where: { id: userId } });

      if (data[0] == 0) return response.status(422).send("Campo inválido");
      return response.status(204).send(data);
    } catch (error) {
      return response.status(422).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }
  async listBuyerUsers(request, response) {
    const { offset, limit } = request.params;
    const { fullName, createdAt, sortOrder } = request.query;

    try {
      if (request.payload.administrador !== "S") {
        return response.status(403).send({
          msg: "Acesso negado. Somente administradores podem acessar este endpoint.",
        });
      }

      let order = [["createdAt", "ASC"]];

      if (createdAt && ["asc", "desc"].includes(sortOrder)) {
        // Se sortOrder é 'asc' ou 'desc' e createdAt está presente nos query params
        order = [["createdAt", sortOrder.toUpperCase()]]; // Define a ordem de acordo com os query params
      }

      const users = await User.findAndCountAll({
        where: {
          typeUser: "comprador", // Filtra usuários do tipo BUYER
          fullName: {
            [Op.iLike]: `%${fullName || ""}%`, // Filtra por nome (case-insensitive)
          },
        },
        order: order,
        offset: parseInt(offset, 10),
        limit: Math.min(20, parseInt(limit, 10)),
      });

      if (users.count > 0) {
        return response
          .status(200)
          .send({ users: users.rows, totalCount: users.count });
      } else {
        return response
          .status(204)
          .send({ msg: "Não há usuários na base de dados." });
      }
    } catch (error) {
      return response
        .status(500)
        .send({ msg: "Erro interno do servidor", error: error.message });
    }
  }
}

module.exports = new BuyersController();
