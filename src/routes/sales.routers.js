const { Router } = require('express')
const { createSales, listSalesById } = require('../controller/sales.controller')
const { auth } = require('../middleware/auth')

class SalesRouter{
    routesFromSales () {
        const salesRoutes  = Router()
        salesRoutes.post('/sales', createSales);
        salesRoutes.get('/sales', listSalesById);
        salesRoutes.get('/sales/admin',listSalesById);
        salesRoutes.get('/sales/dashboard/admin', listSalesById)
        return salesRoutes
    }
}

module.exports = new SalesRouter()