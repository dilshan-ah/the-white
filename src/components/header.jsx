import React from 'react'
import logo from '../assets/logo.png'
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link } from 'react-router-dom';
import CartSide from './CartSide';
import { FaShippingFast } from "react-icons/fa";


const Header = ({absolute}) => {

    const isAbsolute = absolute === 'absolute';

    return (
        <div className={`${absolute} w-full z-40`}>
            <div className='container mx-auto flex p-5'>
                <div className='flex-1'>
                    <Link to='/'>
                        <img src={logo} className='w-60' alt="" srcset="" />
                    </Link>
                </div>

                <div className='flex items-center'>
                    <div className='border-2 border-black rounded-full w-96 mr-4'>
                        <form className='w-full flex'>
                            <input type="text" placeholder='SEARCH YOUR PRODUCT...' className='px-3 py-3 bg-white rounded-full outline-0 flex-1 font-semibold grostesk' />
                            <button className='w-12	h-12 p-0 bg-black rounded-full text-white btn m-0 border-2 border-black hover:bg-white hover:text-black hover:border-transparent'>
                                <FiSearch className='text-xl' />
                            </button>
                        </form>
                    </div>

                    <div className="drawer drawer-end w-max">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label className="indicator" htmlFor="my-drawer-4">
                                <span className="indicator-item badge bg-black text-white w-6 h-6 grostesk">10</span>
                                <HiOutlineShoppingCart className='text-4xl cursor-pointer' />
                            </label>
                        </div>
                        <CartSide />
                    </div>
                </div>
            </div>

            <div className='flex justify-center'>
                <ul className='flex gap-10'>
                    <li className='category-item'>
                        <Link to='/search-result' className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>New arrival !</Link>
                    </li>
                    <li className='category-item'>
                        <Link className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>Best selling 🔥</Link>
                    </li>
                    <li className='category-item'>
                        <Link className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase flex gap-2 items-center'>Track your order <FaShippingFast />
                        </Link>
                    </li>
                    <li className='category-item'>
                        <Link className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>About us</Link>
                    </li>
                    <li className='category-item'>
                        <Link to='/contact' className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>Contact Us</Link>
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Header