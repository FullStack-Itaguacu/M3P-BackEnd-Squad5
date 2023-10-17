const { Router } = require("express");
const {
  createProduct,
  listProductsByAdmin,
  listProducts,
  listProductsById,
  updateProductsByAdminById,
} = require("../controller/products.controller");
const { auth } = require("../middleware/auth");

class ProductsRouter {
  routesFromProducts() {
    const productsRoutes = Router();
    productsRoutes.post(
      "/products/admin",
      auth,
      createProduct /* #swagger.tags = ['Products']*/
    );
    productsRoutes.get(
      "/products/admin",
      listProductsByAdmin /* #swagger.tags = ['Products']*/
    );
    productsRoutes.get(
      "/products/:offset/:limit",
      listProducts /* #swagger.tags = ['Products']*/
    );
    productsRoutes.get(
      "/products/:productId",
      listProductsById /* #swagger.tags = ['Products']*/
    );
    productsRoutes.get(
      "/products/admin/:productId",
      listProductsByAdmin /* #swagger.tags = ['Products']*/
    );
    productsRoutes.patch(
      "/products/admin/:productId",
      updateProductsByAdminById /* #swagger.tags = ['Products']*/
    );
    return productsRoutes;
  }
}

module.exports = new ProductsRouter();
