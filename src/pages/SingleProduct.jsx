import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/Footer'
import { RiFireLine } from "react-icons/ri";
import { CgRuler } from "react-icons/cg";

import sizeChart from '../assets/size-chart.jpg'
import ProductGallerySlider from '../components/ProductGallerySlider';
import { DataContext } from '../../context/Context';
import { useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import DOMPurify from 'dompurify';


const SingleProduct = () => {

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const [cartqty, setCartqty] = useState(1);

    const qtyplus = () => {
        if (cartqty < 10) {
            setCartqty(prevQty => Math.min(prevQty + 1, 10));
        }
    }

    const qtyminus = () => {
        if (cartqty > 1) {
            setCartqty(prevQty => Math.max(prevQty - 1, 1));
        }
    }

    const { slug } = useParams();

    const { allProducts, cart, setCart } = useContext(DataContext)

    const product = allProducts.find(product => product.slug === slug);

    console.log(cart);


    const [selectedSize, setSelectedSize] = useState(null);

    useEffect(() => {
        if (product?.variations?.length > 0) {
            setSelectedSize(product.variations[0].attribute_value.id);
            setLoading(false);
        }
    }, [product]);


    const handleSizeChange = (e) => {
        const newSize = e.target.value;
        setSelectedSize(newSize);
    };


    const getSelectedVariation = () => {
        return product?.variations.find(variation => variation.attribute_value.id == selectedSize);
    };

    const selectedVariation = getSelectedVariation();



    const addToCart = (item) => {

        const existingItemIndex = cart.findIndex(cartItem =>
            cartItem.product_id === item.product_id && cartItem.attribute_id === item.attribute_id
        );

        if (existingItemIndex >= 0) {
            const updatedCart = [...cart];
            updatedCart[existingItemIndex] = {
                ...updatedCart[existingItemIndex],
                quantity: updatedCart[existingItemIndex].quantity + item.quantity
            };
            setCart(updatedCart)
        } else {
            setCart([...cart, item]);
        }
        document.getElementById('my-drawer-4').checked = true;
    };

    const buyNow = (item) => {
        setCart([item]);
        navigate('/checkout')
    }

    const [cartQty, setCartQty] = useState(1);
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        setCartQty(newQuantity);
    };

    const sanitizedHTML = DOMPurify.sanitize(product?.description);


    const sizeOrder = ['XL', 'L', 'M', 'S'];

  // Ensure product and variations are defined before sorting
  const sortedVariations = product?.variations
    ? [...product.variations].sort((a, b) => {
        return sizeOrder.indexOf(a.attribute_value.name) - sizeOrder.indexOf(b.attribute_value.name);
      })
    : [];

    return (
        <>

            <Helmet>
                <title>{product?.title || 'Single Product'} | The White</title>
            </Helmet>

            <Header />
            <div className='container mx-auto px-5
    py-16 grid md:grid-cols-2 grid-cols-1'>
                <div className='md:mb-0 mb-10'>

                    <ProductGallerySlider thumb={product?.thumbnail} gallery={product?.galleries} />
                </div>

                <div className=''>
                    {
                        !loading ? <h1 className='poppins font-semibold md:text-6xl sm:text-4xl text-3xl'>{product?.title}</h1> :
                            <div className="skeleton h-4 w-60 my-4"></div>
                    }


                    <p className='poppins flex items-center text-md text-red-500 mb-3'> <RiFireLine /> 110 sold in last 24 hours</p>

                    <div className='aldrich-regular flex gap-4 text-3xl font-bold mb-3'>
                        {
                            loading ? <div className="skeleton h-4 w-20 my-4"></div> : <h3 className='text-gray-400'>
                                {
                                    selectedVariation?.sale_price && <del>TK {selectedVariation?.regular_price}</del>
                                }

                            </h3>
                        }

                        {
                            loading ? <div className="skeleton h-4 w-20"></div> : selectedVariation?.sale_price ?
                                <h3>
                                    TK {selectedVariation?.sale_price}
                                </h3> : <h3>
                                    TK {selectedVariation?.regular_price}
                                </h3>
                        }

                    </div>

                    {
                        !loading ? <p className='montserrat font-semibold text-gray-500 mb-3'>{product?.short_description}</p> : <div className="skeleton h-4 w-20 my-4"></div>
                    }


                    <div className='flex justify-between'>
                        <h4 className='poppins font-semibold text-lg'>Size</h4>

                        <span className='poppins flex gap-2 items-center text-gray-400 cursor-pointer hover:text-red-500' onClick={() => document.getElementById('size-chart').showModal()}><CgRuler className='text-2xl' />Size Chart</span>

                        <dialog id="size-chart" className="modal">
                            <div className="modal-box p-0">
                                <img src={sizeChart} alt="" />
                            </div>
                            <form method="dialog" className="modal-backdrop">
                                <button>close</button>
                            </form>
                        </dialog>
                    </div>

                    <div className='flex mb-10 gap-4 custom-sizes'>

                        {loading ? (
                            // Render skeleton loaders while loading
                            Array.from({ length: 2 }).map((_, index) => (
                                <label key={index}>
                                    <div className="skeleton h-4 w-20 my-4"></div>
                                </label>
                            ))
                        ) : (
                            // Render actual product variations after loading
                            sortedVariations?.map((variation) => (
                                <label key={variation.attribute_value.id}>
                                    <input
                                        type="radio"
                                        value={variation.attribute_value.id}
                                        onChange={handleSizeChange}
                                        name="size"
                                        className="invisible"
                                        checked={selectedSize == variation.attribute_value.id}
                                    />
                                    <span className="poppins w-10 h-10 flex justify-center items-center border-2 border-black font-semibold text-xl uppercase cursor-pointer">
                                        {variation.attribute_value.name}
                                    </span>
                                </label>
                            ))
                        )}


                    </div>

                    <div className='sm:flex block gap-4 mb-10'>
                        <div className='flex items-center gap-2 md:mb-0 mb-5'>
                            <button onClick={qtyminus} className='w-7 h-7 border-2 border-black text-2xl font-bold flex justify-center items-end hover:bg-black hover:text-white transition-all'>-</button>
                            <span className='poppins text-xl font-semibold'>{cartqty}</span>
                            <button onClick={qtyplus} className='w-7 h-7 border-2 border-black text-2xl font-bold flex justify-center items-end hover:bg-black hover:text-white transition-all'>+</button>
                        </div>

                        <button onClick={() => addToCart({ product_id: product.id, price: selectedVariation?.sale_price ? selectedVariation?.sale_price : selectedVariation?.regular_price, quantity: cartqty, attribute_id: selectedSize })} className='btn uppercase bg-black text-white border-2 border-black hover:bg-black hover:text-white poppins md:mr-0 mr-5'>Add to cart</button>

                        <button onClick={() => buyNow({ product_id: product.id, price: selectedVariation?.sale_price ? selectedVariation?.sale_price : selectedVariation?.regular_price, quantity: cartqty, attribute_id: selectedSize })} className='btn uppercase bg-white text-black border-2 border-black hover:bg-black hover:text-white poppins'>Buy now</button>
                    </div>

                    <div className="collapse collapse-arrow shadow">
                        <input type="checkbox" className="peer" defaultChecked />
                        <div className="collapse-title capitalize poppins font-semibold text-black text-2xl">
                            Description
                        </div>
                        <div className="collapse-content">
                            
                            
                                {!loading ? <p className='poppins font-semibold text-gray-500' dangerouslySetInnerHTML={{ __html: sanitizedHTML }}></p> : <div className="flex flex-col gap-4">
                                    <div className="skeleton h-4 w-20"></div>
                                    <div className="skeleton h-4 w-28"></div>
                                </div>}
                        </div>
                    </div>


                    <div className="collapse collapse-arrow shadow">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title capitalize poppins font-semibold text-black text-2xl">
                            RETURN/EXCHANGE & REFUNDS
                        </div>
                        <div className="collapse-content">
                            <p className='poppins font-semibold text-gray-500'>
                                Any product would qualify as a Free Return and Exchange if it meets any of the following condition(s): <br /><br />
                                * Products with major quality defects <br />
                                * Products damaged during shipment <br />
                                * Wrong product, size, or color <br />
                                * Product lost in shipment <br /><br /><br />

                                (For any return or exchange requests outside these specified conditions, including changes of mind or other personal reasons, a Return or Exchange fee equivalent to the original delivery charge will apply.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SingleProduct