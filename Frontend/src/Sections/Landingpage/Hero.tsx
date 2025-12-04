import React from 'react'

import { ArrowRight } from 'lucide-react';
import HeroImage from '../../Images/hero.jpg';
import HeroBackground from '../../Images/hero-background.png';

function Hero() {

    return (
        <div className='relative h-screen '>


            <div className='grid grid-cols-1  xl:grid-cols-2 h-full min-h-screen '>
                {/*col 1  */}
                <div className="relative h-full flex flex-col py-20 justify-center">

                    <img src={HeroBackground} className='absolute -z-10 object-cover inset-0 h-full w-full' />

                    <div className='flex flex-col space-y-10 p-5 '>
                        <div className="space-y-10">
                            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                                Delicious Food <span className='text-orange-500'>Delivered</span>  To Your Door
                            </h1>

                            <p className="text-lg lg:text-xl text-gray-600 max-w-xl">
                                Fresh flavors, fast delivery, and your favorite restaurants all in one place.
                            </p>
                        </div>

                        <div className="flex gap-6 pt-2">
                            <button className="px-8 py-3 rounded-full flex items-center gap-2 
                                bg-orange-500 text-white font-medium shadow-md
                                hover:bg-orange-600 transition duration-300 animate-bounce  hover:scale-105 ">
                                Order now
                                <ArrowRight className="mt-1" />
                            </button>


                            <button className="px-8 py-3 rounded-full font-medium text-gray-700
                                    border border-orange-500   hover:scale-105 transition duration-300">
                                Browse restaurants
                            </button>
                        </div>
                    </div>

                </div>

                {/*col 2  */}
                <div className='relative bg-red-700 '>
                    <img src={HeroImage} className='object-cover w-full h-full' />
                </div>
            </div>


        </div>
    )
}

export default Hero
