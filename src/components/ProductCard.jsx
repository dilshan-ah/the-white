import React, { useState } from 'react'
import { CgShoppingBag } from 'react-icons/cg'
import blacktee from '../assets/black.png'
import ttwo from '../assets/t-two.jpg'

const ProductCard = () => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="card card-compact border border-black rounded-none">
            <figure className='relative' onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {
                    isHovered ? <img src={ttwo} className='h-[400px] object-cover w-full opacity-100 transition-opacity duration-300 ease-in-out' alt="Shoes" /> :
                        <img src={blacktee} className='h-[400px] object-cover w-full' alt="Shoes" />
                }
                <div className='bg-black text-white caveat absolute left-0 top-0 px-2'>NEW</div>
            </figure>
            <div className="card-body">
                <h2 className="card-title grostesk">Black tee</h2>
                <p>Drop shoulder t-shirt</p>
                <h4 className="grostesk font-bold text-lg">BDT 400</h4>

                <div className="card-actions absolute right-5 bottom-5 justify-end tooltip" data-tip="Add to cart">
                    <button className="btn bg-transparent border border-black rounded-full p-0 w-14 h-14 hover:bg-black hover:text-white">
                        <CgShoppingBag className='text-xl' />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard