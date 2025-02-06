const userModel = require("../model/user.model")


const addToCart = async(req,res) => {
    const {size,ItemId} = req.body;
    const userId = req.user;
    try{
        const user = await userModel.findById(userId);
        if(!user){
            return res.status(404).json({success: false, message: "user not authorized"})
        }
        let existingUser = user.cartData;

        if(existingUser[ItemId]){
            if(existingUser[ItemId][size]){ 
                existingUser[ItemId][size] += 1; 
            }else{
                existingUser[ItemId][size] = 1;
            }
        }else{
            existingUser[ItemId] = {}
            existingUser[ItemId][size] = 1;
        }
      
        await userModel.findByIdAndUpdate( userId,{cartData: existingUser})
        console.log(user.cartData);
        return res.status(200).json({success: true, message: "Product Added to Cart"})
        
    }catch(error){
        console.error("Error adding to cart:", error); 
        res.status(500).json({success: false, message: error.message})
    }
}

const updateCart = async(req,res) =>{
    const {ItemId,size,quantity} = req.body;
    const userId = req.user;
    try{
        const user = await userModel.findById(userId)
        if(!user){
            res.status(400).json({success: false, message: "User Not Found please Login"})
        }
        const existingCartData = user.cartData
            existingCartData[ItemId][size] = quantity;
            await userModel.findByIdAndUpdate(userId, {cartData: existingCartData });
            res.status(201).json({success: true, message:"cart updated"});
    }catch(error){
        res.status(500).json({success: false, message: error.message})
    }
}

const userCartList = async (req, res) => {
  
    try {
        const userId = req.user;
        console.log("Received userId:", userId);
        
        if (!userId) {
            return res.status(400).json({ success: false, message: "Invalid userId" });
        }

        const userData = await userModel.findById(userId);
        console.log("User Data:", userData);

        if (!userData) {
            return res.status(404).json({ message: "User not found" });
        }

        const userCartData = userData.cartData;
        if (!userCartData) {
            return res.status(404).json({ message: "Cart data not found" });
        }

        return res.status(200).json({ success: true, userCartData });
    } catch (error) {
        console.error("Error fetching user cart:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const deleteSingleCartData = async (req, res) => {
    const { ItemId, size } = req.body;
    const userId = req.user;
  
    try {
      const userData = await userModel.findById(userId);
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      let existingCart = userData.cartData;
  
      if(existingCart[ItemId][size]){
         delete existingCart[ItemId][size]      
    }
      await userModel.findByIdAndUpdate(userId, { cartData: existingCart });
      res.status(202).json({ success: true, message: "Product removed from the cart" });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

module.exports = {addToCart, updateCart, userCartList, deleteSingleCartData};