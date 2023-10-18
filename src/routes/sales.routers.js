const { Router } = require("express");
const {
  createSales,
  listSalesById,
  dashboard,
} = require("../controller/sales.controller");
const { auth } = require("../middleware/auth");

class SalesRouter {
  routesFromSales() {
    const salesRoutes = Router();
    salesRoutes.post("/sales", auth, createSales /* #swagger.tags = ['Sales']*/);
    salesRoutes.get("/sales", auth, listSalesById /* #swagger.tags = ['Sales']*/);
    salesRoutes.get(
      "/sales/admin",
      auth, listSalesById /* #swagger.tags = ['Sales']*/
    );
    salesRoutes.get("/sales/dashboard/admin", auth, dashboard /* #swagger.tags = ['Sales']*/
    );
    return salesRoutes;
  }
}

module.exports = new SalesRouter();
