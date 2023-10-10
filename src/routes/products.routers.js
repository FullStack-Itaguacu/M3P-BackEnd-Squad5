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
    productsRoutes.post("/products/admin", createProduct);
    productsRoutes.get("/products/admin", listProductsByAdmin);
    productsRoutes.get("/products/:offset/:limit", listProducts);
    productsRoutes.get("/products/:productId", listProductsById);
    productsRoutes.get("/products/admin/:productId", listProductsByAdmin);
    productsRoutes.patch(
      "/products/admin/:productId",
      updateProductsByAdminById
    );
    return productsRoutes;
  }
}

module.exports = new ProductsRouter();
