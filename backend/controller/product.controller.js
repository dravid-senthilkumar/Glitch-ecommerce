const productModel = require("../model/product.model");
const cloudinary = require('cloudinary').v2;

const createProduct = async(req,res) => {
    try{
      const image1 = req.files.image1 && req.files.image1[0];
      const image2 = req.files.image2 && req.files.image2[0];
      const image3 = req.files.image3 && req.files.image3[0];
      const image4 = req.files.image4 && req.files.image4[0];

      const images = [image1,image2,image3,image4].filter((data) => (data !== undefined))

      const imageURL = await Promise.all(
        images.map( async(data) => {
            const result = await cloudinary.uploader.upload(data.path, {resource_type: "image"})
            return result.secure_url
        })
      )

      const product = {
        name: req.body.name,
        description: req.body.description, 
        price: Number(req.body.price),
        image: imageURL,
        category: req.body.category,
        subCategory: req.body.subCategory,
        sizes: JSON.parse(req.body.sizes),
        bestSeller: req.body.bestSeller === "true" ? true : false,
        date: Date.now()
      }

      const productData = new productModel(product)
      await productData.save();

      console.log(productData)

      res.status(200).json({success: true, message: "product added"})
    }catch(error){
        console.log(error.message)
        res.status(500).json({success: false , message: error.message})
    }
};

const removeProduct = async(req,res) => {
    try{
          await productModel.findByIdAndDelete({_id: req.params.id});
          res.status(201).json({success: true, message: "product deleted"})
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
};

const listProduct = async(req,res) => {
    try{
        const products = await productModel.find()
        if(!products){
            res.json({message: "products not available"})
        }
        // console.log(products.map((item) => item))
        res.status(200).json({success: true, products})
    }catch(error){
        res.status(200).json({success: false, message: error.message})
    }
};

const singleProduct = async(req,res) => {  
    try{
        const product = await productModel.findById({_id: req.params.id});
        res.status(200).json({success:true, product})
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
};


module.exports = {createProduct,removeProduct,listProduct,singleProduct}