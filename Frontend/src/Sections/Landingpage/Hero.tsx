import React from 'react'
import HeroImage from '../../Images/hero.jpg'
import Header from '../../Components/Header'
import { ArrowRight } from 'lucide-react';
import { useRef, useEffect } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Hero() {

    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.to(sectionRef.current, {

                scale: 2,
               
                transformOrigin: "center 40%",
                ease: "power1.inOut",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",

                    scrub: true,

                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div className='relative h-screen overflow-hidden pl-3 lg:pl-0'>

            <div className="relative w-full h-full">

                <div className="absolute inset-0 bg-black/20 z-20"></div>
                <div
                    ref={sectionRef}
                    className="absolute inset-0 w-full h-full"
                >
                    <img src={HeroImage} className="w-full h-full object-cover" />
                </div>


                <div className='flex flex-col absolute inset-0  items-center justify-center space-y-14'>

                    <h1 className='text-6xl text-white font-extrabold'>Welcome To Foodie, Foodies!</h1>
                    <p className='text-white text-center text-4xl'
                        style={{ fontFamily: "'Great Vibes', cursive" }}>Discover a world of flavor crafted just for you. From sizzling street food to gourmet delights, <br />
                        Foodie brings your favorite dishes right to your doorstep.
                        Fresh ingredients, authentic recipes, and unforgettable taste, all in one place.</p>
                    <span className="space-x-10 flex">

                        <button className="px-6 py-2 gap-3.5 rounded-full flex items-center font-semibold text-black 
                     bg-white shadow-md shadow-white/30 
                     border border-white/40
                     hover:bg-white/90 
                     transition duration-300 
                     animate-bounce">
                            Order now <ArrowRight className='text-orange-600 mt-1' />
                        </button>

                        <button className="px-6 py-3 rounded-full font-semibold text-white 
                     border border-white/60 
                     backdrop-blur-md 
                     hover:bg-white/10 
                     transition duration-300">
                            Browse restaurants
                        </button>
                    </span>


                </div>


            </div>
        </div>
    )
}

export default Hero
