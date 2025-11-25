import HeroBackground from '../Images/hero-background.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import FloatingInput from '../Components/FloatingInput';
import React, { useState } from 'react';
import { SquareUserRound, Mail, KeyRound } from 'lucide-react';

export default function GetStarted() {

    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="flex items-center justify-center min-h-screen relative py-10">

            {/* Background */}
            <img
                src={HeroBackground}
                className="absolute inset-0 -z-10 w-full h-full object-cover"
                alt="Background"
            />

            {/* MAIN CARD */}
            <div className="relative w-[900px]  mt-20 h-[500px]  backdrop-blur-xl rounded-4xl overflow-hidden shadow-2xl">

                {/* FORM PANEL */}
                <div
                    style={{
                        transform: isLogin ? "translateX(0%)" : "translateX(100%)",
                        transition: "transform 0.8s ease-in-out"
                    }}
                    className="absolute top-0 left-0 w-1/2 h-full flex items-center justify-center p-8"
                >
                    {isLogin ? (
                        <div className="w-xs ">
                            <h2 className="text-3xl font-bold mb-6 text-center text-black">Login</h2>
                            <div className="space-y-4">
                                <FloatingInput label="Email" type="email" icon={Mail} />
                                <FloatingInput label="Password" type="password" icon={KeyRound} />

                                <button
                                    type="button"
                                    className="w-full py-3 cursor-pointer bg-orange-600 text-black rounded-md hover:bg-black hover:text-orange-500 transition-colors font-medium"
                                >
                                    Login
                                </button>

                                <button
                                    className="flex w-full py-3 items-center justify-center gap-2 cursor-pointer bg-orange-600 text-black rounded-md hover:bg-black hover:text-orange-500 transition-colors font-medium"
                                >
                                    <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
                                    Login with Google
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="w-xs">
                            <h2 className="text-3xl font-bold mb-6 text-center text-black">Register</h2>
                            <div className="space-y-4">

                                <FloatingInput label="Full Name" type="text" icon={SquareUserRound} />
                                <FloatingInput label="User Name" type="text" icon={SquareUserRound} />
                                <FloatingInput label="Email" type="email" icon={Mail} />
                                <FloatingInput label="Password" type="password" icon={KeyRound} />


                                <button
                                    type="button"
                                    className="w-full py-3 cursor-pointer bg-orange-600 text-black rounded-md hover:bg-black hover:text-orange-500 transition-colors font-medium"
                                >
                                    Register
                                </button>

                                <button
                                    className="flex items-center justify-center gap-2 w-full py-3 cursor-pointer bg-orange-600 text-black rounded-md hover:bg-black hover:text-orange-600 transition-colors font-medium"
                                >
                                    <FontAwesomeIcon icon={faGoogle} className="w-5 h-5" />
                                    Register with Google
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* ANIMATED PANEL */}
                <div
                    style={{
                        transform: isLogin ? "translateX(100%)" : "translateX(0%)",
                        transition: "transform 0.8s ease-in-out",
                    }}
                    className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-orange-600 to-black text-white flex flex-col items-center justify-center p-10"
                >
                    {isLogin ? (
                        <div className="text-center">
                            <h2 className="text-3xl font-bold mb-4">You don't have an account?</h2>
                            <p className="mb-6">
                                Register with your personal details to use all site features.
                            </p>
                            <button
                                onClick={() => setIsLogin(false)}
                                className="px-6 py-2 border-2 cursor-pointer border-white rounded-md hover:bg-white hover:text-orange-700 transition-colors font-medium"
                            >
                                Register
                            </button>
                        </div>
                    ) : (
                        <div className="text-center ">
                            <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                            <p className="mb-6">
                                To keep connected with us please login with your info.
                            </p>
                            <button
                                onClick={() => setIsLogin(true)}
                                className="px-6 py-2 border-2  cursor-pointer border-white rounded-md hover:bg-white hover:text-orange-700 transition-colors font-medium"
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
