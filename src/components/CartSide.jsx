import React from 'react'
import { IoClose } from "react-icons/io5";

const CartSide = () => {
    return (
        <div className="drawer-side z-50">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

            <div className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">

                <div className='flex gap-3 items-center mb-10'>
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className='btn bg-black text-white p-0 w-12 h-12 border-2 border-black hover:border-black hover:bg-transparent hover:text-black'><IoClose className='text-4xl' /></label>
                    <h1 className='grostesk font-semibold text-2xl'>Cart (10)</h1>
                </div>

                <div className="card card-compact w-full bg-base-100 shadow-xl">
                    <figure><img src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartSide