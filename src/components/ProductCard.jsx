import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);

    const isNewProduct = (createdAt) => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const timeDifference = now - createdDate;
        const daysDifference = timeDifference / (1000 * 3600 * 2); // Convert milliseconds to days
        return daysDifference <= 3;
    };

    return (
        <div className="card card-compact shadow-lg rounded-lg">
            <Link to={`/single-product/${product.slug}`}>
                <figure className='relative' onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    {
                        isHovered ? <img src={`https://adminpanel.thewhitebd.com/uploads/product-gallery/${product.galleries[0].image_path}`} className='2xl:h-[600px] sm:h-[500px] h-[200px] object-cover w-full' alt="Shoes" /> : <img src={`https://adminpanel.thewhitebd.com/uploads/product-thumbs/${product.thumbnail}`} className='2xl:h-[600px] sm:h-[500px] h-[200px] object-cover w-full opacity-100 transition-opacity duration-300 ease-in-out' alt="Shoes" />

                    }
                    <ul className='absolute left-0 bottom-2'>
                        {
                            isNewProduct(product.created_at) && <div className='bg-white text-black shadow-lg caveat px-2 mb-2'>NEW</div>
                        }

                        {
                            product.variations[0].sale_price && <div className='bg-white text-black shadow-lg montserrat px-2 mb-2'>SALE</div>
                        }

                    </ul>

                </figure>
            </Link>

            <div className="card-body justify-between">
                <Link to={`/single-product/${product.slug}`} className="card-title poppins sm:text-xl text-sm">{product.title}</Link>
                <p className='sm:text-sm text-xs montserrat w-4/6 sm:block hidden'>{product.short_description}</p>
                <h4 className="aldrich-regular font-bold sm:text-lg text-xs">
                    BDT
                    {
                        product.variations[0].sale_price && <del className='text-gray-400 mr-2'>{product.variations[0].regular_price}</del>
                    }

                    {product.variations[0].sale_price ? product.variations[0].sale_price : product.variations[0].regular_price}
                </h4>

                <div className="card-actions lg:absolute right-5 bottom-5 justify-end">
                    <Link to={`/single-product/${product.slug}`} className='btn sm:px-4 px-2 sm:py-2 py-1 border-2 border-black font-bold hover:bg-white hover:text-black hover:border-black rounded-none bg-black text-white uppercase sm:text-sm text-xs shadow-lg shadow-zinc-600 sm:w-auto w-full'>Select Option</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard