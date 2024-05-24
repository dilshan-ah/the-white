import React, { useState } from 'react'
import blacktee from '../assets/black.png'
const CartItem = () => {

    const [cartqty, setCartqty] = useState(1);

    const qtyplus = () => {
        if (cartqty < 10) {
            setCartqty(prevQty => Math.min(prevQty + 1, 10));
        }
    }

    const qtyminus = () => {
        if (cartqty > 1) {
            setCartqty(prevQty => Math.max(prevQty - 1, 1));
        }
    }

    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl mb-4">
            <div className='flex'>
                <figure className='w-1/2'><img src={blacktee} alt="Shoes" /></figure>
                <div className="card-body w-1/2 flex flex-col justify-center">
                    <h2 className="card-title grostesk">Black tee</h2>
                </div>
            </div>

            <div className="card-actions justify-between items-center px-4 pt-10">
                <div className='flex items-center gap-2'>
                    <button onClick={qtyminus} className='w-7 h-7 border-2 border-black text-2xl font-bold flex justify-center items-end hover:bg-black hover:text-white transition-all'>-</button>
                    <span className='grostesk text-xl font-semibold'>{cartqty}</span>
                    <button onClick={qtyplus} className='w-7 h-7 border-2 border-black text-2xl font-bold flex justify-center items-end hover:bg-black hover:text-white transition-all'>+</button>
                </div>

                <select className="select select-bordered border-2 border-black grostesk font-bold text-black uppercase rounded-none">
                    <option selected>Xl</option>
                    <option>Lg</option>
                    <option>Md</option>
                    <option>Sm</option>
                </select>
            </div>


            <div className='p-4 flex justify-between items-center grostesk'>
                <button className='btn px-4 py-2 border-2 border-black font-bold bg-white rounded-none hover:bg-black hover:text-white capitalize'>Add another size</button>
                <h4 className='card-title text-right text-black'>TK 400</h4>
            </div>
        </div>
    )
}

export default CartItem