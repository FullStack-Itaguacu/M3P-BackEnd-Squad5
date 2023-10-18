const { Router } = require("express");
const {
  createSales,
  listSalesById,
} = require("../controller/sales.controller");
const { auth } = require("../middleware/auth");

class SalesRouter {
  routesFromSales() {
    const salesRoutes = Router();
    salesRoutes.post("/sales", createSales /* #swagger.tags = ['Sales']*/);
    salesRoutes.get("/sales", listSalesById /* #swagger.tags = ['Sales']*/);
    salesRoutes.get(
      "/sales/admin",
      listSalesById /* #swagger.tags = ['Sales']*/
    );
    salesRoutes.get(
      "/sales/dashboard/admin",
      listSalesById /* #swagger.tags = ['Sales']*/
    );
    return salesRoutes;
  }
}

module.exports = new SalesRouter();
