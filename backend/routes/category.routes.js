const express = require('express');
const {selectCategory, selectSubCategory} = require('../controller/category.controller');

const Router = express.Router();

Router.post("/select", selectCategory)
Router.post("/selectSubCate", selectSubCategory)

module.exports = Router;
