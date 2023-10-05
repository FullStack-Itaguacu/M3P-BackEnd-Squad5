
const { Router } = require('express')
const { listBuyers, listBuyersById, updateBuyerById } = require('../controller/buyer.controller')
const { auth } = require('../middleware/auth')


class BuyersRouter{
    routesFromBuyers () {
        const buyersRoutes  = Router()
        buyersRoutes.get('/buyers/admin/:offset/:limit', listBuyers)
        buyersRoutes.get('/buyers/admin/:userId', listBuyersById)
        buyersRoutes.patch('/buyers/admin/:userId', updateBuyerById)
        return buyersRoutes
    }
}

module.exports = new BuyersRouter()