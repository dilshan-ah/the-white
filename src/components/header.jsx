import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import CartSide from './CartSide';
import { FaShippingFast } from "react-icons/fa";
import { DataContext } from '../../context/Context';
import { IoClose } from 'react-icons/io5';
import { LuMenu } from "react-icons/lu";
import SearchComponent from './SearchComponent';


const Header = ({ absolute }) => {

    const isAbsolute = absolute === 'absolute';

    const navigate = useNavigate();

    const { cart, allCategories, allProducts } = useContext(DataContext)

    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search-result/${searchTerm}`);
    };

    return (
        <div className={`${absolute} w-full z-40`}>
            <div className='lg:container mx-auto flex p-5'>
                <div className='flex-1 flex gap-3'>

                    <div className="drawer lg:hidden w-max z-50">
                        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                        <div className="drawer-content">
                            <label htmlFor="my-drawer" className="btn bg-black drawer-button"><LuMenu className='text-2xl text-white' /></label>
                        </div>
                        <div className="drawer-side">

                            <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                            <ul className='menu bg-white w-80 min-h-full'>
                                <div className='flex gap-3 justify-end mb-10 px-4 pt-4'>
                                    <label htmlFor="my-drawer" aria-label="close sidebar" className='btn bg-black text-white p-0 w-12 h-12 border-2 border-black hover:border-black hover:bg-transparent hover:text-black'><IoClose className='text-4xl' /></label>
                                </div>
                                <li className='category-item'>
                                    <Link to='/' className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase flex gap-2 items-center'>Home
                                    </Link>
                                </li>
                                {
                                    allCategories.map((category) => (
                                        <li className='category-item'>
                                            <Link to={`/single-category/${category.slug}`} className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>{category.title}</Link>
                                        </li>
                                    ))
                                }
                                <li className='category-item'>
                                    <Link to='/track-order' className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase flex gap-2 items-center'>Track your order <FaShippingFast />
                                    </Link>
                                </li>
                                <li className='category-item'>
                                    <Link to='/about' className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>About us</Link>
                                </li>
                                <li className='category-item'>
                                    <Link to='/contact' className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>Contact Us</Link>
                                </li>

                            </ul>
                        </div>
                    </div>

                    <Link to='/' className='md:block hidden'>
                        <img src={logo} className='w-60' alt="" srcset="" />
                    </Link>
                </div>

                <div className='flex items-center'>
                    <SearchComponent />


                    <button className='rounded-full mr-5 -mt-2.5 lg:hidden block' onClick={() => document.getElementById('search_modal').showModal()}>
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
                                        onChange={(e) => setSearchTerm(e.target.value)} type="text" className='w-full outline-none grostesk font-bold' placeholder='Search here' />
                                    <button className='rounded-full'>
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

            <div className='lg:flex hidden justify-center'>
                <ul className='flex gap-10'>
                    {
                        allCategories.map((category) => (
                            <li className='category-item'>
                                <Link to={`/single-category/${category.slug}`} className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>{category?.title}</Link>
                            </li>
                        ))
                    }
                    <li className='category-item'>
                        <Link to='/track-order' className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase flex gap-2 items-center'>Track your order <FaShippingFast />
                        </Link>
                    </li>
                    <li className='category-item'>
                        <Link to='/about' className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>About us</Link>
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