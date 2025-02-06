const express = require('express');
const { addToCart, updateCart, userCartList, deleteSingleCartData } = require('../controller/cart.controller');
const verifyUSer = require('../middleware/userAuth');

const Router = express.Router();

Router.get("/get", verifyUSer, userCartList)  
Router.post("/add", verifyUSer, addToCart)
Router.post("/updateCart", verifyUSer, updateCart)
Router.post("/removeProduct", verifyUSer, deleteSingleCartData)

module.exports = Router;