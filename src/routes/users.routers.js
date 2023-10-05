const { loginUser, createOneUser } = require('../controller/user.controller')
const { Router } = require('express')
const { auth } = require('../middleware/auth')

class UserRouter{
    routesFromUser () {
        const userRoutes  = Router()
        userRoutes.post('/user/login', loginUser)
        userRoutes.post('/user/signup', createOneUser)
        userRoutes.post('/user/admin/signup', createOneUser)
        // para as rotas privadas deve ser usada a autenticação
        // deve ser considerado que apenas usuário adiministradores poderão usar a rota 
        // '/user/admin/signup'
        return userRoutes
    }
}

module.exports = new UserRouter()