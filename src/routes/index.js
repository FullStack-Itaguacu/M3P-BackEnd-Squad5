//Neste arquivo enpacotamos todas as rotas em uma variável que será disponibilizada pelo server.js
// Instaciando a variável routes com a função express.Router()
const { Router } = require('express')

const routes = new Router()
const { routesFromUser } = require('./users.routers')
const { routesFromBuyers } = require('./buyers.routers')
const { routesFromProducts } = require('./products.routers')
const { routesFromSales } = require('./sales.routers')

routes.use('/api', [routesFromUser(), routesFromBuyers(), routesFromProducts(), routesFromSales()])


// Exportação do objeto routes para uso no server.js
module.exports = routes