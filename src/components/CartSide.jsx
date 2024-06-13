import React, { useContext, useEffect, useState } from 'react'
import { IoClose } from "react-icons/io5";

import CartItem from './CartItem';
import { Link } from 'react-router-dom';
import { DataContext } from '../../context/Context';

const CartSide = () => {

    const { cart, setCart } = useContext(DataContext)

    const removeFromCart = (index) => {
        const updatedCart = [...cart];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        updateLocalStorage(updatedCart);
    };

    const updateLocalStorage = (updatedCart) => {
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    const handleQtyChange = (updatedItem) => {
        const updatedCart = cart.map(item =>
            item.product_id === updatedItem.product_id && item.attribute_id === updatedItem.attribute_id
                ? updatedItem
                : item
        );
        setCart(updatedCart);
    };

    const calculateTotalPrice = () => {
        return cart.reduce((total, item) => total + (parseFloat(item.price) * item.quantity), 0).toFixed(2);
    };

    const handleAttributeChange = (updatedItem, attr_id) => {

        const updatedCart = cart.map(item =>
            item.product_id === updatedItem.product_id
                ? updatedItem
                : item
        );
        
        setCart(updatedCart);
    };



    return (
        <div className="drawer-side z-50 overflow-hidden">
            <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>

            <div className="menu p-0 w-80 min-h-full bg-base-200 text-base-content flex flex-col">

                <div className='flex gap-3 items-center mb-10 px-4 pt-4'>
                    <label htmlFor="my-drawer-4" aria-label="close sidebar" className='btn bg-black text-white p-0 w-12 h-12 border-2 border-black hover:border-black hover:bg-transparent hover:text-black'><IoClose className='text-4xl' /></label>
                    <h1 className='grostesk font-semibold text-2xl'>Cart ({cart.length})</h1>
                </div>

                <div className='flex-1 px-4'>
                    <div className='h-100'>

                        {
                            cart.map((cartitem, index) => (
                                <CartItem key={index} cartItem={cartitem} onQtyChange={handleQtyChange} onAttributeChange={handleAttributeChange} onRemoveCartItem={() => removeFromCart(index)} />
                            ))
                        }

                    </div>

                </div>

                <div className='bg-white rounded-t-2xl p-4'>
                    <div className='card-title grostesk text-right text-black flex justify-between mb-4'>
                        <h4>Total</h4>
                        <h4>TK {calculateTotalPrice()}</h4>
                    </div>

                    <Link to="/checkout" disabled={cart.length == 0 && "disabled"} className='btn w-full bg-black text-white grostesk uppercase rounded-none hover:bg-black'>Checkout</Link>
                </div>

            </div>
        </div>
    )
}

export default CartSide