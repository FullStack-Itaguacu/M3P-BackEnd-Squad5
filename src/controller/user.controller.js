const { User } = require("../models/user");
const { Address } = require("../models/address");
const { User_Address } = require("../models/user_address");
const { connection } = require("../database/connection");
const { sign } = require("jsonwebtoken");
const moment = require("moment");
const { config } = require("dotenv");

config();

class UsersController {
  async loginUser(request, response) {
    try {
      const { email, password } = request.body;

      let administrador = "N";

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
          .status(401)
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
        usuario: usuario.fullName,
        administrador: administrador,
      };

      const token = sign(payload, process.env.jwt_secret_key, {
        expiresIn: "2d",
      });

      return response.status(200).send({ token });
    } catch (error) {
      return response.status(401).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  async loginUserAdmin(request, response) {
    try {
      const { email, password } = request.body;

      let administrador = "N";

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
          .status(401)
          .send({ message: "Email do usuário não cadastrado" });
      }

      if (usuario.password !== password) {
        throw new Error("Não foi possível realizar o login. Senha inválida.");
      }

      if (usuario.typeUser !== "administrador") {
        throw new Error(
          "Não foi possível realizar o login. Usuário não tem o perfil de administrador."
        );
      } else {
        administrador = "S";
      }

      const payload = {
        id: usuario.id,
        email: email,
        usuario: usuario.fullName,
        administrador: administrador,
      };

      const token = sign(payload, process.env.jwt_secret_key, {
        expiresIn: "2d",
      });

      return response.status(200).send({ token });
    } catch (error) {
      if (
        error.message ===
        "Não foi possível realizar o login. Usuário não tem o perfil de administrador."
      ) {
        return response.status(403).send({
          msg: error.message,
        });
      } else {
        return response.status(401).send({
          msg: "Erro ao fazer o login",
          error: error.message,
        });
      }
    }
  }

  async listAddress(request, response) {
    try {
      const userId = request.payload.id;

      const userAddressData = await User.findAll({
        where: { id: userId },
        include: Address,
      });

      return response.status(200).send(userAddressData[0].addresses);
    } catch (error) {
      console.log(error.message);
      return response
        .status(400)
        .send({ message: "Não foi possível listar os endereços!" });
    }
  }

  // Atualizar usuário - comprador para usuário - admin
  async updateUser(request, response) {
    try {
      const { userId } = request.params;
      const { fullName, email, cpf, phone, typeUser } = request.body;

      const user = await User.findByPk(userId);

      if (!user) {
        return response
          .status(201)
          .send({ message: "Usuário não pode ser encontrado!" });
      }

      if (fullName) {
        user.fullName = fullName;
      }
      if (email) {
        user.email = email;
      }
      if (cpf) {
        user.cpf = cpf;
      }
      if (phone) {
        user.phone = phone;
      }
      if (typeUser) {
        user.typeUser = typeUser;
      }

      await User.save();

      return response
        .status(201)
        .send({ message: "Dados atualizados com sucesso!" });
    } catch (error) {
      return response.status(400).send({
        msg: "Erro enviado do banco de dados",
        error: error.message,
      });
    }
  }

  async createOneUser(request, response) {
    const { user, address } = request.body;
    const { fullName, cpf, birthDate, email, phone, password } = user;
    const transaction = await connection.transaction();
    let status = 400;

    try {
      if (!fullName) {
        status = 422;
        throw new Error("O nome deve ser informado.");
      }

      if (!birthDate) {
        status = 422;
        throw new Error("A data de nascimento deve ser informada.");
      }

      const dtValida = moment(birthDate, "YYYY-MM-DD", true).isValid();
      const dtAtual = moment();

      if (!dtValida || birthDate > dtAtual.format("YYYY-MM-DD")) {
        status = 400;
        throw new Error("A data de nascimento esta inválida.");
      }

      if (!cpf) {
        status = 422;
        throw new Error("O CPF deve ser informado");
      }

      if (cpf.length != 11) {
        status = 400;
        throw new Error("O CPF deve ter exatamente 11 caracteres.");
      }

      if (!email) {
        status = 422;
        throw new Error("O email deve ser informado.");
      }

      if (!password) {
        status = 422;
        throw new Error("A senha deve ser informada.");
      }

      const typeUser = "comprador";

      for (const addressData of address) {
        const {
          numberStreet,
          street,
          neighborhood,
          city,
          state,
          zip,
          complement,
          lat,
          lon,
        } = addressData;

        if (!numberStreet) {
          status = 422;
          throw new Error("O número é obrigatório");
        }

        if (!street) {
          status = 422;
          throw new Error("O logradouro/endereço é obrigatório");
        }

        if (!neighborhood) {
          status = 422;
          throw new Error("O bairro é obrigatório");
        }

        if (!city) {
          status = 422;
          throw new Error("A cidade é obrigatória");
        }

        if (!state) {
          status = 422;
          throw new Error("O estado é obrigatório");
        }

        if (!zip) {
          status = 422;
          throw new Error("O CEP é obrigatório");
        }
      }

      const newUser = await User.create(
        {
          fullName,
          cpf,
          birthDate,
          email,
          phone,
          password,
          typeUser,
        },
        { transaction }
      );

      const userId = newUser.id;

      for (const addressData of address) {
        const newaddress = await Address.create(addressData, { transaction });

        const addressId = newaddress.id;

        const newUserAddress = await User_Address.create(
          {
            userId,
            addressId,
          },
          { transaction }
        );
      }

      await transaction.commit();

      return response
        .status(201)
        .send({ dados: newUser, menssage: "Criou um usuário" });
    } catch (error) {
      await transaction.rollback();

      if (error.name === "SequelizeUniqueConstraintError") {
        const existeCPFErro = error.errors.some((er) => er.path === "cpf");
        const existeEmailErro = error.errors.some((er) => er.path === "email");
        if (existeCPFErro || existeEmailErro) {
          return response
            .status(409)
            .json({ msg: "Erro ao criar usuário", cause: error.message });
        }
      }
      if (error.message.split("\n").length > 1) {
        return response.status(status).json({
          msg: "Erro ao criar usuário",
          causes: error.message.split("\n"),
        });
      }
      console.log(error.message.split("\n"));
      return response
        .status(status)
        .json({ msg: "Erro ao criar usuário", cause: error.message });
    }
  }

