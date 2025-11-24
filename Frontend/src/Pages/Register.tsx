
import HeroBackground from '../Images/hero-background.png';
import { SquareUserRound,Mail, KeyRound } from 'lucide-react';

export default function Register() {

    return (
        <div className="h-screen w-full flex items-center justify-center relative">
            
           <img src={HeroBackground} className='absolute object-cover h-screen w-full'/>

            <div className='absolute rounded-2xl lg:mt-20  shadow-[0_0_40px_rgba(0,0,0,0.3)] bg-white/10
              backdrop-blur-md p-10 z-30 flex flex-col space-y-11 items-center w-[90%] sm:w-[80%] md:w-[70%] lg:w-[30%] '>
                <h3 className='uppercase text-3xl text-black text-center '>Register to<span className='text-orange-500'> FOODIE!</span></h3>

                <div className="relative md:w-96 lg:w-72">
                    <input
                        type="text"
                        placeholder=" "
                        className="peer w-full px-4 py-2 rounded-lg bg-white/20 text-black border border-black
                                focus:border-orange-500 focus:outline-none focus:shadow-lg focus:shadow-orange-500/30"
                    />

                    <label
                        className="absolute left-4 top-2 text-black/70 transition-all duration-300
                                peer-placeholder-shown:top-3 
                                peer-placeholder-shown:text-base
                                peer-focus:top-[-25px] 
                                peer-focus:text-sm
                                peer-focus:text-orange-500">
                         <span className='flex gap-4'> <SquareUserRound/> User name</span>           
                        
                    </label>
                </div>

                <div className="relative  md:w-96 lg:w-72">
                    <input
                        type="text"
                        placeholder=" "
                        className="peer w-full px-4 py-2 rounded-lg bg-white/20 text-black border border-black
                                focus:border-orange-500 focus:outline-none focus:shadow-lg focus:shadow-orange-500/30
"
                    />

                    <label
                        className="absolute left-4 top-2 text-black/70 transition-all duration-300
                                    peer-placeholder-shown:top-3 
                                    peer-placeholder-shown:text-base
                                    peer-focus:top-[-25px] 
                                    peer-focus:text-sm
                                    peer-focus:text-orange-500">
                       <span className='flex gap-4'> <Mail/> Email</span>  
                    </label>
                </div>


                <div className="relative  md:w-96 lg:w-72">
                    <input
                        type="text"
                        placeholder=" "
                        className="peer w-full px-4 py-2 rounded-lg bg-white/20 text-black border border-black
                                focus:border-orange-500 focus:outline-none focus:shadow-lg focus:shadow-orange-500/30"
                    />

                    <label
                        className="absolute left-4 top-2 text-black/70 transition-all duration-300
                                    peer-placeholder-shown:top-3 
                                    peer-placeholder-shown:text-base
                                    peer-focus:top-[-25px] 
                                    peer-focus:text-sm
                                    peer-focus:text-orange-500">
                        <span className='flex gap-4'> <KeyRound/> Password </span> 
                    </label>
                </div>

                <button className='px-6 py-3 rounded-full font-semibold text-white
                     backdrop-blur-md 
                     bg-orange-500
                     hover:scale-105
                     transition duration-300'> Register</button>

            </div>
        </div>
    )
}