//const { sign } = require('jsonwebtoken');
//const dotenv = require('dotenv');
//dotenv.config();
//const { Users  } = require('../models/users')
// As linhas acima devem ser ativadas quando o DB estiver diponível

//const { checkBody } = require('../services/checkBody')

const { User } = require("../models/user")

class UsersController{
    async loginUser(request, response) {
        try {           
            return response.status(200).send({'msg':'--- loginUser ---', 'endpoint': request.url});
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
            }
    }

    //Servirá para criar usuário vendedor(admin) ou usuário comprador(user)
    async createOneUser(request, response){
        try {
            return response.status(201).send({'msg':'--- createOneUser ---', 'endpoint': request.url})
        } catch (error) {
            return response.status(400).send({
                msg: "Erro enviado do banco de dados",
                error: error.message
            })
        }        
    }

    async listAddress(request, response) {
        try {
            const { userId } = request.params

            return response.status(201).send({ 'message': 'Dados atualizados com sucesso!' })
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
            const { userId } = request.params
            const { fullName, email, cpf, phone, typeUser } = request.body

            const user = await User.findByPk(userId)

            if (!user) {
                return response.status(201).send({ message: "Usuário não pode ser encontrado!" })
            }

            if (fullName) {
                user.fullName = fullName
            } if (email) {
                user.email = email
            } if (cpf) {
                user.cpf = cpf
            } if (phone) {
                user.phone = phone
            } if (typeUser) {
                user.typeUser = typeUser
            }

            await User.save()

            return response.status(201).send({ 'message': 'Dados atualizados com sucesso!' })
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