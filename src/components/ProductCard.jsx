import React, { useState } from 'react'
import { CgShoppingBag } from 'react-icons/cg'
import blacktee from '../assets/black.png'
import ttwo from '../assets/t-two.jpg'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="card card-compact shadow-lg rounded-lg">
            <figure className='relative' onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}>
                {
                    isHovered ? <img src={`http://127.0.0.1:8000/uploads/product-gallery/${product.galleries[0].image_path}`} className='h-[400px] object-cover w-full' alt="Shoes" /> :<img src={`http://127.0.0.1:8000/uploads/product-thumbs/${product.thumbnail}`} className='h-[400px] object-cover w-full opacity-100 transition-opacity duration-300 ease-in-out' alt="Shoes" />
                        
                }
                <div className='bg-black text-white caveat absolute left-0 top-0 px-2'>NEW</div>
            </figure>
            <div className="card-body">
                <Link to={`/single-product/${product.slug}`} className="card-title grostesk">{ product.title }</Link>
                <p>{ product.short_description }</p>
                <h4 className="grostesk font-bold text-lg"><h4 className="grostesk font-bold text-lg">BDT <del className='text-gray-400'>{product.variations[0].regular_price}</del> {product.variations[0].sale_price}</h4></h4>

                <div className="card-actions absolute right-5 bottom-5 justify-end">
                    <button className='btn px-4 py-2 border-2 border-black font-bold hover:bg-white hover:text-black hover:border-black rounded-none bg-black text-white uppercase'>Buy now</button>
                </div>
            </div>
        </div>
    )
}

export default ProductCard