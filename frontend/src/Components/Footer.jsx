import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

const Footer = () => {
  const {navigate} = useContext(ShopContext)
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>

        <div>
          <img style={{ width: 100 }} src={assets.logo} alt="" className='mb-5 w-32' />
          <p className='w-full md:w-2/3 text-gray-600'>Tailored for You: Find the right fit every time with our versatile sizes.
            Quality That Lasts: Enjoy comfort and durability with every piece.
            Trendy Yet Timeless: Stay stylish, no matter the occasion.
            Kids’ Shopping: Fun Meets Function. #GLITCHfashion</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li className='cursor-pointer' onClick={() => navigate("/")}>Home</li>
            <li className='cursor-pointer' onClick={() => navigate('/about')}>About us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+44 675475453</li>
            <li>glitch.service2025@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyrights 2025 @ Glitch.com - All Rights Reserved</p>
      </div>
    </div>
  )
}

export default Footer