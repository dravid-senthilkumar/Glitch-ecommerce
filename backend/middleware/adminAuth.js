const jwt = require('jsonwebtoken');

const verifyToken = async(req,res,next) => {
    const Token = req.headers.authorization
    try{
        if(!Token){
            res.status(400).json({success: false, message: "Access Denied"})
        }
        const authDecode = jwt.verify(Token, process.env.SECRET_CODE)
        if(!authDecode === process.env.SECRET_CODE){
           return res.status(400).json({success: false, message: "Token expired"})
        }else{
            next();
        }
    }
    catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}

module.exports = verifyToken;