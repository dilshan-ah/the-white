import React, { useContext, useState } from 'react'
import Header from '../components/header'
import BannerSlider from '../components/BannerSlider'
import blacktee from '../assets/black.png'
import { CgShoppingBag } from "react-icons/cg";
import { FaCheck } from "react-icons/fa6";
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import bdflag from '../assets/bangladesh-flag.png'
import Testimonial from '../components/Testimonial';
import { FaShippingFast } from 'react-icons/fa';
import { IoMdLock } from "react-icons/io";

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

const Home = () => {

    const [value, setValue] = useState(0); // Initialize the value state

    const handleChange = (event) => {
        setValue(event.target.value); // Update the value state when the range input changes
    };

    const {allProducts} = useContext(DataContext)

    return (
        <>
            <div className='relative'>
                <Header absolute={'absolute'} />
                <BannerSlider />
            </div>

            {/* new arrival section */}

            <div className='px-5 py-20 bg-slate-50'>
                <div className='container mx-auto grid grid-cols-2'>
                    <div className='flex flex-col justify-center items-center'>
                        <div>
                            <h2 className='caveat font-bold text-6xl mb-8'>New Arrival!</h2>
                            {/* <h3 className='grostesk font-semibold text-6xl mb-4'>New Arrival</h3> */}
                            <p className='text-2xl text-gray-600 font-semibold'>Elevate your style with our latest Drop Shoulder Tees!
                                <br /><span className='font-bold text-xl'>#JoinTheWhiteSquad</span></p>
                        </div>
                    </div>

                    <div className='flex justify-center'>
                        <div className="card card-compact w-96 border border-black rounded-none">
                            <figure className='relative'>
                                <img src={blacktee} alt="Shoes" />
                                <div className='bg-black text-white caveat absolute left-0 top-0 px-2'>NEW</div>
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title grostesk">Black tee</h2>
                                <p>Drop shoulder t-shirt</p>
                                <h4 className="grostesk font-bold text-lg">BDT 400</h4>

                                <div className="card-actions absolute right-5 bottom-5 justify-end">
                                    <button className='btn px-4 py-2 border-2 border-black font-bold hover:bg-white hover:text-black hover:border-black rounded-none bg-black text-white uppercase'>Buy now</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>


            <div className='py-80 welcome-banner relative'>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/60 flex flex-col justify-center items-center'>
                    <h3 className='grostesk container mx-auto font-semibold text-6xl mb-4 text-white text-center'>Welcome to the <span className='font-semibold'><span>MUL TEE VERSE</span> of Drop Shoulder Tee in Bangladesh </span></h3>
                    <Link to="https://www.facebook.com/groups/892693480870669" target='_blank' className='btn h-max grostesk px-10 py-4 bg-white/85 border-white/70 text-4xl uppercase shadow-xl'>Join Our Community</Link>
                </div>
            </div>

            {/* all products */}

            <div className='px-5 py-20 text-center'>
                <p className='grostesk font-semibold text-6xl mb-4	uppercase'>Take a look at our collection</p>
            </div>

            <div className='px-5 mb-14 container mx-auto grid grid-cols-3'>
                <div className='flex items-start gap-3'>
                    <h4 className='grostesk font-semibold text-xl'>Colors:</h4>

                    <label class='cursor-pointer custom-checkbox w-7 h-7 bg-gray-400 rounded-full relative tooltip' data-tip="Gray">
                        <input name='red' type="checkbox" className='invisible' />
                        <span className='absolute left-0 right-0 top-0 bottom-0 m-auto hidden justify-center items-center'>
                            <FaCheck className='text-xl text-white' />
                        </span>
                    </label>

                    <label class='cursor-pointer custom-checkbox w-7 h-7 bg-black rounded-full relative tooltip' data-tip="Black">
                        <input name='red' type="checkbox" className='invisible' />
                        <span className='absolute left-0 right-0 top-0 bottom-0 m-auto hidden justify-center items-center'>
                            <FaCheck className='text-xl text-white' />
                        </span>
                    </label>

                    <label class='cursor-pointer custom-checkbox w-7 h-7 bg-gray-400 rounded-full relative tooltip' data-tip="Gray">
                        <input name='red' type="checkbox" className='invisible' />
                        <span className='absolute left-0 right-0 top-0 bottom-0 m-auto hidden justify-center items-center'>
                            <FaCheck className='text-xl text-white' />
                        </span>
                    </label>

                    <label class='cursor-pointer custom-checkbox w-7 h-7 bg-gray-400 rounded-full relative tooltip' data-tip="Gray">
                        <input name='red' type="checkbox" className='invisible' />
                        <span className='absolute left-0 right-0 top-0 bottom-0 m-auto hidden justify-center items-center'>
                            <FaCheck className='text-xl text-white' />
                        </span>
                    </label>

                    <label class='cursor-pointer custom-checkbox w-7 h-7 bg-gray-400 rounded-full relative tooltip' data-tip="Gray">
                        <input name='red' type="checkbox" className='invisible' />
                        <span className='absolute left-0 right-0 top-0 bottom-0 m-auto hidden justify-center items-center'>
                            <FaCheck className='text-xl text-white' />
                        </span>
                    </label>

                    <label class='cursor-pointer custom-checkbox w-7 h-7 bg-gray-400 rounded-full relative tooltip' data-tip="Gray">
                        <input name='red' type="checkbox" className='invisible' />
                        <span className='absolute left-0 right-0 top-0 bottom-0 m-auto hidden justify-center items-center'>
                            <FaCheck className='text-xl text-white' />
                        </span>
                    </label>

                    <label class='cursor-pointer custom-checkbox w-7 h-7 bg-gray-400 rounded-full relative tooltip' data-tip="Gray">
                        <input name='red' type="checkbox" className='invisible' />
                        <span className='absolute left-0 right-0 top-0 bottom-0 m-auto hidden justify-center items-center'>
                            <FaCheck className='text-xl text-white' />
                        </span>
                    </label>

                </div>

                <div className='flex gap-3'>
                    <h4 className='grostesk font-semibold text-xl'>Sizes:</h4>
                    <div className='flex-1'>
                        <input type="range" min={0} max="100" value={value} className="range" step="33" onChange={handleChange} />
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

                <div className='flex items-start justify-end gap-3'>
                    <h4 className='grostesk font-semibold text-xl capitalize'>Price range:</h4>

                    <input type="text" placeholder='min' className='w-20 border-2 border-black rounded-lg px-3 py-2 text-black font-bold capitalize grostesk -mt-2' />

                    <input type="text" placeholder='max' className='w-20 border-2 border-black rounded-lg px-3 py-2 text-black font-bold capitalize grostesk -mt-2' />
                </div>

            </div>

            <div className='container mx-auto px-5 grid grid-cols-3 gap-5'>

            {allProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}

            </div>

            <div className='pt-[700px] review-banner relative my-20'>
                <div className='absolute top-0 left-0 right-0 bottom-0 bg-black/50 flex flex-col justify-center items-center'>
                    <h3 className='grostesk container mx-auto font-semibold text-3xl mb-5 text-white text-center uppercase'>
                        why choose the white.!
                    </h3>

                    <Testimonial />

                </div>
            </div>


            <div className='mx-auto container px-5 mb-20 flex flex-col justify-center items-center'>
                <FaShippingFast className='text-5xl mb-10'/>
                <p className='grostesk font-semibold text-5xl mb-10 uppercase'>We deliver worldwide</p>

                <div className='flex justify-center gap-5'>
                    <img src={fedex} className='h-10' alt="" />
                    <img src={pathao} className='h-10' alt="" />
                    <img src={steadfast} className='h-10' alt="" />
                    <img src={ecourier} className='h-10' alt="" />
                    <img src={paperly} className='h-10' alt="" />
                </div>
            </div>

            <div className='mx-auto container mt-20 px-5 flex flex-col justify-center items-center'>
                <FaShippingFast className='text-5xl mb-10'/>
                <p className='grostesk font-semibold text-5xl mb-10 uppercase'>You can pay us by!</p>

                <div className='flex justify-center gap-5'>
                    <img src={bkash} className='h-10' alt="" />
                    <img src={nagad} className='h-10' alt="" />
                    <img src={rocket} className='h-10' alt="" />
                    <img src={upay} className='h-10' alt="" />
                </div>
            </div>

            <Footer />
        </>
    )
}

export default Home