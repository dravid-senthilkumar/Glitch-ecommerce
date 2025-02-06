import React, { useContext, useState } from 'react'
import PromoTitle from '../Components/PromoTitle'
import CartTotal from '../Components/CartTotal'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'
import axios from 'axios';
import { toast } from 'react-toastify'

const PlaceOrder = () => {
   const {navigate, cartItems ,setCartItems, getCartAmount, backendURL, token, products, deliveryFee} = useContext(ShopContext); 
   const [method,setMethod] = useState('');
   const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: ""   
     });

     const onChangeHandler = (event) => {
      const name = event.target.name
      const value = event.target.value
      setFormData(data=> ({...data,[name]:value}))
     };

     const handleSubmit = async() => {
      try{
        let orderItems = []
        for(const items in cartItems){
          for(const item in cartItems[items]){
            if(cartItems[items][item] > 0){
              const itemInfo = structuredClone(products.find((product) => (product._id === items)))
              if(itemInfo){
                itemInfo.size = item
                itemInfo.quantity = cartItems[items][item]
                orderItems.push(itemInfo)
              }
            }
          }
        }
        let orderData = {
          address: formData,
          items: orderItems,
          amount: getCartAmount() + deliveryFee
        }

        switch(method){

          case "cod":
            const response = await axios.post(backendURL + "/api/orders/cod", orderData , {headers: {token}});
            if(response.data.success){
              setCartItems({})
              navigate("/order")
            }else{  
              toast.error(response.data.message)
            }
            break;

          default: 
          break;
        }
      }catch(err){
        if(!token){
          toast.error("Kindly Login or Register !")
        }else{
          toast.error(err.message)
        }
      }
     }

  return (
    <form onSubmit={(e) => (e.preventDefault())} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80v]'>
      {/* left side */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3'>
          <PromoTitle text1={"DELIVERY"} text2={"INFORMATION"}/>
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='firstName' value={formData.firstName} type="text" required placeholder='First Name' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='lastName' value={formData.lastName} type="text" required placeholder='Last Name'/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='street' value={formData.street} type="text" required placeholder='Street'/>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='state' value={formData.state} type="text" required placeholder='State' />
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='city' value={formData.city} type="text" required placeholder='City'/>
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" required placeholder='Zipcode'/>
          <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='country' value={formData.country} type="text" required placeholder='Country'/>
        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' onChange={onChangeHandler} name='phone' value={formData.phone} type="number" required placeholder='Phone'/>
      </div>

      {/* RIGHT SIDE */}
      <div className='mt-8'>
        <div className='mt-8 min-w-80'>
          <CartTotal/>
        </div>

        <div className='mt-12'>
          <PromoTitle text1={"PAYMENT"} text2={"METHOD"}/>

           {/* payment method */}
           
           <div className='flex gap-3 flex-col lg:flex-row'>
            {/* <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={() => setMethod("stripe")}>
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === "stripe" ? "bg-green-400" : ""}`}></p>
              <img className='h-5 mx-4' src={assets.stripe_logo} alt="" />
            </div>

            <div className='flex items-center gap-3 border p-2 px-3 cursor-pointer' onClick={() => setMethod("razorpay")}>
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${method === "razorpay" ? "bg-green-400" : ""}`}></p>
              <img src={assets.razorpay_logo} alt="" />
            </div> */}

            <div className='flex items-center gap-3 border border-current p-2 px-3 cursor-pointer' onClick={() => setMethod("cod")}>
              <p  className={`min-w-3.5 h-3.5 border rounded-full ${method === "cod" ? "bg-green-400" : ""}`}></p>
              <p className='text-gray-500 text-sm font-medium mx-4'>CASH ON DELIVERY</p>
            </div>
           </div>
           <div className='w-full text-end mt-8'>
           <Link to={"/order"}> <button onClick={() => handleSubmit()} className='bg-black text-white px-16 py-3 text-sm'>PLACE ORDER</button> </Link>
           </div>
        </div>
      </div>

    </form>
  )
}

export default PlaceOrder