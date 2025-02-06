const orderModel = require("../model/order.model");
const userModel = require("../model/user.model")

//placed order cod method

const placeOrder = async(req,res) => {
    try{
        const {items, amount, address} = req.body;
        const userId = req.user;

        if(!userId){
            res.status(400).json({success: false, message: "Kindly Login or Registered !"})
        }
        const orderData = {
            userId,
            items,
            amount,
            address,
            paymentMethod:"COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData);
        await newOrder.save();

        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.status(201).json({success: true, message: "Order placed"})
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
};

//user orders data for frontend

const userOrders = async (req, res) => {
    try {
        const userId = req.user;
        
        const orders = await orderModel.find({ userId }); 

        if (!orders.length) {
            return res.status(404).json({ success: false, message: "No orders found" });
        }

        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


module.exports = {placeOrder,userOrders};