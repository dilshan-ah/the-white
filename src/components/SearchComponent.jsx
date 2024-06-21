import React, { useContext, useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { DataContext } from '../../context/Context';
import { Link, useNavigate } from 'react-router-dom';

const SearchComponent = () => {

    const navigate = useNavigate();

    const { allProducts } = useContext(DataContext);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(searchTerm?.toLowerCase())
    );

    const handleSearch = (e) => {
        e.preventDefault();
        navigate(`/search-result/${searchTerm}`);
    };

    return (
        <div className='relative'>
            <div className='border-2 border-black rounded-full w-96 mr-4 lg:block hidden bg-white'>
                <form className='w-full flex' onSubmit={handleSearch}>

                    <input type="text" value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} placeholder='SEARCH YOUR PRODUCT...' className='px-3 py-3 bg-white rounded-full outline-0 flex-1 font-semibold grostesk' />

                    <button type='submit' className='w-12	h-12 p-0 bg-black rounded-full text-white btn m-0 border-2 border-black hover:bg-white hover:text-black hover:border-transparent'>
                        <FiSearch className='text-xl' />
                    </button>

                </form>
            </div>

            {
                searchTerm != '' && filteredProducts.length > 0 &&
                <div className='w-full p-5 bg-white shadow-lg absolute top-16 left-0 z-40'>
                    {
                        filteredProducts.map((product, index) => (
                            <div>
                                <Link to={`/single-product/${product.slug}`} className='flex gap-3 items-center'>
                                    <img src={`https://thewhitebd.com/uploads/product-thumbs/${product.thumbnail}`} className='w-10' alt="" />

                                    <div>
                                        <h5 className='grostesk font-bold text-lg'>{product.title}</h5>
                                        <p className='grostest font-semibold'>{product.variations[0].regular_price} ৳</p>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            }



        </div>
    )
}

export default SearchComponent