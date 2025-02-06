import React, { useContext, useEffect, useState } from 'react'
// import { products } from '../assets/assets'
import PromoTitle from './PromoTitle.jsx'
import ProductItem from './ProductItem.jsx'
import { ShopContext } from '../Context/ShopContext.jsx'

const BestSeller = () => {
    const [bestSeller,setBestSeller] = useState([])

    const {products} = useContext(ShopContext);

    useEffect(() => {
        const items = products.filter((item) => (item.bestSeller))
        const reverseProducts = items.reverse()
        setBestSeller(reverseProducts.slice(0,5))
    },[products])

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <PromoTitle text1={"Best"} text2={"sellers"}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Trendy Collections: Stay ahead of the curve with runway-inspired styles.</p>
        </div>

        {/* products items */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {bestSeller.map((item,index) => (<ProductItem  key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>))}
        </div>
    </div>
  )
}

export default BestSeller