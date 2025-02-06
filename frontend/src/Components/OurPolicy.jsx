import React from 'react'
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
        <div>
            <img src={assets.exchange_icon} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Easy Exchange Policy</p>
            <p className='text-gray-400'>We Offer 30 Days Exchange Policy</p>
        </div>

        <div>
            <img src={assets.quality_icon} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Return Policy</p>
            <p className='text-gray-400'>We provide cutomers to 15 Days Return Policy</p>
        </div>

        <div>
            <img src={assets.support_img} alt="" className='w-12 m-auto mb-5'/>
            <p className='font-semibold'>Customer Support</p>
            <p className='text-gray-400'>We Provide 24/7 Customer Support Policy</p>
        </div>
    </div>
  )
}

export default OurPolicy