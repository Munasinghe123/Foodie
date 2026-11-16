import React from 'react'
import type { RootState } from '../../redux/store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity, removeItem, } from '../../redux/cartSlice';
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

function Cart() {

    const dispatch = useDispatch();

    const cartItems = useSelector((state: RootState) => state.cart.items);

    console.log("all cart items", cartItems);

    const increase = (id: string) => {
        dispatch(increaseQuantity(id));
    }

    const decrease = (id: string) => {
        dispatch(decreaseQuantity(id));
    }

    const remove = (id: string) => {
        dispatch(removeItem(id));
    }

    {
        if (cartItems.length === 0) {
            return (
                <div className="min-h-screen flex flex-col space-y-4 items-center justify-center">
                    <p className="text-lg text-gray-500 flex gap-2">Your cart is empty  <ShoppingCart className='mt-1' /></p>

                    <Link to='/restaurants'>
                        <button className="px-8 py-3 rounded-full flex items-center gap-2 
                                bg-orange-500 text-white font-medium shadow-md
                                hover:bg-orange-600 transition duration-300 hover:scale-105">
                            Order now

                        </button>
                    </Link>
                </div>
            );
        }
    }
    return (
        <div className='min-h-screen flex flex-col bg-gray-100 space-y-4 items-center justify-center lg:pt-32'>

            <div className="flex gap-6 pt-2 max-w-5xl w-full justify-end">
                <Link to='/restaurants'>
                    <button className="px-8 py-3 rounded-full flex items-center gap-2 
                                bg-orange-500 text-white font-medium shadow-md
                                hover:bg-orange-600 transition duration-300 hover:scale-105">
                        Order More
                    </button>
                </Link>

            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 w-full max-w-2xl lg:max-w-5xl border border-orange-400  p-24 rounded-2xl'>
                {cartItems.map((item) => (

                    <div
                        key={item.id}
                        className="
                            flex flex-col gap-6 p-6 rounded-2xl bg-white shadow-md
                            hover:shadow-orange-400 transition duration-300 w-full
                        "
                    >
                        <div className='flex space-x-10'>
                            {/* Image */}
                            <div className="w-28 h-28 rounded-2xl bg-red-500 overflow-hidden flex-shrink-0">
                                <img
                                    src={item.imageUrl}
                                    alt={item.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Info */}
                            <div className="flex-1 flex flex-col justify-between">
                                <div>
                                    <h2 className="text-lg font-semibold">{item.name}</h2>
                                    <p className="text-sm text-gray-500">
                                        ${item.price} each
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-3 bg-gray-100 rounded-full px-4 py-2">
                                <button
                                    onClick={() => decrease(item.id)}
                                    className="hover:text-orange-500 transition"
                                >
                                    <Minus size={18} />
                                </button>

                                <span className="font-medium">{item.quantity}</span>

                                <button
                                    onClick={() => increase(item.id)}
                                    className="hover:text-orange-500 transition"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>

                            {/* Price */}

                            <p className="text-lg font-bold text-orange-500">
                                Rs.{item.price * item.quantity}
                            </p>

                            {/*  delete */}
                            <button
                                onClick={() => remove(item.id)}
                                className="text-gray-400 hover:text-red-500 transition"
                            >
                                <Trash2 />
                            </button>

                        </div>

                    </div>
                ))}
            </div>
            <div>
                <Link to='/checkout'>
                    <button className="px-8 py-3 rounded-full flex items-center gap-2 
                                bg-orange-500 text-white font-medium shadow-md
                                hover:bg-orange-600 transition duration-300 hover:scale-105">
                        Proceed To Checkout
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Cart
