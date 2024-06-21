import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import BannerSlider from '../components/BannerSlider'
import { FaEnvelope } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { FaUser } from "react-icons/fa";
import Testimonial from '../components/Testimonial';
import { FaShippingFast } from 'react-icons/fa';
import { FaKey } from "react-icons/fa";

import fedex from '../assets/fedex.png'
import pathao from '../assets/pathao.png'
import steadfast from '../assets/steadfast.png'
import ecourier from '../assets/ecourier.png'
import paperly from '../assets/paperly.png'

import bkash from '../assets/bkash-logo.webp'
import nagad from '../assets/Nagad-Logo.png'
import rocket from '../assets/rocket-logo.png'
import upay from '../assets/upay_logo.png'
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/Context';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import AuthUser from '../../auth/AuthUser';
import { MdFilterListOff, MdLock } from 'react-icons/md';
import { GoQuestion } from 'react-icons/go';
import { CiFaceSmile } from 'react-icons/ci';

const Home = () => {

    const { allProducts, allAttributes, userData } = useContext(DataContext)

    const [colorValues, setColorValues] = useState([]);

    const [isRemembered, setIsRemembered] = useState(false)


    const { http, setToken } = AuthUser();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

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
            const res = await http.post('/login', { email: email, password: password, remember_token: rememberMeToken });
            setToken(res.data.user, res.data.access_token);
            window.location.reload()
        } catch (error) {
            console.error('Login failed:', error);
        }
    }

    const rememberMeToken = isRemembered ? localStorage.getItem('rememberMeToken') : null;



    const [selectedColors, setSelectedColors] = useState([]);

    const handleColorChange = (e) => {
        const colorId = parseInt(e.target.value);
        setSelectedColors(prevSelectedColors =>
            e.target.checked ? [...prevSelectedColors, colorId] : prevSelectedColors.filter(id => id !== colorId)
        );
    };

    const [selectedSizes, setSelectedSizes] = useState([])

    const handleSizeChange = (e) => {
        const value = parseInt(e.target.value);
        let size;

        switch (value) {
            case 0:
                size = 'S';
                break;
            case 33:
                size = 'M';
                break;
            case 66:
                size = 'L';
                break;
            case 99:
                size = 'XL';
                break;
            default:
                size = '';
        }

        setSelectedSizes(size);
    };


    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleMinPriceChange = (e) => setMinPrice(e.target.value);
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);



    const [filteredProducts, setFilteredProducts] = useState(allProducts);


    const filterProducts = () => {
        const numericMinPrice = parseFloat(minPrice) || Number.NEGATIVE_INFINITY;
        const numericMaxPrice = parseFloat(maxPrice) || Number.POSITIVE_INFINITY;

        const filtered = allProducts.filter(product => {
            const matchesColor = selectedColors.length > 0
                ? product.variations?.some(variation => selectedColors.includes(product?.color_id))
                : true;

            const matchesSize = selectedSizes != ''
                ? product.variations?.some(variation => selectedSizes == variation.attribute_value?.name)
                : true;

            const priceValid = product.variations.some(variation => {
                const price = parseFloat(variation?.regular_price) || 0;
                return price >= numericMinPrice && price <= numericMaxPrice;
            });

            return matchesColor && matchesSize && priceValid;
        });

        setFilteredProducts(filtered);
    };


    const [latestProduct, setLatestProduct] = useState(null);

    useEffect(() => {
        const colors = allAttributes.find(attr => attr.name === 'Color');
        if (colors && colors.attribute_values) {
            setColorValues(colors.attribute_values);
        }

        filterProducts();


        if (allProducts && allProducts.length > 0) {
            const latest = allProducts.reduce((latest, product) => {
                return new Date(product.created_at) > new Date(latest.created_at) ? product : latest;
            }, allProducts[0]);
            setLatestProduct(latest);
        }
    }, [allAttributes, selectedColors, allProducts, selectedSizes, minPrice, maxPrice]);

    const [isHovered, setIsHovered] = useState(false);

    const handleResetFilter = () => {
        setSelectedSizes([]);
        setSelectedColors([]);
    }

    return (
        <>
            <div className='w-full py-2 px-10 bg-black md:flex block justify-between'>
                {
                    userData ? <h2 className='text-white text-sm font-bold uppercase grostesk cursor-pointer'>Welcome {userData?.name} | ({userData?.loyalty_points} points)</h2> : <h2 onClick={() => document.getElementById('authlog').showModal()} className='text-white text-sm font-bold uppercase grostesk cursor-pointer'>join the white squad and earn loyalty point at every purchase | Login</h2>
                }

                <h3 className='text-white text-sm font-bold uppercase grostesk flex items-center gap-2'>we deliver all over bangladesh<FaShippingFast /></h3>

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

                                <label className="input input-bordered flex items-center gap-2 mb-5">
                                    <FaEnvelope />

                                    <input onChange={(e) => setEmail(e.target.value)} type="text" className="grow" placeholder="Email address" name='email' />
                                </label>

                                <label className="input input-bordered flex items-center gap-2 mb-5">
                                    <FaKey />

                                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="grow" placeholder="password" name='password' />
                                </label>

                                <div className="form-control mb-5">
                                    <label className="label cursor-pointer justify-start">
                                        <input onChange={() => setIsRemembered(!isRemembered)} type="checkbox" className="checkbox mr-5" />
                                        <span className="label-text">Remember me</span>
                                    </label>
                                </div>

                                <div className='flex gap-5 justify-end items-center'>
                                    <form method="dialog">
                                        {/* if there is a button in form, it will close the modal */}
                                        <button className="btn">Close</button>
                                    </form>

                                    <button onClick={(e) => SignIn(e)} className='btn bg-black text-white'>Login</button>
                                </div>
                            </TabPanel>
                        </Tabs>
                    </div>
                </dialog>
            </div>
            <div className='relative'>
                <Header absolute={'absolute'} />
                <BannerSlider />
            </div>

            {/* new arrival section */}

            <div className='px-5 py-20 bg-slate-50'>
                <div className='container mx-auto grid lg:grid-cols-2 grid-cols-1'>
                    <div className='flex flex-col justify-center items-center lg:mb-0 mb-10'>
                        <div>
                            <h2 className='caveat font-bold text-6xl mb-8'>New Arrival!</h2>
                            <p className='text-2xl text-gray-600 font-semibold'>Elevate your style with our latest Drop Shoulder Tees!
                                <br /><span className='font-bold text-xl'>#JoinTheWhiteSquad</span></p>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        {
                            latestProduct ? (
                                <div className="card card-compact w-96 border border-black rounded-none">
                                    <Link to={`/single-product/${latestProduct.slug}`}>
                                        <figure className='relative' onMouseEnter={() => setIsHovered(true)}
                                            onMouseLeave={() => setIsHovered(false)}>
                                            {
                                                isHovered ? <img src={`http://127.0.0.1:8000/uploads/product-gallery/${latestProduct.galleries[0].image_path}`} className='h-[400px] object-cover w-full' alt="Shoes" /> : <img src={`http://127.0.0.1:8000/uploads/product-thumbs/${latestProduct.thumbnail}`} className='h-[400px] object-cover w-full opacity-100 transition-opacity duration-300 ease-in-out' alt="Shoes" />

                                            }
                                            <div className='bg-black text-white caveat absolute left-0 top-0 px-2'>NEW</div>
                                        </figure>
                                    </Link>

                                    <div className="card-body">
                                        <Link to={`/single-product/${latestProduct.slug}`}>
                                            <h2 className="card-title grostesk">{latestProduct.title}</h2>
                                        </Link>

                                        <p>{latestProduct.short_description}</p>
                                        <h4 className="grostesk font-bold text-lg">
                                            BDT
                                            {
                                                latestProduct.variations[0].sale_price && <del className='text-gray-400 mr-2'>{latestProduct.variations[0].regular_price}</del>
                                            }

                                            {latestProduct.variations[0].sale_price ? latestProduct.variations[0].sale_price : latestProduct.variations[0].regular_price}
                                        </h4>

                                        <div className="card-actions absolute right-5 bottom-5 justify-end">
                                            <Link to={`/single-product/${latestProduct.slug}`} className='btn px-4 py-2 border-2 border-black font-bold hover:bg-white hover:text-black hover:border-black rounded-none bg-black text-white uppercase'>Select Option</Link>
                                        </div>
                                    </div>
                                </div>
                            ) : <div className="flex flex-col gap-4 w-96">
                                <div className="skeleton h-96 w-full"></div>
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        }

                    </div>

                </div>
            </div>


            <div className='py-80 welcome-banner relative'>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/80 flex flex-col justify-center items-center px-10'>
                    <h3 className='montserrat container mx-auto font-semibold md:text-6xl text-3xl mb-4 text-white text-center'>Welcome to the <span className='font-semibold'><span>MUL TEE VERSE</span> of<br /> Drop Shoulder Tee in Bangladesh </span></h3>
                    <Link to="https://www.facebook.com/groups/892693480870669" target='_blank' className='btn h-max grostesk px-10 py-4 bg-transparent text-white rounded-none text-xl uppercase shadow-xl hover:bg-white hover:text-black'>Join Our Community</Link>
                </div>
            </div>

            {/* all products */}

            <div className='px-5 py-20 text-center'>
                <p className='grostesk font-semibold md:text-6xl text-3xl mb-4	uppercase'>Take a look at our collection</p>
            </div>

            <div className='container mx-auto px-5 gap-5 mb-10 flex justify-end font-bold capitalize'>
                {
                    selectedColors != '' &&
                    <p>color:
                        <div className="badge badge-outline ml-2 gap-2">
                            {selectedColors.map((colorId, index) => {
                                const color = colorValues.find(color => color.id === colorId);
                                return (
                                    <div key={index}>
                                        {color ? color.name : ''},
                                    </div>
                                );
                            })}
                        </div>
                    </p>
                }

                {
                    selectedSizes != '' &&
                    <p>size:
                        <div className="badge badge-outline ml-2">
                            {selectedSizes}
                        </div>
                    </p>
                }

                {
                    (selectedSizes.length > 0 || selectedColors.length > 0) &&
                    <button onClick={handleResetFilter} className='link flex gap-2 items-center'>
                        <MdFilterListOff />
                        Reset Filter
                    </button>
                }

                {
                    selectedSizes.length === 0 && selectedColors.length === 0 && minPrice === '' && maxPrice === '' && (
                        <p>No filter added</p>
                    )
                }



            </div>


            <div className='px-5 mb-14 lg:container mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 md:gap-0 gap-5'>
                <div className='flex items-start gap-3'>
                    <h4 className='grostesk font-semibold text-xl'>Colors:</h4>

                    {
                        colorValues.map((color) => (
                            <label key={color.id} style={{ backgroundColor: color.color }} class='cursor-pointer custom-checkbox w-7 h-7 rounded-full relative tooltip shadow border' data-tip={`${color.name}`}>
                                <input name='color' onChange={handleColorChange} value={color.id} type="checkbox" className='invisible' checked={selectedColors.includes(color.id)} />
                                <span className='absolute left-0 right-0 top-0 bottom-0 m-auto hidden justify-center items-center'>
                                    {
                                        color.name == 'White' ?
                                            <FaCheck className='text-xl text-black' /> : <FaCheck className='text-xl text-white' />
                                    }
                                </span>
                            </label>
                        ))
                    }

                </div>

                <div className='flex gap-3'>
                    <h4 className='grostesk font-semibold text-xl'>Sizes:</h4>
                    <div className='flex-1'>
                        <input type="range" min={0} max="100" className="range" step="33" onChange={handleSizeChange} />
                        <div className="w-full flex justify-between text-xs px-2">
                            <span className='grostesk font-bold text-xl uppercase'>
                                s
                            </span>
                            <span className='grostesk font-bold text-xl uppercase'>
                                m
                            </span>
                            <span className='grostesk font-bold text-xl uppercase'>
                                l
                            </span>
                            <span className='grostesk font-bold text-xl uppercase'>
                                xl
                            </span>
                        </div>
                    </div>
                </div>

                <div className='flex items-start lg:justify-end gap-3'>
                    <h4 className='grostesk font-semibold text-xl capitalize'>Price range:</h4>

                    <input type="text" value={minPrice} onChange={handleMinPriceChange} placeholder='min' className='w-20 border-2 border-black rounded-lg px-3 py-2 text-black font-bold capitalize grostesk -mt-2' />

                    <input type="text" value={maxPrice} onChange={handleMaxPriceChange} placeholder='max' className='w-20 border-2 border-black rounded-lg px-3 py-2 text-black font-bold capitalize grostesk -mt-2' />
                </div>

            </div>

            <div className='lg:container mx-auto px-5 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5'>

                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        product != null ? (
                            <ProductCard key={product.id} product={product} />
                        ) : (
                            <div key={index} className="flex flex-col gap-4 w-full">
                                <div className="skeleton h-96 w-full"></div>
                                <div className="skeleton h-4 w-28"></div>
                                <div className="skeleton h-4 w-full"></div>
                                <div className="skeleton h-4 w-full"></div>
                            </div>
                        )
                    ))
                ) : (
                    <>
                        <div className='flex flex-col justify-center items-center col-span-3'>
                            <GoQuestion className='text-9xl mb-5' />
                            <p className='text-5xl'>No product found!</p>
                        </div>
                    </>


                )}

            </div>

            <div className='pt-[700px] review-banner relative my-20'>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex flex-col justify-center items-center'>
                    <h3 className='grostesk container mx-auto font-semibold text-3xl mb-5 text-white text-center uppercase'>
                        why choose the white.!
                    </h3>

                    <Testimonial />

                </div>
            </div>


            <div className='mx-auto container px-5 mb-20 grid lg:grid-cols-3 grid-cols-1 gap-10'>
                <div className='flex flex-col items-center'>
                    <MdLock className='text-5xl mb-5' />
                    <p className='grostesk text-center font-semibold text-2xl mb-10 uppercase'>We deliver worldwide</p>

                    <div className='grid grid-cols-6 gap-5 '>
                        <img src={fedex} className='h-full w-auto' alt="" />
                        <img src={pathao} className='h-full w-auto' alt="" />
                        <img src={steadfast} className='h-full w-auto' alt="" />
                        <img src={ecourier} className='h-full w-auto' alt="" />
                        <img src={paperly} className='h-full w-auto' alt="" />
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                    <CiFaceSmile className='text-5xl mb-5' />
                    <p className='grostesk text-center font-semibold text-2xl mb-5 uppercase'>Satisfaction Guaranteed</p>
                    <p className='montserrat font-semibold text-slate-500 mb-4'>made with love with bangladesh</p>
                    <p className='grostesk text-center font-semibold text-xl uppercase'>Mul tee verse of dropshoulders</p>
                </div>

                <div>
                    <div className='mx-auto container px-5 flex flex-col items-center'>
                        <FaShippingFast className='text-5xl mb-5' />
                        <p className='grostesk font-semibold text-center text-2xl mb-10 uppercase'>You can pay us by!</p>

                        <div className='grid grid-cols-6 gap-5 '>
                            <img src={bkash} className='h-full w-full' alt="" />
                            <img src={nagad} className='h-full w-auto' alt="" />
                            <img src={rocket} className='h-full w-auto' alt="" />
                            <img src={upay} className='h-full w-auto' alt="" />
                        </div>
                    </div>
                </div>

            </div>



            <Footer />
        </>
    )
}

export default Home