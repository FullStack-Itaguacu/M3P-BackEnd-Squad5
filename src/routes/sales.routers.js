const { Router } = require('express')
const { createSales, listSalesById, listSalesAdmin } = require('../controller/sales.controller')
const { auth } = require('../middleware/auth')

class SalesRouter{
    routesFromSales () {
        const salesRoutes  = Router()
        salesRoutes.post('/sales', auth, createSales);
        salesRoutes.get('/sales', auth, listSalesById);
        salesRoutes.get('/sales/admin', auth, listSalesAdmin);
        salesRoutes.get('/sales/dashboard/admin', listSalesById)
        return salesRoutes
    }
}

module.exports = new SalesRouter()