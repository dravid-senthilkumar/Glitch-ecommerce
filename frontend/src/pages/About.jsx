import React from 'react'
import PromoTitle from '../Components/PromoTitle'
import { assets } from '../assets/assets'
import OfferBox from '../Components/OfferBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <PromoTitle text1={"ABOUT"} text2={"US"}/>
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p>We grow fast, and so should their style! Online fashion shopping at GLITCH makes it easy for you to choose from collections that are highly durable and stylish.</p>
          <p>From playful prints to sturdy sneakers, you are all will love the outfits, and you’ll love the quality.</p>
          <b className='text-gray-800'>Our Misson.</b>
          <p>Our motive is provide branded products like Puma | Crocs | Adidas | Nike | P N Gadgil Jewellers | Gap | Red tape | WHP Jewellers | Avaasa Mix N Match | DNMX | Yousta | U.S. POLO ASSN. | Netplay | Armani Exchange | Superdry... with maximum offers. </p>
          <p>This makes Premium Quality products with affordable price. All products for everyone !</p>
        </div>
      </div>

      <div>
        <div className='text-xl py-4'>
        <PromoTitle text1={"WHY"} text2={"CHOOSE US"}/>
        </div>

        <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Quality Assurance:</b>
            <b className='text-gray-600'>Glitch's quality assurance process ensures that its products meet customer expectations and specified standards.</b>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Convenience:</b>
            <b className='text-gray-600'>Ajio offers several conveniences to its customers, including Customer support,GLITCH Wallet,Location access,Returns and refunds.</b>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b>Exceptional Customer Service:</b>
            <b className='text-gray-600'>CALL US. 1800-889-9991. Our customer helpLines opens 24/7. ; WRITE TO US · customercare@glitch.com</b>
          </div>
        </div>
      </div>
      <OfferBox/>
    </div>
  )
}

export default About