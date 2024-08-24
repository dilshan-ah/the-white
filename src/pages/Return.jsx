import React from 'react'
import Header from '../components/header'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'

const Return = () => {
    return (
        <>
            <Helmet>
                <title>Return & Refund policy | The White</title>
            </Helmet>

            <Header />
            <div className='contact-banner py-48 mt-10 relative flex justify-center'>
                <h1 className='poppins font-semibold sm:text-6xl text-4xl uppercase text-white z-40 px-5 relative'>Return and Exchange Policy</h1>
                <div className='w-full h-full bg-black/50 absolute top-0 left-0'></div>
            </div>

            <div className='container mx-auto px-5 py-20'>
                <h3 className='poppins font-semibold text-3xl uppercase mb-10 text-center'>
                    At THE WHITE
                </h3>

                <p className='montserrat text-center font-semibold text-gray-500 mb-10'>we strive to ensure you are completely satisfied with your purchase. To facilitate a smooth shopping experience, we request that you review our Return and Exchange Policy outlined below.</p>
            </div>

            <div className='container mx-auto px-5 py-10 flex flex-col md:flex-row gap-10'>

                <div className='md:w-1/2 w-full shadow-md p-5'>
                    <h3 className='poppins font-semibold text-3xl uppercase mb-10'>
                        Product Inspection Upon Delivery
                    </h3>

                    <p className='montserrat font-semibold text-gray-500 mb-10'>We kindly ask our customers to inspect their products thoroughly during delivery. Please check the items for any issues related to size, quality, or finishing before accepting them from the delivery man. </p>

                    <p className='montserrat font-semibold text-gray-500 mb-10'>Any product would qualify as a Free Return and Exchange if it meets any of the following condition(s):</p>

                    <ul className='montserrat font-semibold text-gray-500'>
                        <li className='mb-3'>* Products with major quality defects</li>
                        <li className='mb-3'>* Products damaged during shipment</li>
                        <li className='mb-3'>* Wrong product, size, or color</li>
                        <li className='mb-10'>* Product lost in shipment</li>
                    </ul>

                    <p className='montserrat font-semibold text-gray-500 mb-10'>(For any return or exchange requests outside these specified conditions, including changes of mind or other personal reasons, a Return or Exchange fee equivalent to the original delivery charge will apply.)
                    </p>
                </div>

                <div className='md:w-1/2 w-full '>
                    <div className='shadow-md p-5 mb-14'>
                        <h3 className='poppins font-semibold text-3xl uppercase mb-10'>
                            Free Return Policy
                        </h3>

                        <p className='montserrat font-semibold text-gray-500 mb-10'>In the event you wish to return a product, we offer the following options: Immediate Return: You may return any product immediately upon delivery. The return must be communicated and arranged with the delivery man at the time of delivery.
                        </p>
                    </div>

                    <div className='shadow-md p-5'>
                        <h3 className='poppins font-semibold text-3xl uppercase mb-10'>
                            Free Exchange Policy
                        </h3>

                        <p className='montserrat font-semibold text-gray-500 mb-10'>You may request an exchange immediately. Our delivery man will assist you in initiating this process on the spot; we offer the following options: For all the successful returns, we will reship the rightful product to you(based on availability). If any returns do not meet policy requirements, the items will be returned to you immediately.
                        </p>
                    </div>
                </div>
            </div>

            <div className='container mx-auto px-5 py-20'>
                <h3 className='poppins font-semibold text-3xl uppercase mb-10 text-center'>
                    Note
                </h3>

                <p className='montserrat text-center font-semibold text-gray-500 mb-10'>Returns and exchanges can only be processed if the delivery man remains present. Once the delivery is completed and the man has left, we cannot accept any complaints or requests for exchanges or returns.</p>

                <p className='montserrat text-center font-semibold text-gray-500 mb-10'>Refund Policy We have no policy for refund, and the policy is only for exchange/change by another product.
                </p>

                <p className='montserrat text-center font-semibold text-gray-500 mb-10'>We appreciate your understanding and cooperation in adhering to these policies designed to ensure prompt and efficient service. For any further assistance or queries, don't hesitate to get in touch with our Customer Service team at <a href="callto:+8809697377876" className='link text-black'>+8809697377876</a>, <a href="callto:+8809697437299" className='link text-black'>+8809697437299</a> (Lines are open 24/7), or email <a href="mailto:info@thewhitebd.com" className='link text-black'>info@thewhitebd.com</a></p>
            </div>

            <Footer />
        </>
    )
}

export default Return