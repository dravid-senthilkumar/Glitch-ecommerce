import React from 'react'

const OfferBox = () => {
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Register now & Get 20% Offer on your First Buy</p>
        <p className='text-gray-400 mt-3'>Exclusive Offers: Unlock discounts and deals crafted for the savvy shopper. Stay inspired with the Style Tribe's influencer-curated looks and discover daily trends with #GLITCHtoday.</p>
        <form onSubmit={(e)=> (e.preventDefault())} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input 
            className='w-full sm:flex-1 outline-none '
            type="text"
            placeholder='Enter your email' 
            required/>
            <button type='submit' className='bg-black text-white text-xs px-10 py-4'>Register</button>
        </form>
    </div>
  )
}

export default OfferBox