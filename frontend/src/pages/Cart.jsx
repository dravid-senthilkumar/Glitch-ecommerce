import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import PromoTitle from '../Components/PromoTitle';
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity , navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if(products.length > 0){

      const tempData = []
      for(const productId in cartItems){
        for(const size in cartItems[productId]){
          if(cartItems[productId][size]){
            tempData.push({
              _id: productId,
              size: size,
              quantity: cartItems[productId][size]
            })
          }
        }
      }
      setCartData(tempData)
    }
  },[cartItems,products])

  // useEffect(() => {
  //   if (products.length > 0) {
  //     const tempData = [];
  //     for (const productId in cartItems) {
  //       for (const size in cartItems[productId]) {
  //         if (cartItems[productId][size]) {
  //           tempData.push({
  //             _id: productId,
  //             size: size,
  //             quantity: cartItems[productId][size]
  //           });
  //         }
  //       }
  //     }

  //     // Prevent unnecessary state updates
  //     if (JSON.stringify(tempData) !== JSON.stringify(cartData)) {
  //       setCartData(tempData);
  //     }
  //   }
  // }, [cartItems, products]);



  return (
    <div className='border-t pt-14'>
      <div className='text-2xl mb-3'>
        <PromoTitle text1={"YOUR"} text2={"CART"} />
      </div>

      <div>
        {cartData.map((item, index) => {
          const productData = products.find((product) => (product._id === item._id))
          return (
            <div key={index} className='py-4 border-t border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4'>
              <div className='flex items-start gap-6'>
                <img className='w-16 sm:w-20' src={productData.image[0]} alt="" />
                <div>
                  <p className='text-xs sm:text-lg font-medium'>{productData.name}</p>
                  <div className='flex items-center gap-5 mt-2'>
                    <p>{currency}{productData.price}</p>
                    <p className='px-2 sm:px-3 sm:py-1 border bg-slate-50'>{item.size}</p>
                  </div>
                </div>
              </div>
              <input className='border max-w-10 sm:max-w-20 px-1 sm:px-2 py-1' type="number" min={1} value={item.quantity} onChange={(e) => e.target.value === '' || e.target.value === "0" ? null : updateQuantity(item._id, item.size, Number(e.target.value))}  />
              {/* <input
                type="number"
                min={1}
                value={item.quantity}
                onBlur={(e) => {
                  if (e.target.value === '' || e.target.value === "0") return;
                  updateQuantity(item._id, item.size, Number(e.target.value));
                }}
              /> */}
              <img className='w-4 mr-4 sm:w-5 cursor-pointer' onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} alt="" />
            </div>
          )
        })}
      </div>

      <div className='flex justify-end my-20'>
        <div className='w-full sm:w-[450px]'>
          <CartTotal />
          <div className='w-full text-end'>
            <Link to={"/place-order"}>
              <button onClick={() => navigate('/place-order')} className='bg-black text-white text-sm my-8 px-8 py-3'>
                PROCEED TO CHECKOUT
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart