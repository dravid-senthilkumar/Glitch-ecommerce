import React from 'react'

const PromoTitle = ({text1,text2}) => {
  return (
    <div className='inline-flex py-8 gap-2 items-center mb-3'>
        <p className='text-gray-500'>{text1} <span className='text-gray-700 front-medium'> {text2}</span></p>
    </div>
  )
}

export default PromoTitle