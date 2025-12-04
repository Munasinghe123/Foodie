import React from 'react'
import { ArrowRight } from 'lucide-react';
import ResturantOwner from '../../Images/res-owner.jpg'
import HeroBackground from '../../Images/hero-background.png'
import { Link } from 'react-router-dom';

function BecomeAPartner() {
  return (
    <div className='relative lg:h-screen min-h-screen  '>

      <div className='flex md:justify-center md:items-center h-full  md:px-10 '>
        <div className=' grid grid-cols-1  xl:grid-cols-2 md:rounded-4xl   overflow-hidden z-30 '>
          {/*col 1  */}
          <div className="relative flex flex-col md:py-20 py-5 justify-center">
            <img src={HeroBackground} className='absolute -z-10 object-cover inset-0 h-full w-full ' />
            <div className='flex flex-col space-y-10 p-5 '>
              <div className="space-y-10">
                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  Grow your  <span className='text-orange-500'>business with</span>  Foodie!
                </h1>

                <p className="text-lg lg:text-xl text-gray-600 max-w-xl">
                  Join our platform and start reaching thousands of hungry customers.
                </p>
              </div>

              <div className="flex gap-6 pt-2">
                <Link to='/register-resturant'>
                  <button className="px-8 py-3 rounded-full flex items-center gap-2 
                                bg-orange-500 text-white font-medium shadow-md
                                hover:bg-orange-600 transition duration-300 animate-bounce  hover:scale-105 ">
                    Register your resturant now
                    <ArrowRight className="mt-1" />
                  </button>
                </Link>

              </div>
            </div>

          </div>

          {/*col 2  */}
          <div className='relative '>
            <img src={ResturantOwner} className='object-cover w-full h-full ' />
          </div>
        </div>
      </div>



    </div>
  )
}

export default BecomeAPartner
