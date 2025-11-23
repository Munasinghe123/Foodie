import React, { useEffect, useState, useRef } from 'react'
import Logo from '../Images/logo.png'
import { Menu, X } from 'lucide-react';
import gsap from 'gsap';
import { Link } from 'lucide-react';

function Header() {
  const [scrolled, setScrolled] = useState(false);

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Animate sidebar on open/close
  useEffect(() => {
    if (isSidebarOpen) {

      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power3.out"
      });

      gsap.fromTo(
        sidebarRef.current,
        { x: "100%" },
        { x: 0, duration: 0.6, ease: "power3.out" }
      );
    } else if (sidebarRef.current) {
      gsap.to(sidebarRef.current, {
        x: "100%",
        duration: 0.4,
        ease: "power3.in",
      });
    }
  }, [isSidebarOpen]);

  const openSideBar = () => {
    setIsSidebarOpen(true);
  };

  const closeSidebar = () => {

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power3.in"
    });
    gsap.to(sidebarRef.current, {
      x: "100%",
      duration: 0.4,
      ease: "power3.in",
      onComplete: () => {
        setIsSidebarOpen(false);
      },
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>

      {/* desktop header */}
      <div
        className={`
        fixed top-4 left-1/2 -translate-x-1/2 
         items-center justify-between 
        px-10 py-3 
        rounded-full 
        backdrop-blur-xl 
        w-[90%] 
        transition-all duration-500 
        z-50
        hidden lg:flex

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

      {/* mobile view */}
      <nav className="lg:hidden flex  justify-between w-full">
        <div className="p-5 flex w-full">
          <div className='flex justify-between w-full'>
            <div>
              <img src={Logo} className="h-10 rounded-2xl" />
            </div>
            <div>
              <button onClick={openSideBar} className="">
                <Menu className="h-10 w-10 text-orange-500" />
              </button>
            </div>
          </div>



          <div
            ref={overlayRef}
            className={`fixed inset-0 bg-black/80 z-40 ${isSidebarOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
            style={{ opacity: 0 }}
            onClick={closeSidebar}
          />


          <div
            ref={sidebarRef}
            className="fixed right-0 top-0 h-screen bg-white z-50 flex w-2/3 justify-end"
            style={{ transform: 'translateX(100%)' }}
          >
            <div className="m-10 flex flex-col text-2xl space-y-5 items-end">
              <button onClick={closeSidebar}>
                <X className="h-8 w-8" />
              </button>

              <Link to="/about" className='' onClick={closeSidebar}>
                About us
              </Link>

              <Link to="/services" onClick={closeSidebar}>
                Services
              </Link>

              <Link to="/portfolio" onClick={closeSidebar}>
                Portfolio
              </Link>

              <Link to="/team" onClick={closeSidebar}>
                Team
              </Link>

              <Link to="/contact" onClick={closeSidebar}>
                Contact
              </Link>
              
                <button
                  className="px-6 py-2 rounded-full font-semibold text-white
            bg-gradient-to-r from-orange-500 via-red-500 to-pink-500
            shadow-lg shadow-orange-500/40
            hover:opacity-90 transition duration-300">
                  Login
                </button>

                <button
                  className="px-6 py-2 rounded-full font-semibold text-black
            border border-black/60
            backdrop-blur-md 
            hover:bg-white/10 transition duration-300">
                  Register
                </button>
             
            </div>
          </div>
        </div>
      </nav >
    </>
  )
}

export default Header
