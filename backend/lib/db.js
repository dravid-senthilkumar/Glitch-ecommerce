const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () =>{
    try{
        await mongoose.connect(`${process.env.MONGODB_URL}/e-commerce`) 
        console.log("MongoDB Connected Successfully")
    }
    catch(error){
        console.log(error.message)
    }
    };

module.exports = connectDB;    