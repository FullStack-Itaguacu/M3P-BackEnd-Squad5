const {
  loginUser,
  createOneUser,
  loginUserAdmin,
  updateUser,
  createOneUserAdmin,
  listAddress,
} = require("../controller/user.controller");
const { Router } = require("express");
const { auth } = require("../middleware/auth");

class UserRouter {
  routesFromUser() {
    const userRoutes = Router();
    userRoutes.post("/user/login", loginUser);
    userRoutes.patch("/buyers/admin/:userId", auth, updateUser);
    userRoutes.get("/buyers/address", auth, listAddress);
    userRoutes.post("/user/admin/login", loginUserAdmin);
    userRoutes.post("/user/signup", createOneUser);
    userRoutes.post("/user/admin/signup", auth, createOneUserAdmin);
    return userRoutes;
  }
}

module.exports = new UserRouter();
