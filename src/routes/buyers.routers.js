
const { Router } = require('express')
const { listBuyerUsers, listBuyersById, updateBuyerById } = require('../controller/buyer.controller')
const { auth } = require('../middleware/auth')


class BuyersRouter{
    routesFromBuyers () {
        const buyersRoutes  = Router()
        buyersRoutes.get('/buyers/admin/:offset/:limit/:sortOrder', auth, listBuyerUsers)
        buyersRoutes.get('/buyers/admin/:userId', listBuyersById)
        buyersRoutes.patch('/buyers/admin/:userId', updateBuyerById)
        return buyersRoutes
    }
}

module.exports = new BuyersRouter()