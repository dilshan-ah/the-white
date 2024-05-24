import React from 'react'
import review from '../assets/review.jpg'
import { FaQuoteLeft } from "react-icons/fa";
import { FaQuoteRight } from "react-icons/fa";

const ReviewCard = () => {
    return (
        <div className='bg-slate-200 p-8 rounded shadow relative'>

            <FaQuoteLeft className='absolute left-2 top-6'/>

            <p className='text-gray-500 text-sm mb-5'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae atque tempore est expedita exercitationem nemo voluptas vero qui! Incidunt, numquam.</p>

            <div className='flex items-center gap-4'>
                <img src={review} className='w-10 rounded-full' alt="" />

                <div>
                    <h4 className='text-lg grostesk font-bold'>Md Akbar Hossain</h4>
                    <p className='text-gray-500 text-sm'>Happy client</p>
                </div>
            </div>

            <FaQuoteRight className='absolute right-2 bottom-0 top-0 my-auto'/>
        </div>
    )
}

export default ReviewCard