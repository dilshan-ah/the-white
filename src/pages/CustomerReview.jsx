import React, { useContext } from 'react'
import Header from '../components/header'
import { DataContext } from '../../context/Context'
import ReviewCard from '../components/ReviewCard'
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'
import WhatsappChat from '../components/WhatsappChat'

const CustomerReview = () => {

    const { review } = useContext(DataContext)

    return (
        <>

            <Helmet>
                <title>Customer Reviews | The White</title>
            </Helmet>

            <Header />
            <div className='py-48 mt-10 relative flex justify-center'>
                <h1 className='poppins font-semibold sm:text-6xl text-4xl px-5 uppercase text-black z-40 relative'>Customer Reviews</h1>
            </div>

            <div className='container mx-auto px-5 flex flex-wrap mb-20'>
                {review?.map((rvw, index) => (
                    <div className='md:w-1/3 p-5'>
                        <div className='bg-white p-8 rounded shadow-xl relative '>
                            <FaQuoteLeft className='absolute left-2 top-6' />

                            <p className='text-gray-500 text-sm mb-5 montserrat'>{rvw.comment}</p>

                            <div className='flex items-center gap-4'>
                                <img src={`https://adminpanel.thewhitebd.com/uploads/reviews/${rvw.profile_pic}`} className='w-10 rounded-full' alt="" />

                                <div>
                                    <h4 className='text-lg grostesk font-bold'>{rvw.name}</h4>
                                    <p className='text-gray-500 text-sm'>{rvw.subtitle}</p>
                                </div>
                            </div>

                            <FaQuoteRight className='absolute right-2 bottom-0 top-0 my-auto' />
                        </div>
                    </div>
                ))}
            </div>

            <Footer />
            <WhatsappChat/>
        </>
    )
}

export default CustomerReview