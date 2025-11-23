import React from 'react'
import HeroImage from '../../Images/hero.jpg'
import Header from '../../Components/Header'

function Hero() {
    return (
        <div className='relative h-screen '>

            <Header />

            <div className='flex w-full max-h-screen relative '>
                <div className="absolute inset-0 bg-black/60"></div>
                <img src={HeroImage} className=' w-full' />

                <div className='flex flex-col absolute inset-0  items-center justify-center space-y-4'>

                    <h1 className='text-6xl text-white font-extrabold'>Welcome To Foodie Foodies!</h1>
                    <p className='text-white text-center text-4xl'
                        style={{ fontFamily: "'Great Vibes', cursive" }}>Discover a world of flavor crafted just for you. From sizzling street food to gourmet delights, <br />
                        Foodie brings your favorite dishes right to your doorstep.
                        Fresh ingredients, authentic recipes, and unforgettable taste, all in one place.</p>

                </div>
            </div>
        </div>
    )
}

export default Hero
