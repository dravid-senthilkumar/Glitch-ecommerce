const express = require("express");
const {registerUser,login, admin} = require("../controller/user.controller");

const userRouter = express.Router();

userRouter.post("/register", registerUser)
userRouter.post("/login", login)
userRouter.post("/admin",  admin)

module.exports = userRouter;