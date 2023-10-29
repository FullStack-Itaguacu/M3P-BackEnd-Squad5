const { Router } = require("express");
const {
  listBuyers,
  listBuyersById,
  updateBuyerById,
} = require("../controller/buyer.controller");
const { auth } = require("../middleware/auth");

class BuyersRouter {
  routesFromBuyers() {
    const buyersRoutes = Router();

    buyersRoutes.get(
      "/buyers/admin/:offset/:limit",
      auth,
      listBuyers /* #swagger.tags = ['Buyers']*/
    );
    buyersRoutes.get(
      "/buyers/admin/:userId",
      auth,
      listBuyersById /* #swagger.tags = ['Buyers']*/
    );

    buyersRoutes.patch(
      "/buyers/admin/:userId",
      auth,
      updateBuyerById /* #swagger.tags = ['Buyers']*/
    );
    return buyersRoutes;
  }
}

module.exports = new BuyersRouter();
