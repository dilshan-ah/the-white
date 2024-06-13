import React, { useContext, useEffect, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/Footer'
import { RiFireLine } from "react-icons/ri";
import { CgRuler } from "react-icons/cg";

import sizeChart from '../assets/size-chart.jpg'
import ProductGallerySlider from '../components/ProductGallerySlider';
import { DataContext } from '../../context/Context';
import { useNavigate, useParams } from 'react-router-dom';

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
        window.location.reload();
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

    return (
        <>
            <Header />
            <div className='container mx-auto px-5
    py-16 grid grid-cols-2'>
                <div className=''>

                    <ProductGallerySlider thumb={product?.thumbnail} gallery={product?.galleries} />
                </div>

                <div className=''>
                    {
                        !loading ? <h1 className='grostesk font-bold text-6xl'>{product?.title}</h1> :
                            <div className="skeleton h-4 w-60 my-4"></div>
                    }


                    <p className='grostesk flex items-center text-md text-red-500 mb-3'> <RiFireLine /> 110 sold in last 24 hours</p>

                    <div className='grostesk flex gap-4 text-3xl font-bold mb-3'>
                        {
                            loading ? <div className="skeleton h-4 w-20 my-4"></div> : <h3 className='text-gray-400'>
                                {
                                    selectedVariation?.sale_price && <del>TK {selectedVariation?.regular_price}</del>
                                }
                                
                            </h3>
                        }

                        {
                            loading ? <div className="skeleton h-4 w-20"></div> ? selectedVariation?.sale_price :
                                <h3>
                                    TK {selectedVariation?.sale_price}
                                </h3>: <h3>
                                    TK {selectedVariation?.regular_price}
                                </h3>
                        }

                    </div>

                    {
                        !loading ? <p className='grostesk font-semibold text-gray-500 mb-3'>{product?.short_description}</p> : <div className="skeleton h-4 w-20 my-4"></div>
                    }


                    <div className='flex justify-between'>
                        <h4 className='grostesk font-semibold text-lg'>Size</h4>

                        <span className='grostesk flex gap-2 items-center text-gray-400 cursor-pointer hover:text-red-500' onClick={() => document.getElementById('size-chart').showModal()}><CgRuler className='text-2xl' />Size Chart</span>

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
                            product?.variations.map((variation) => (
                                <label key={variation.attribute_value.id}>
                                    <input
                                        type="radio"
                                        value={variation.attribute_value.id}
                                        onChange={handleSizeChange}
                                        name="size"
                                        className="invisible"
                                        checked={selectedSize == variation.attribute_value.id}
                                    />
                                    <span className="grostesk w-10 h-10 flex justify-center items-center border-2 border-black font-bold text-xl uppercase cursor-pointer">
                                        {variation.attribute_value.name}
                                    </span>
                                </label>
                            ))
                        )}


                    </div>

                    <div className='flex gap-4 mb-10'>
                        <div className='flex items-center gap-2'>
                            <button onClick={qtyminus} className='w-7 h-7 border-2 border-black text-2xl font-bold flex justify-center items-end hover:bg-black hover:text-white transition-all'>-</button>
                            <span className='grostesk text-xl font-semibold'>{cartqty}</span>
                            <button onClick={qtyplus} className='w-7 h-7 border-2 border-black text-2xl font-bold flex justify-center items-end hover:bg-black hover:text-white transition-all'>+</button>
                        </div>
                        
                        <button onClick={() => addToCart({ product_id: product.id, price: selectedVariation?.sale_price ? selectedVariation?.sale_price:selectedVariation?.regular_price, quantity: cartqty, attribute_id: selectedSize })} className='btn uppercase bg-black text-white border-2 border-black hover:bg-black hover:text-white grostesk'>Add to cart</button>

                        <button onClick={() => buyNow({ product_id: product.id, price: selectedVariation?.sale_price ? selectedVariation?.sale_price:selectedVariation?.regular_price, quantity: cartqty, attribute_id: selectedSize })} className='btn uppercase bg-white text-black border-2 border-black hover:bg-black hover:text-white grostesk'>Buy now</button>
                    </div>

                    <div className="collapse collapse-arrow shadow">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title capitalize grostesk font-bold text-black text-2xl">
                            Description
                        </div>
                        <div className="collapse-content">
                            <p className='grostesk font-semibold text-gray-500'>
                                {!loading ? product?.description : <div className="flex flex-col gap-4">
                                    <div className="skeleton h-4 w-20"></div>
                                    <div className="skeleton h-4 w-28"></div>
                                </div>}
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow shadow">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title capitalize grostesk font-bold text-black text-2xl">
                            Service policy
                        </div>
                        <div className="collapse-content">
                            <p className='grostesk font-semibold text-gray-500'>
                                JeansFellow is a web-based footwear store providing online shopping facilities with an amazing collection of numerous authentic footwear & fashion accessories.  We’re selling quality imported footwear in Bangladesh for the last 6 years.  We import well-finished footwear with the finest material & long durability. So quality is our number one service feature before stepping into the business.
                            </p>
                        </div>
                    </div>

                    <div className="collapse collapse-arrow shadow">
                        <input type="checkbox" className="peer" />
                        <div className="collapse-title capitalize grostesk font-bold text-black text-2xl">
                            RETURN/EXCHANGE & REFUNDS
                        </div>
                        <div className="collapse-content">
                            <p className='grostesk font-semibold text-gray-500'>
                                JeansFellow Footwear facilitates its consumers with an “Open Box Policy’’ which means while receiving the product you can check your parcel at your doorstep.

                                RETURN & EXCHANGE ELIGIBILITY
                                If your product is defective/damaged or incorrect/incomplete at the time of delivery, you can return the product to the delivery agent, claim a refund for the order, or claim an exchange.
                                If the size of a product does not match the one ordered.
                                You cannot return/exchange a product because of a "change of mind".
                                RETURN & EXCHANGE TERMS
                                As we offer Open Box Policy, you should check before receiving a product.
                                The product must be returned in the original and undamaged manufacturer packaging/box.
                                The product must be unused, unworn, and unwashed.
                                The product must include the original tags, user manual, warranty cards (if have any), freebies, and accessories.
                                In the case of an exchange, if the newly selected item is a global product it will take 10-15 working days more to get the exchanged delivery.
                                REFUND POLICY & PROCESS
                                If you paid earlier and are eligible to return the order (As per the Above-Mentioned Eligibility & Terms), you can claim a refund without any hesitation. We will receive your refund claim, after verifying the eligibility from our side you will get the paid amount as a refund within 10 working days from the claim date.
                                If you paid earlier and your ordered item is a global item, you can claim a refund if you do not receive the product within 15 working days. But If there is any unwanted issue such as custom delay, national or international political obstacle and so on, then 10 more working days may take to deliver the product. You cannot claim a refund before the above-mentioned time period.
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