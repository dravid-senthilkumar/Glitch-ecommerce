import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../Components/RelatedProducts';

const Product = () => {
  const {productId} = useParams();
  const {products,currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(null);
  const [image,setImage] = useState('');
  const [size,setSize] = useState('');

  const getSingleProduct = async() => {
   const getData = products.find((item) => (item._id === productId))
   if(getData){
    setProductData(getData);
    setImage(getData.image[0])
   }
  };

  useEffect(() => {
    getSingleProduct();
  },[productId])

  return productData ? (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product data */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>

        {/* product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
           {productData.image.map((item,index) => (
            <img className='w-[74%] sm:mb-3 flex-shrink-0 cursor-pointer'  key={index} src={item} onClick={() => setImage(item)} alt=""/>
           ))}
          </div>
          <div className='w-full sm:w-[80%]'>
            <img src={image} alt="" className='w-full h-auto'/>
          </div>
        </div>

        {/* product details */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>{productData.name}</h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className='w-3 5'/>
            <img src={assets.star_icon} alt="" className='w-3 5'/>
            <img src={assets.star_icon} alt="" className='w-3 5'/>
            <img src={assets.star_icon} alt="" className='w-3 5'/>
            <img src={assets.star_dull_icon} alt="" className='w-3 5'/>
            <p className='pl-2'>(122)</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency} {productData.price}</p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes.map((item,index) => (
                <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : ''}`}>{item} </button>
              ))}
            </div>
          </div>
          <button className='bg-black text-white px-8 py-3 text-sm active:bg-gray-700' onClick={() => addToCart(productData._id,size)}>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>100% Orginal Products.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange property.</p>
          </div>
        </div>
      </div>
      {/* description and review */}
      <div className='mt-20'>
        <div className='flex'>
          <b className='border px-5 py-3 text-sm'>Description</b>
          <p className='border px-5 py-3 text-sm'>Reviews (122)</p>
        </div>
        <div className='flex flex-col gap-4 border px-6 py-6 text-sm text-gray-500'>
          <p>An Glitch product rating description typically includes details about the product's quality, fit, style, price, and overall satisfaction.</p>
          <p>GLITCH, a fashion and lifestyle brand, is Retail's digital commerce initiative and is the ultimate fashion destination for styles that are handpicked, on trend and at prices that are the best you'll find anywhere.</p>
        </div>
      </div>

      {/* related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Product