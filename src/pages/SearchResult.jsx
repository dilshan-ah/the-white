import React, { useContext, useState, useEffect } from 'react'
import Header from '../components/header'
import { FaCheck } from 'react-icons/fa'
import ProductCard from '../components/ProductCard';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { DataContext } from '../../context/Context';
import { MdFilterListOff } from 'react-icons/md';
import { Helmet } from 'react-helmet';

const SearchResult = () => {

    const { string } = useParams();

    const { allProducts, allCategories, allAttributes } = useContext(DataContext);



    // const categories = allCategories.find(category => category.slug === slug);

    const [colorValues, setColorValues] = useState([]);
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const handleColorChange = (e) => {
        const colorId = parseInt(e.target.value);
        setSelectedColors(prevSelectedColors =>
            e.target.checked ? [...prevSelectedColors, colorId] : prevSelectedColors.filter(id => id !== colorId)
        );
    };

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

        setSelectedSizes(size !== '' ? [size] : []);
    };

    const handleMinPriceChange = (e) => setMinPrice(e.target.value);
    const handleMaxPriceChange = (e) => setMaxPrice(e.target.value);


    const handleResetFilter = () => {
        setSelectedSizes([]);
        setSelectedColors([]);
    };

    useEffect(() => {
        const colors = allAttributes.find(attr => attr.name === 'Color');
        if (colors && colors.attribute_values) {
            setColorValues(colors.attribute_values);
        }

        const searchProducts = allProducts.filter(product =>
            product.title.toLowerCase().includes(string?.toLowerCase())
        );

        const filterProducts = () => {
            if (!searchProducts || searchProducts.length === 0) {
                setFilteredProducts([]);
                return;
            }

            const numericMinPrice = parseFloat(minPrice) || Number.NEGATIVE_INFINITY;
            const numericMaxPrice = parseFloat(maxPrice) || Number.POSITIVE_INFINITY;

            const filtered = searchProducts.filter(product => {
                const matchesColor = selectedColors.length > 0
                    ? selectedColors.includes(parseInt(product.color_id))
                    : true;

                const matchesSize = selectedSizes.length > 0
                    ? product.variations?.some(variation => selectedSizes.includes(variation.attribute_value?.name))
                    : true;

                const priceValid = product.variations.some(variation => {
                    const price = parseFloat(variation?.regular_price) || 0;
                    return price >= numericMinPrice && price <= numericMaxPrice;
                });

                return matchesColor && matchesSize && priceValid;
            });

            setFilteredProducts(filtered);
        };

        filterProducts();
    }, [string, allAttributes, selectedColors, allProducts, selectedSizes, minPrice, maxPrice]);

    return (
        <>

            <Helmet>
                <title>Showing results for {string} | The White</title>
            </Helmet>

            <Header />


            <div className=' container mx-auto px-5 py-20'>
                <p className='grostesk font-semibold text-3xl mb-4	capitalize'>Showing results for "{string}"</p>
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