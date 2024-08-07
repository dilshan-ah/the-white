import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {

    const [isHovered, setIsHovered] = useState(false);

    const isNewProduct = (createdAt) => {
        const createdDate = new Date(createdAt);
        const now = new Date();
        const timeDifference = now - createdDate;
        const daysDifference = timeDifference / (1000 * 3600 * 24); // Convert milliseconds to days
        return daysDifference <= 3;
    };

    return (
        <div className="card card-compact shadow-lg rounded-lg">
            <Link to={`/single-product/${product.slug}`}>
                <figure className='relative' onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}>
                    {
                        isHovered ? <img src={`https://adminpanel.thewhitebd.com/uploads/product-gallery/${product.galleries[0].image_path}`} className='h-[400px] object-cover w-full' alt="Shoes" /> : <img src={`https://adminpanel.thewhitebd.com/uploads/product-thumbs/${product.thumbnail}`} className='h-[400px] object-cover w-full opacity-100 transition-opacity duration-300 ease-in-out' alt="Shoes" />

                    }
                    <ul className='absolute left-0 top-0'>
                        {
                            isNewProduct(product.created_at) && <div className='bg-black text-white caveat px-2 mb-2'>NEW</div>
                        }

                        {
                            product.variations[0].sale_price && <div className='bg-black text-white caveat px-2 mb-2'>SALE</div>
                        }

                    </ul>

                </figure>
            </Link>

            <div className="card-body">
                <Link to={`/single-product/${product.slug}`} className="card-title grostesk">{product.title}</Link>
                <p>{product.short_description}</p>
                <h4 className="grostesk font-bold text-lg">
                    BDT
                    {
                        product.variations[0].sale_price && <del className='text-gray-400 mr-2'>{product.variations[0].regular_price}</del>
                    }

                    {product.variations[0].sale_price ? product.variations[0].sale_price : product.variations[0].regular_price}
                </h4>

                <div className="card-actions sm:absolute right-5 bottom-5 justify-end">
                    <Link to={`/single-product/${product.slug}`} className='btn px-4 py-2 border-2 border-black font-bold hover:bg-white hover:text-black hover:border-black rounded-none bg-black text-white uppercase'>Select Option</Link>
                </div>
            </div>
        </div>
    )
}

export default ProductCard