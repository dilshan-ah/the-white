import React, { useContext, useState } from 'react'
import Header from '../components/header'
import { FaCheck } from 'react-icons/fa'
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/Context';

const SearchResult = () => {

    const { string } = useParams();

    const { allProducts } = useContext(DataContext)

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(string?.toLowerCase())
    );

    const [value, setValue] = useState(0); // Initialize the value state

    const handleChange = (event) => {
        setValue(event.target.value); // Update the value state when the range input changes
    };
    return (
        <>
            <Header />


            <div className=' container mx-auto px-5 py-20'>
                <p className='grostesk font-semibold text-3xl mb-4	capitalize'>Showing results for this "{string}"</p>
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

            <div className='container mx-auto px-5 grid lg:grid-cols-3 md:grid-cols-3 gap-5'>

                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <p className='grostesk text-6xl font-semibold text-center block col-span-3'>No Result Found</p>
                )}

            </div>

            <Footer />
        </>
    )
}

export default SearchResult