import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import { FaCheck } from 'react-icons/fa'
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { DataContext } from '../../context/Context';
import { useParams } from 'react-router-dom';

const SingleCategory = () => {
    const { slug } = useParams();

    const { allProducts, allCategories } = useContext(DataContext)

    const categories = allCategories.find(category => category.slug === slug);

    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (allProducts && allProducts.length > 0) {
            const filteredProducts = allProducts.filter(product => product.category.slug === slug);
            setProducts(filteredProducts);
        }
    }, [slug, allProducts]);

    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        setValue(event.target.value);
    };
    return (
        <>
            <Header />


            <div className=' container mx-auto px-5 py-20'>
                <p className='grostesk font-semibold text-3xl mb-4	capitalize'>Showing results for "{categories?.title}"</p>
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

                {products.length > 0 ? (
                    products.map((product, index) => (
                        <ProductCard key={index} product={product} />
                    ))
                ) : (
                    <>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="skeleton h-32 w-full h-96"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <div className="skeleton h-32 w-full h-96"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>

                        <div className="flex flex-col gap-4 w-full">
                            <div className="skeleton h-32 w-full h-96"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    </>
                )}

            </div>

            <Footer />
        </>
    )
}

export default SingleCategory