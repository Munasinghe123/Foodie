import React from 'react'
import { ArrowRight } from 'lucide-react';
import ResturantOwner from '../../Images/res-owner.jpg'
import DeliveryGuy from '../../Images/hero.jpg'
import { Link } from 'react-router-dom';

function BecomeAPartner() {
  return (
    <div className='relative lg:h-screen min-h-screen  '>

      <div className='flex md:justify-center md:items-center h-full  md:px-10 '>
        <div className=' grid grid-cols-1  xl:grid-cols-2 gap-10  z-30 '>
          {/*col 1  */}
          <div className="relative flex flex-col md:py-20 py-5 justify-center  ">
            <img src={ResturantOwner} className='absolute -z-10 rounded-4xl object-cover inset-0 h-full w-full ' />
             <div className="absolute inset-0 bg-black/50 rounded-4xl -z-10"></div>
            <div className='flex flex-col space-y-10 p-5 '>
              <div className="space-y-10">
                <h1 className="text-4xl lg:text-5xl font-bold text-white  leading-tight">
                  Grow your business with Foodie!
                </h1>

                <p className="text-lg lg:text-xl text-white  max-w-xl">
                  Join our platform and start reaching thousands of hungry customers.
                </p>
              </div>

              <div className="flex gap-6 pt-2">
                <Link to='/register-resturant'>
                  <button className="px-8 py-3 rounded-full flex items-center gap-2 
                                bg-orange-500 text-white font-medium shadow-md
                                hover:bg-orange-600 transition duration-300 hover:scale-105 ">
                    Register your resturant now
                    <ArrowRight className="mt-1" />
                  </button>
                </Link>

              </div>
            </div>

          </div>

          {/*col 2  */}
          <div className="relative flex flex-col md:py-20 py-5 justify-center md:rounded-4xl ">
            <img src={DeliveryGuy} className='absolute -z-10 object-cover rounded-4xl inset-0 h-full w-full ' />
             <div className="absolute inset-0 bg-black/50 rounded-4xl -z-10"></div>
            <div className='flex flex-col space-y-10 p-5 '>
              <div className="space-y-10">
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                    Become a Delivery Partner in Foodie!
                </h1>

                <p className="text-lg lg:text-xl text-white max-w-xl">
                  Earn money with flexible hours by delivering food across the city.
                </p>
              </div>

              <div className="flex gap-6 pt-2">
                <Link to='/register-resturant'>
                  <button className="px-8 py-3 rounded-full flex items-center gap-2 
                                bg-orange-500 text-white font-medium shadow-md
                                hover:bg-orange-600 transition duration-300 hover:scale-105 ">
                    Join Now
                    <ArrowRight className="mt-1" />
                  </button>
                </Link>

              </div>
            </div>

          </div>
        </div>
      </div>



    </div>
  )
}

export default BecomeAPartner
