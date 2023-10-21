const {
  loginUser,
  createOneUser,
  loginUserAdmin,
  createOneUserAdmin,
  listAddress,
} = require("../controller/user.controller");
const { Router } = require("express");
const { auth } = require("../middleware/auth");

class UserRouter {
  routesFromUser() {
    const userRoutes = Router();
    userRoutes.post("/user/login", 
    loginUser /* #swagger.tags = ['Users']*/
    );
    userRoutes.get("/buyers/address", 
    auth, 
    listAddress /* #swagger.tags = ['Users']*/
    );
    userRoutes.post("/user/admin/login", 
    loginUserAdmin /* #swagger.tags = ['Users']*/
    );
    userRoutes.post("/user/signup",
    createOneUser /* #swagger.tags = ['Users']*/
    );
    userRoutes.post("/user/admin/signup",
    auth, 
    createOneUserAdmin /* #swagger.tags = ['Users']*/
    );
    return userRoutes;
  }
}

module.exports = new UserRouter();
