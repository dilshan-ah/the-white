import React from 'react'
import Header from '../components/header'

import abtimgone from '../assets/welcome.webp'
import abtimgtwo from '../assets/2148176505.jpg'
import abtimgthree from '../assets/multiverse-copy.webp'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'
import WhatsappChat from '../components/WhatsappChat'

const About = () => {
    return (
        <>
            <Helmet>
                <title>About | The White</title>
            </Helmet>

            <Header />

            <div className='about-banner py-48 mt-10 relative flex justify-center'>
                <h1 className='poppins font-bold sm:text-6xl text-4xl px-5 uppercase text-white z-40 relative'>About us</h1>
                <div className='w-full h-full bg-black/50 absolute top-0 left-0'></div>
            </div>

            <div className='container mx-auto px-5 py-20'>
                <h3 className='poppins font-semibold text-3xl uppercase mb-10 text-center'>
                    Welcome to The White
                </h3>

                <p className='montserrat text-center font-semibold text-gray-500 mb-10'> a dream of three passionate individuals.
                    Three dedicated individuals – Mr. Rashedul Islam Sohan, Mr. Nahin Ibn Zaman, and Mr. Khaled Mahmud Tajbi, despite coming from different educational backgrounds, share a common dream of redefining the apparel industry in Bangladesh. Our journey began with a simple question: </p>

                <h4 className='poppins font-bold text-lg capitalize mb-10 text-center'>???...why not bring the trendy, stylish drop-shoulder T-shirts and hoodies that have taken the overseas market by storm to our homeland...???</h4>
            </div>

            <div className='container mx-auto px-5 py-10 flex flex-col md:flex-row gap-10'>
                <div className='md:w-1/2 w-full'>
                    <img src={abtimgone} alt="" />
                </div>

                <div className='md:w-1/2 w-full flex flex-col justify-center'>
                    <h3 className='poppins font-semibold text-3xl uppercase mb-10'>
                        Our Journey
                    </h3>

                    <p className='montserrat font-semibold text-gray-500 mb-10'>Starting an apparel business was not an easy feat, especially given that none of us hail from a textile background. Rashedul, Nahin, and Khaled, all students from different private universities in Bangladesh, ventured into this industry armed only with our enthusiasm, research, and a keen understanding of market needs. We recognized a significant demand for export-quality, trendy clothing in Bangladesh, and we decided to fill that gap with our innovative approach.  </p>
                </div>
            </div>

            <div className='container mx-auto px-5 py-10 flex flex-col md:flex-row gap-10'>
                <div className='w-full'>
                    <h3 className='poppins font-semibold text-3xl uppercase mb-10 text-center'>
                        Our Roles
                    </h3>

                    <div className='grid md:grid-cols-3 gap-10'>
                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title montserrat">Rashedul Islam Sohan</h2>
                                <p className='montserrat'>Chief Executive Officer, CEO</p>
                                <p className='grostesk'>As the founder of The White, Rashedul oversees product sourcing, design, manufacturing, and customer relations. His visionary leadership and attention to detail ensure that our products meet the highest standards of quality and style. </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title montserrat">Nahin Ibn Zaman</h2>
                                <p className='montserrat'>Chief Operating and Financial Officer, COO/CFO</p>
                                <p className='grostesk'>Nahin handles the financials, social media, technology, and overall operations. His expertise in these areas ensures smooth and efficient business operations, from marketing to financial management. </p>
                            </div>
                        </div>

                        <div className="card bg-base-100 shadow-xl">
                            <div className="card-body items-center text-center">
                                <h2 className="card-title montserrat">Khaled Mahmud Tajbi</h2>
                                <p className='montserrat'>Head of Supply Chain</p>
                                <p className='grostesk'>Khaled is in charge of logistics and distribution, ensuring that our products reach our customers timely and in perfect condition. His meticulous planning and execution make sure that The White’s supply chain runs seamlessly. </p>
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <div className='container mx-auto px-5 py-10 flex flex-col md:flex-row gap-10'>
                <div className='md:w-1/2 w-full'>
                    <img src={abtimgtwo} alt="" />
                </div>

                <div className='md:w-1/2 w-full flex flex-col justify-center'>
                    <h3 className='poppins font-semibold text-3xl uppercase mb-10'>
                        Our Mission
                    </h3>

                    <p className='montserrat font-semibold text-gray-500 mb-10'>Our mission at The White is to revolutionize the Bangladeshi apparel market by introducing premium quality, stylish, and trendy drop-shoulder T-shirts and hoodies. We aim to blend international fashion trends with local market preferences, ensuring that our customers always have access to the latest and best in fashion.  </p>
                </div>
            </div>

            <div className='container mx-auto px-5 py-10 flex flex-col-reverse md:flex-row gap-10'>

                <div className='md:w-1/2 w-full flex flex-col justify-center'>
                    <h3 className='poppins font-semibold text-3xl uppercase mb-10'>
                        Our Vision
                    </h3>

                    <p className='montserrat font-semibold text-gray-500 mb-10'>We envision The White as a leading name in both local and international fashion markets. Our goal is to expand our product range, innovate continually, and maintain our commitment to excellence. We aspire to be recognized for our quality, style, and sustainability, setting new standards in the apparel industry.  </p>
                </div>

                <div className='md:w-1/2 w-full'>
                    <img src={abtimgthree} alt="" />
                </div>
            </div>

            <div className='container mx-auto px-5 py-10 flex flex-col md:flex-row gap-10'>
                <div className='w-full'>
                    <h3 className='poppins font-semibold text-3xl uppercase mb-10 text-center'>
                        Looking Ahead
                    </h3>

                    <p className='montserrat font-semibold text-gray-500 mb-10 text-center'>As we move forward, we are dedicated to constant innovation and growth. We plan to collaborate with top designers and industry experts to bring fresh and exciting products to our customers. Sustainability and ethical practices will remain at the core of our operations, ensuring that our fashion footprint is environmentally and socially responsible. </p>

                    <p className='montserrat font-semibold text-gray-500 mb-10 text-center'>Thank you for being a part of The White's journey. Together, let's redefine fashion and create a brand that stands for quality, style, and innovation. </p>

                    <p className='montserrat font-bold mb-10 text-center text-xl'>Welcome to The White, a Mul TEE Verse of Drop Tees and Hoodies! </p>
                </div>
            </div>

            <Footer />
            <WhatsappChat/>
        </>
    )
}

export default About