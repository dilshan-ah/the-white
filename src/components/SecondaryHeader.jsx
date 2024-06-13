import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import CartSide from './CartSide';
import { FaShippingFast } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { DataContext } from '../../context/Context';


const SecondaryHeader = () => {

    const navigate = useNavigate();

    const { cart, allProducts } = useContext(DataContext)

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search-result/${searchTerm}`);
    };

    return (
        <div className='w-full z-40'>
            <div className='container mx-auto flex p-5'>
                <div className='flex-1'>
                    <Link to='/'>
                        <img src={logo} className='w-60' alt="" srcset="" />
                    </Link>
                </div>

                <div className='flex items-center'>
                    <button className='rounded-full mr-5 -mt-2.5' onClick={() => document.getElementById('search_modal').showModal()}>
                        <FiSearch className='text-4xl cursor-pointer' />
                    </button>

                    <dialog id="search_modal" className="modal">
                        <div className="modal-box max-w-full w-full max-h-full h-full rounded-none flex flex-col justify-center items-center">
                            <form method="dialog">
                                <button className="absolute right-10 top-10">
                                    <IoClose className='text-4xl' />
                                </button>
                            </form>
                            <h3 className="font-bold text-5xl grostesk mb-5">WHAT ARE YOU LOOKING FOR?</h3>
                            <div className='max-w-2xl flex w-full border-b-2 border-black py-2'>
                                <form onSubmit={handleSearch} className='flex w-full'>
                                    <input value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)} type="text" className='w-full outline-none grostesk font-bold flex-1' placeholder='Search here' />
                                    <button type='submit' className='rounded-full'>
                                        <FiSearch className='text-xl cursor-pointer' />
                                    </button>
                                </form>

                            </div>
                        </div>
                    </dialog>

                    <div className="drawer drawer-end w-max">
                        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label className="indicator" htmlFor="my-drawer-4">
                                <span className="indicator-item badge bg-black text-white w-6 h-6 grostesk">{cart.length}</span>
                                <HiOutlineShoppingCart className='text-4xl cursor-pointer' />
                            </label>
                        </div>
                        <CartSide />
                    </div>
                </div>
            </div>


        </div>
    )
}

export default SecondaryHeader