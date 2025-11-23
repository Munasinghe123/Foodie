import React, { useEffect, useState } from 'react'
import Logo from '../Images/logo.png'

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      className={`
        fixed top-4 left-1/2 -translate-x-1/2 
        flex items-center justify-between 
        px-10 py-3 
        rounded-full 
        backdrop-blur-xl 
        w-[90%] 
        transition-all duration-500 
        z-50

        ${scrolled 
          ? "bg-black/70 shadow-xl shadow-black/30 border border-white/10" 
          : "bg-black/20 border border-white/20"
        }
      `}
    >
      {/* Logo */}
      <div>
        <img src={Logo} className="h-10 rounded-2xl" />
      </div>

      {/* Links */}
      <div className="text-white gap-16  font-semibold flex items-center justify-between  ">
        <span>Home</span>
        <span>Menu</span>
        <span>About</span>
        <span>Contact</span>
      </div>

      {/* Buttons */}
      <div className="space-x-6 flex">
        <button
          className="px-6 py-2 rounded-full font-semibold text-white
            bg-gradient-to-r from-orange-500 via-red-500 to-pink-500
            shadow-lg shadow-orange-500/40
            hover:opacity-90 transition duration-300">
          Login
        </button>

        <button
          className="px-6 py-2 rounded-full font-semibold text-white
            border border-white/60
            backdrop-blur-md 
            hover:bg-white/10 transition duration-300">
          Register
        </button>
      </div>
    </div>
  )
}

export default Header
