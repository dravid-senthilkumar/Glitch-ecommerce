import React from 'react'
import Hero from '../Components/Hero.jsx'
import LatestCollection from '../Components/LatestCollection.jsx'
import BestSeller from '../Components/BestSeller.jsx'
import OurPolicy from '../Components/OurPolicy.jsx'
import OfferBox from '../Components/OfferBox.jsx'

const Home = () => {
  return (
    <div>
      <Hero/>
      <BestSeller/>
      <LatestCollection/>
      <OurPolicy/>
      <OfferBox/>
    </div>
  )
}

export default Home