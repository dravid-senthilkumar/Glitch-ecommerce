const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    userId :{
        type: String,
        required: true
    },
    items: {
        type: Array,
        required: true
    },
    amount:{
        type: Number,
        required: true
    },
    address:{
        type: Object,
        required: true
    },
    status:{
        type:String,
        required: true,
        default: "Order Placed"
    },
    paymentMethod:{
        type:String,
        required: true,
    },
    payment:{
        type:Number,
        required: true,
        default: false
    },
    date:{
        type: String,
        required: true
    }
});

module.exports = mongoose.model("order", orderSchema);

