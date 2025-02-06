const productModel = require('../model/product.model');

const selectCategory = async(req,res) => {
    try{
        const category = await productModel.aggregate([
            {$match: {
                category: req.body.category
            }}
        ])
        if(!category){
            res.status(404).json({success: false, message: "category not found"})
        }
        res.status(201).json({success: true, category})
    }catch(error){
        res.status(500).json({success: true, message: error.message})
    }
};


const selectSubCategory = async (req, res) => {
    try {
        const subCategoryFilter = await productModel.aggregate([
            {
                $match: { category: req.body.category , subCategory: req.body.subCategory}
            }
        ]);
        res.status(201).json({ success: true, subCategoryFilter });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {selectCategory, selectSubCategory};