const express = require("express");
const { userOrders, placeOrder } = require("../controller/order.controller");
const verifyUSer = require("../middleware/userAuth");

const Router = express.Router();

Router.post("/userOrders", verifyUSer, userOrders);

Router.post("/cod", verifyUSer, placeOrder)

module.exports = Router; 