  async createOneUserAdmin(request, response) {
    const { user, address } = request.body;
    const { fullName, cpf, birthDate, email, phone, password, typeUser } = user;
    const transaction = await connection.transaction();
    let status = 400;
    const isAdmin = request.payload.administrador;

    try {
      if (isAdmin == "N") {
        return response.status(403).send({ msg: "Sem autorização de acesso." });
      }

      if (!fullName) {
        status = 422;
        throw new Error("O nome deve ser informado.");
      }

      if (!birthDate) {
        status = 422;
        throw new Error("A data de nascimento deve ser informada.");
      }

      const dtValida = moment(birthDate, "YYYY-MM-DD", true).isValid();
      const dtAtual = moment();

      if (!dtValida || birthDate > dtAtual.format("YYYY-MM-DD")) {
        status = 400;
        throw new Error("A data de nascimento esta inválida.");
      }

      if (!cpf) {
        status = 422;
        throw new Error("O CPF deve ser informado");
      }

      if (cpf.length != 11) {
        status = 400;
        throw new Error("O CPF deve ter exatamente 11 caracteres.");
      }

      if (!email) {
        status = 422;
        throw new Error("O email deve ser informado.");
      }

      if (!password) {
        status = 422;
        throw new Error("A senha deve ser informada.");
      }

      if (!typeUser) {
        status = 422;
        throw new Error("O tipo de usuário deve ser informado.");
      }

      for (const addressData of address) {
        const {
          numberStreet,
          street,
          neighborhood,
          city,
          state,
          zip,
          complement,
          lat,
          lon,
        } = addressData;

        if (!numberStreet) {
          status = 422;
          throw new Error("O número é obrigatório");
        }

        if (!street) {
          status = 422;
          throw new Error("O logradouro/endereço é obrigatório");
        }

        if (!neighborhood) {
          status = 422;
          throw new Error("O bairro é obrigatório");
        }

        if (!city) {
          status = 422;
          throw new Error("A cidade é obrigatória");
        }

        if (!state) {
          status = 422;
          throw new Error("O estado é obrigatório");
        }

        if (!zip) {
          status = 422;
          throw new Error("O CEP é obrigatório");
        }
      }

      const newUser = await User.create(
        {
          fullName,
          cpf,
          birthDate,
          email,
          phone,
          password,
          typeUser,
        },
        { transaction }
      );

      const userId = newUser.id;

      for (const addressData of address) {
        const newaddress = await Address.create(addressData, { transaction });

        const addressId = newaddress.id;

        const newUserAddress = await User_Address.create(
          {
            userId,
            addressId,
          },
          { transaction }
        );
      }

      await transaction.commit();

      return response
        .status(201)
        .send({ dados: newUser, menssage: "Criou um usuário" });
    } catch (error) {
      await transaction.rollback();

      if (error.name === "SequelizeUniqueConstraintError") {
        const existeCPFErro = error.errors.some((er) => er.path === "cpf");
        const existeEmailErro = error.errors.some((er) => er.path === "email");
        if (existeCPFErro || existeEmailErro) {
          return response
            .status(409)
            .json({ msg: "Erro ao criar usuário", cause: error.message });
        }
      }
      if (error.message.split("\n").length > 1) {
        return response.status(status).json({
          msg: "Erro ao criar usuário",
          causes: error.message.split("\n"),
        });
      }
      console.log(error.message.split("\n"));
      return response
        .status(status)
        .json({ msg: "Erro ao criar usuário", cause: error.message });
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
