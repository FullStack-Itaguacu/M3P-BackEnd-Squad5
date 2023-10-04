//Neste arquivo enpacotamos todas as rotas em uma variável que será disponibilizada pelo server.js
// Instaciando a variável routes com a função express.Router()
const { Router } = require('express')

const routes = new Router()
const { routesFromUser } = require('./users.routers')

routes.use('/api', [routesFromUser])

// Exportação do objeto routes para uso no server.js
module.exports = routes