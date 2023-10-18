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
      auth,
      listProductsByAdmin /* #swagger.tags = ['Products']*/
    );
    productsRoutes.get(
      "/products/admin/:offset/:limit",
      auth,
      listProducts /* #swagger.tags = ['Products']*/
    );
    productsRoutes.get(
      "/products/:productId",
      auth,
      listProductsById /* #swagger.tags = ['Products']*/
    );
    productsRoutes.get(
      "/products/admin/:productId",
      auth,
      listProductsByAdmin /* #swagger.tags = ['Products']*/
    );
    productsRoutes.patch(
      "/products/admin/:productId",
      auth,
      updateProductsByAdminById /* #swagger.tags = ['Products']*/
    );
    return productsRoutes;
  }
}

module.exports = new ProductsRouter();
