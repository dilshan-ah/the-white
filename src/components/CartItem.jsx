import React, { useContext, useState } from 'react'
import blacktee from '../assets/black.png'
import { useEffect } from 'react';
import { DataContext } from '../../context/Context';
import { Link } from 'react-router-dom';
const CartItem = ({ cartItem, onRemoveCartItem, onAttributeChange, onQtyChange }) => {

    const [cartqty, setCartqty] = useState(1);

    const { allProducts } = useContext(DataContext)

    useEffect(() => {
        setCartqty(cartItem.quantity)
    }, []);

    const qtyplus = () => {
        if (cartqty < 10) {
            setCartqty(prevQty => Math.min(prevQty + 1, 10));
            const updatedCartItem = { ...cartItem }; // Create a copy of the cart item
            updatedCartItem.quantity += 1; // Increment the quantity
            onQtyChange(updatedCartItem); // Update the cart item quantity using the onQtyChange function
        }
    }

    const qtyminus = () => {
        if (cartqty > 1) {
            setCartqty(prevQty => Math.max(prevQty - 1, 1));
            const updatedCartItem = { ...cartItem }; // Create a copy of the cart item
            updatedCartItem.quantity -= 1; // Decrement the quantity
            onQtyChange(updatedCartItem); // Update the cart item quantity using the onQtyChange function
        }
    }

    const handleAttributeChange = (e) => {
        const newAttributeId = e.target.value;
        const updatedCartItem = { ...cartItem, attribute_id: newAttributeId };
        
        onAttributeChange(updatedCartItem, cartItem.attribute_id);
    };
    
    
    



    const product = allProducts.find(product => product.id === cartItem.product_id);

    return (
        <div className="card card-compact w-full bg-base-100 shadow-xl mb-4">
            <div className='flex'>
                <figure className='w-1/2 py-4 pl-4'><img className='rounded' src={`https://adminpanel.thewhitebd.com/uploads/product-thumbs/${product?.thumbnail}`} alt="Shoes" /></figure>
                <div className="card-body w-1/2 flex flex-col justify-center">
                    <h2 className="card-title poppins">{product?.title}</h2>
                </div>
            </div>

            <div className="card-actions justify-between items-center px-4 pt-10">
                <div className='flex items-center gap-2'>
                    <button onClick={qtyminus} className='w-7 h-7 border-2 border-black text-2xl font-bold flex justify-center items-end hover:bg-black hover:text-white transition-all'>-</button>
                    <span className='poppins text-xl font-semibold'>{cartqty}</span>
                    <button onClick={qtyplus} className='w-7 h-7 border-2 border-black text-2xl font-bold flex justify-center items-end hover:bg-black hover:text-white transition-all'>+</button>
                </div>

                <select className="select select-bordered border-2 border-black poppins font-bold text-black uppercase rounded-none" onChange={handleAttributeChange}>
                    {product?.variations.map((variation) => (
                        <option selected={variation.attribute_value.id == cartItem.attribute_id ? 'selected' : null} value={variation.attribute_value.id}>{variation.attribute_value.name}</option>
                    ))}
                </select>
            </div>


            <div className='p-4 flex justify-between items-center grostesk'>
                <Link to={`/single-product/${product?.slug}`} className='btn px-4 py-2 border-2 border-black font-bold bg-white rounded-none hover:bg-black hover:text-white capitalize'>Add another size</Link>
                <h4 className='card-title text-right text-black aldrich-regular'>TK {cartItem.price * cartItem.quantity}</h4>
            </div>

            <button onClick={() => onRemoveCartItem()} className='text-red-500 font-bold text-center mb-3 hover:underline'>Remove item</button>
        </div>
    )
}

export default CartItem