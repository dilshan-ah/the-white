import React, { useContext, useState } from 'react'
import logo from '../assets/logo.png'
import { FiSearch } from "react-icons/fi";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import CartSide from './CartSide';
import { FaEnvelope, FaKey, FaShippingFast, FaUser } from "react-icons/fa";
import { DataContext } from '../../context/Context';
import { IoClose } from 'react-icons/io5';
import { LuMenu } from "react-icons/lu";
import SearchComponent from './SearchComponent';
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import AuthUser from '../../auth/AuthUser';


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

    const { http, setToken, user } = AuthUser();

    const [errors, setErrors] = useState({});

    // const validateSignIn = () => {
    //     const newErrors = {};

    //     // Validate email
    //     if (!email) {
    //         newErrors.email = "Email is required.";
    //     } else if (!/\S+@\S+\.\S+/.test(email)) {
    //         newErrors.email = "Please enter a valid email address.";
    //     }

    //     // Validate password
    //     if (!password) {
    //         newErrors.password = "Password is required.";
    //     } else if (password.length < 6) {
    //         newErrors.password = "Password must be at least 6 characters long.";
    //     }

    //     setErrors(newErrors);
    //     return Object.keys(newErrors).length === 0;
    // };

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isRemembered, setIsRemembered] = useState(false)
    const SignUp = async (e) => {
        e.preventDefault();
        try {
            const res = await http.post('/register', { email: email, password: password, name: name });
            setToken(res.data.user, res.data.access_token);
            window.location.reload()
        } catch (error) {
            console.error('Register failed:', error);
        }
    }

    const SignIn = async (e) => {
        e.preventDefault();

        try {
            const res = await http.post('/login', {
                email: email,
                password: password,
                remember_token: isRemembered
            });

            setToken(res.data.user, res.data.access_token); // Ensure setToken function is defined
            window.location.reload();
        } catch (error) {
            if (error.response && error.response.status === 422) {
                // Handle validation errors from Laravel
                setErrors(error.response.data.errors);
            } else if (error.response && error.response.status === 401) {
                // Handle unauthorized errors
                setErrors({ general: "Credentials doesn't match" });
            } else {
                console.error('Login failed:', error);
                setErrors({ general: 'An unexpected error occurred. Please try again later.' });
            }
        }
    };
    console.log(errors);


    const rememberMeToken = isRemembered ? localStorage.getItem('rememberMeToken') : null;

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
                                <li className='category-item'>
                                    {
                                        user ?
                                            <Link to='/my-account' className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>My Account</Link> :
                                            <button onClick={() => document.getElementById('authlog').showModal()} className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>Sign in/up</button>}
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
                    <li className='category-item'>
                        {
                            user ?
                                <Link to='/my-account' className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>My Account</Link> :
                                <button onClick={() => document.getElementById('authlog').showModal()} className='grostesk text-xl text-black font-bold hover:animate-pulse uppercase'>Sign in/up</button>}
                    </li>
                    <dialog id="authlog" className="modal">
                        <div className="modal-box p-0 rounded-none">

                            <Tabs>
                                <TabList className='flex'>
                                    <Tab className='w-1/2 cursor-pointer border-2 border-black rounded-none p-3 font-bold text-xl grostesk text-center'>Register</Tab>
                                    <Tab className='w-1/2 cursor-pointer border-2 border-black rounded-none p-3 font-bold text-xl grostesk text-center'>Login</Tab>
                                </TabList>

                                <TabPanel>

                                    <label className="input input-bordered flex items-center gap-2 mb-5 mt-5">
                                        <FaUser />

                                        <input type="text" onChange={(e) => setName(e.target.value)} className="grow" placeholder="Full Name" name='name' />
                                    </label>

                                    <label className="input input-bordered flex items-center gap-2 mb-5">
                                        <FaEnvelope />

                                        <input type="text" onChange={(e) => setEmail(e.target.value)} className="grow" placeholder="Email address" name='email' />
                                    </label>

                                    <label className="input input-bordered flex items-center gap-2 mb-5">
                                        <FaKey />

                                        <input type="password" onChange={(e) => setPassword(e.target.value)} className="grow" placeholder="password" name='password' />
                                    </label>

                                    <div className='flex gap-5 justify-end items-center'>
                                        <form method="dialog">
                                            {/* if there is a button in form, it will close the modal */}
                                            <button className="btn">Close</button>
                                        </form>

                                        <button onClick={(e) => SignUp(e)} className='btn bg-black text-white'>Register</button>
                                    </div>
                                </TabPanel>
                                <TabPanel>

                                    <form onSubmit={SignIn}>
                                        <label className="input input-bordered flex items-center gap-2 mb-5">
                                            <FaEnvelope />
                                            <input
                                                onChange={(e) => setEmail(e.target.value)}
                                                type="text"
                                                className="grow"
                                                placeholder="Email address"
                                                name='email'
                                            />
                                        </label>
                                        {errors.email && <p className="text-red-500 -mt-5 mb-5">{errors.email[0]}</p>}
                                        {errors.general && <p className="text-red-500 -mt-5 mb-5">{errors.general}</p>}

                                        <label className="input input-bordered flex items-center gap-2 mb-5">
                                            <FaKey />
                                            <input
                                                onChange={(e) => setPassword(e.target.value)}
                                                type="password"
                                                className="grow"
                                                placeholder="Password"
                                                name='password'
                                            />
                                        </label>
                                        {errors.password && <p className="text-red-500 -mt-5 mb-5">{errors.password[0]}</p>}

                                        <div className="form-control mb-5">
                                            <label className="label cursor-pointer justify-start">
                                                <input
                                                    onChange={() => setIsRemembered(!isRemembered)}
                                                    type="checkbox"
                                                    className="checkbox mr-5"
                                                />
                                                <span className="label-text">Remember me</span>
                                            </label>
                                        </div>

                                        <div className='flex gap-5 justify-end items-center'>
                                            <button type="button" className="btn" onClick={() => window.history.back()}>
                                                Close
                                            </button>
                                            <button type="submit" className='btn bg-black text-white'>
                                                Login
                                            </button>
                                        </div>
                                    </form>

                                </TabPanel>
                            </Tabs>
                        </div>
                    </dialog>
                </ul>
            </div>
        </div>
    )
}

export default Header