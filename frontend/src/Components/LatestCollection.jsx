import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../Context/ShopContext.jsx'
import PromoTitle from './PromoTitle.jsx';
import ProductItem from './ProductItem.jsx';


const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    console.log(products)
    const [latestProducts, setLatestProducts] = useState([]);

    useEffect(() => {
        setLatestProducts(products.slice(0,10))
    },[products]);

  return (
    <div className='my-10'>
        <div className='text-center py-8 text-3xl'>
            <PromoTitle text1={"Latest"} text2={"Collection"}/>
            <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>Affordable Prices: Enjoy fashion-forward choices without stretching your budget.</p>
        </div>
        

        {/* products items */}

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
            {latestProducts.map((item,index) => (<ProductItem key={index} id={item._id} name={item.name} image={item.image} price={item.price}/>))}
        </div>
    </div>
  )
}

export default LatestCollection