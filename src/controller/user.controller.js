const { User } = require('../models/user');
const { Address } = require('../models/address');
const { User_Address } = require('../models/user_address');
const { connection } = require("../database/connection");
const { sign } = require('jsonwebtoken');
const moment = require("moment");
const { config } = require('dotenv');

config();

class UsersController{
    async loginUser(request, response) {
    try {           
        const { email, password } = request.body

    let administrador = 'N';

      if (!email) {
        throw new Error("O email deve ser informado.")
      }

      if (!password) {
        throw new Error("A senha deve ser informada.")
      }

      const usuario = await User.findOne({
        where: {
          email
        }
      })

      if (!usuario) {
        return response.status(404).send({ message: "Email do usuário não cadastrado" })
      }

      if (usuario.password !== password) {
        throw new Error("Não foi possível realizar o login. Senha inválida.")
      }

      if (usuario.typeUser == "administrador") {
          administrador = 'S'
      } else {
          administrador = 'N'
      }

      const payload = {
        id : usuario.id,
        email: email,
        usuario: usuario.fullName,
        administrador: administrador
      }

      const token = sign(payload, process.env.jwt_secret_key, {
        expiresIn: '2d'
      })

      return response.status(200).send({ token })

        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
            }
    }

    async createOneUser(request, response){
        const { user, address } = request.body
        const { fullName, cpf, birthDate, email, phone, password } = user
        const transaction = await connection.transaction();
        

    try {

      if (!fullName) {
        throw new Error("O nome deve ser informado.")
      }

      if (!birthDate) {
        throw new Error("A data de nascimento deve ser informada.")
      }

      const dtValida = moment(birthDate, 'YYYY-MM-DD', true).isValid();
      const dtAtual = moment();

      if (!dtValida || birthDate > dtAtual.format('YYYY-MM-DD')) {
        throw new Error("A data de nascimento esta inválida.")
      }

      if (!cpf || cpf.length != 11) {
        throw new Error("O CPF deve ter exatamente 11 caracteres.")
      }

      if (!email) {
        throw new Error("O email deve ser informado.")
      }

      if (!password) {
        throw new Error("A senha deve ser informada.")
      }

      const typeUser = "comprador";

      for (const addressData of address) {
        const { numberStreet, street, neighborhood, city, state, zip, complement, lat, lon } = addressData;

        if (!numberStreet) {
            throw new Error("O número é obrigatório")
        }

        if (!street) {
            throw new Error("O logradouro/endereço é obrigatório")
        }

        if (!neighborhood) {
            throw new Error("O bairro é obrigatório")
        }

        if (!city) {
            throw new Error("A cidade é obrigatória")
        }

        if (!state) {
            throw new Error("O estado é obrigatório")
        }

        if (!zip) {
            throw new Error("O CEP é obrigatório")
        }
      }

    const newUser = await User.create({
        fullName, cpf, birthDate, email, phone, password, typeUser
     }, {transaction});

    const userId = newUser.id;

    for (const addressData of address) {
        const newaddress = await Address.create(addressData, {transaction});
        
        const addressId = newaddress.id;

        const newUserAddress = await User_Address.create({
            userId,
            addressId,
          }, {transaction});
    }

    await transaction.commit();
  
    return response.status(201).send({ "dados": newUser, "menssage": "Criou um usuário" })
        } catch (error) {
          await transaction.rollback();
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }        
    }

    async createOneUserAdm(request, response){
        const { fullName, cpf, birthDate, email, phone, password, typeUser } = request.body
    try {

      if (!fullName) {
        throw new Error("O nome deve ser informado.")
      }

      if (!birthDate) {
        throw new Error("A data de nascimento deve ser informada.")
      }

      const dtValida = moment(birthDate, 'YYYY-MM-DD', true).isValid();
      const dtAtual = moment();

      if (!dtValida || birthDate > dtAtual.format('YYYY-MM-DD')) {
        throw new Error("A data de nascimento esta inválida.")
      }

      if (!cpf || cpf.length != 11) {
        throw new Error("O CPF deve ter exatamente 11 caracteres.")
      }

      if (!email) {
        throw new Error("O email deve ser informado.")
      }

      if (!password) {
        throw new Error("A senha deve ser informada.")
      }

      const novoUsuario = await User.create({
        fullName, cpf, birthDate, email, phone, password, typeUser
      })

      const userInserido = await User.findOne({
        where: {
          cpf
        }
      })
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }        
    }

    // Atualizar usuário - comprador para usuário - admin  
    async updateUser(request, response) {
        try {
            return response.status(201).send({'msg':'--- ipdateUser ---', 'endpoint': request.url})
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }
    }

    // Para atualização de senha
    async changePassword(request,response){
        try {
            return response.status(201).send({'msg': '--- changePassword ---', 'endpoint': request.url})
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }
    }
}

module.exports = new UsersController()