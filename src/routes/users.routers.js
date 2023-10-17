const { loginUser, createOneUser, loginUserAdmin, createOneUserAdmin } = require('../controller/user.controller')
const { Router } = require('express')
const { auth } = require('../middleware/auth')

class UserRouter{
    routesFromUser () {
        const userRoutes  = Router()
        userRoutes.post('/user/login', loginUser)
        userRoutes.post('/user/admin/login', loginUserAdmin)
        userRoutes.post('/user/signup', auth, createOneUser)
        userRoutes.post('/user/admin/signup', auth, createOneUserAdmin)
        return userRoutes
    }
}

module.exports = new UserRouter();
