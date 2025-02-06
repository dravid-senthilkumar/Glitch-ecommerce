import React from 'react'
import PromoTitle from '../Components/PromoTitle'
import { assets } from '../assets/assets'
import OfferBox from '../Components/OfferBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
        <PromoTitle text1={"CONTACT"} text2={"US"}/>
      </div>

      <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[480px]' src={assets.contact_img} alt="" />
        <div className='flex flex-col justify-center items-start gap-6'>
          <p className='font-semibold text-xl text-gray-600'>Our Store</p>
          <p className='text-gray-500'>32 Ghandhi road <br /> Choolaimedu, Chennai, 600094</p>
          <p className='text-gray-500'>Phone: (+91)958575-9609 <br />Email: admin@glitch.com</p>
          <p className='font-semibold text-xl text-gray-600'>Careers at Glitch</p>
          <p className='text-gray-500'>Learn more about our teams and job openings.</p>
          <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
        </div>
      </div>

      <OfferBox/>
    </div>
  )
}

export default Contact