
import React from 'react'
import Hero from '../Sections/Landingpage/Hero'
import Foodpage from '../Sections/Landingpage/Foodpage'
import BecomeAPartner from '../Sections/User/BecomeAPartner'
function Landingpage() {
  return (
    <div className=' flex flex-col space-y-20 md:space-y-0 '>
      <Hero />
      <div className='px-5 md:px-0'>
        <BecomeAPartner />
      </div>

    </div>
  )
}

export default Landingpage
