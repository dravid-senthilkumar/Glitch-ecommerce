const express = require('express');
const { createProduct, removeProduct, listProduct, singleProduct } = require('../controller/product.controller');
const upload = require('../middleware/cloudAuth');
const verifyAdmin = require('../middleware/adminAuth');


const productRouter = express.Router();

productRouter.post("/createProduct",  upload.fields([{name: 'image1', maxCount:1},{name: 'image2', maxCount:1},{name: 'image3', maxCount:1},{name: 'image4', maxCount:1}]), createProduct)
productRouter.delete("/remove/:id",  removeProduct)
productRouter.get("/list", listProduct)
productRouter.get("/singleProduct/:id", singleProduct)

module.exports = productRouter;
