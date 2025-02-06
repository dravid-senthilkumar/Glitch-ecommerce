import React, { createContext, useEffect, useState} from 'react'
// import { products } from '../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = "$";
    const deliveryFee = 10; 
    const backendURL = "http://localhost:8080"

    const [products,setProducts] = useState([]);
    const [token,setToken] = useState('')
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(true);
    const [cartItems, setCartItems] = useState({});
    const [isOpen, setIsOpen] = useState(false);

    const navigate = useNavigate();

    const addToCart = async(ItemId, size) => {
      if(!size){
        toast.error("Select the Product Size")
        return  
      }

       let cartData = structuredClone(cartItems);
       if(cartData[ItemId]){
        if(cartData[ItemId][size]){
          cartData[ItemId][size] += 1
        }
        else{
          cartData[ItemId][size] = 1
        }
       }else{
        cartData[ItemId] = {}
        cartData[ItemId][size] = 1
       }
       setCartItems(cartData);
       const addData = {ItemId,size}
       console.log(addData)
       if(token){
        try{
          await axios.post(backendURL + "/api/cart/add" , {ItemId,size},  {headers: {token}});
        }catch(error){
          toast.error(error.message)
        }
      }else{
        console.log(token)
      }
    }

    // const addToCart = async (ItemId, size) => {
    //   if (!size) {
    //     toast.error("Select the Product Size");
    //     return;
    //   }
    
    //   let cartData = structuredClone(cartItems);
    //   if (cartData[ItemId]) {
    //     if (cartData[ItemId][size]) {
    //       cartData[ItemId][size] += 1;
    //     } else {
    //       cartData[ItemId][size] = 1;
    //     }
    //   } else {
    //     cartData[ItemId] = { [size]: 1 };
    //   }
    
    //   // Only update state if cart actually changed
    //   if (JSON.stringify(cartData) !== JSON.stringify(cartItems)) {
    //     setCartItems(cartData);
    //   }
    
    //   if (token) {
    //     try {
    //       await axios.post(backendURL + "/api/cart/add", { ItemId, size }, { headers: token });
    //     } catch (error) {
    //       toast.error(error.message);
    //     }
    //   }
    // };
    

    useEffect(() => {
      console.log(cartItems)
    },[cartItems])

    const getCartCount = () => {
      let totalCount = 0
      for(const items in cartItems){
        for(const item in cartItems[items]){
          try{
            if(cartItems[items][item] > 0){
              totalCount += cartItems[items][item]
            }
            }
            catch(err){

            }
          }
        }
        return totalCount;
      };

      const updateQuantity = async(ItemId,size,quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[ItemId][size] = quantity;
        setCartItems(cartData);

        if(token){
          try{
            await axios.post(backendURL + "/api/cart/updateCart", {ItemId,size,quantity},  {headers: {token}})
          }catch(error){
            toast.error(error.message)
          }
        }
      }

      const getCartAmount = () => {
        let totalAmount = 0
        for(const items in cartItems){
          let itemInfo = products.find((val) => (val._id === items))
          for(const item in cartItems[items]){
            try{
              if(cartItems[items][item] > 0){
                totalAmount += itemInfo.price * cartItems[items][item]
              }
            }
            catch(err){

            }
          }
        }
        return totalAmount;
      }

      const getProducts = async () => {
        try {
          const response = await axios.get(backendURL + "/api/product/list");
          console.log(response.data.success)
          if (response.data.success){
            setProducts(response.data.products);
          } else {
            toast.error(response.data.message);
          }
        } catch (error) {
          console.error("Error fetching products:", error);
          toast.error("Failed to fetch products. Try again later.");
        }
      };

      
    useEffect(() => {
      getProducts();
    },[])
      

    const getUserCart = async (token) => {
      try{
        const response = await axios.get(backendURL + "/api/cart/get", {headers: {token}})
        if(response.data.success){
          console.log(token)
          setCartItems(response.data.userCartData)
        }else{
          toast.error(response.data.message)
        }
      }catch(error){
        console.log(error)
      }
    }

    useEffect(() => {
      const storedToken = localStorage.getItem("token");
      if (!token && storedToken) {
        setToken(storedToken);
      }
    }, [token]);
    
    useEffect(() => {
      if (token) {
        getUserCart(token);
      }
    }, [token]);
    
  
    const value = {
        currency, deliveryFee , products , search, setSearch , showSearch, setShowSearch,
        addToCart, cartItems ,setCartItems, getCartCount, updateQuantity, getCartAmount, backendURL, token, setToken, navigate, isOpen, setIsOpen
    };
    
  return (
    <ShopContext.Provider value={value}>
        {props.children}
    </ShopContext.Provider>
  )
};

export default ShopContextProvider;

