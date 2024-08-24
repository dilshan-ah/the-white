import React from 'react'
import Header from '../components/header'
import Footer from '../components/Footer'
import { Helmet } from 'react-helmet'

export const Privacy = () => {
    return (
        <>

            <Helmet>
                <title>Privacy policy | The White</title>
            </Helmet>


            <Header />
            <div className='contact-banner py-48 mt-10 relative flex justify-center'>
                <h1 className='poppins font-semibold sm:text-6xl text-4xl uppercase text-white z-40 px-5 relative'>Privacy Policy</h1>
                <div className='w-full h-full bg-black/50 absolute top-0 left-0'></div>
            </div>

            <div className='container mx-auto px-5 py-20'>
                <h3 className='poppins font-semibold text-3xl uppercase mb-10'>
                    Introduction
                </h3>

                <p className='montserrat font-semibold text-gray-500 mb-10'>Welcome to The White, your trusted t-shirt selling website. We are committed to protecting your privacy and ensuring your personal information is handled with care. This Privacy Policy explains how we collect, use, and protect your personal information when you visit our website and make purchases.</p>

                <h3 className='poppins font-semibold text-3xl uppercase mb-10'>
                    Information We Collect
                </h3>

                <h4 className='poppins font-semibold text-xl uppercase mb-5'>
                    Personal Information
                </h4>

                <p className='montserrat font-semibold text-gray-500 mb-5'>When you make a purchase or create an account on our website, we may collect the following personal information:</p>

                <ul className='montserrat font-semibold text-gray-500 mb-10'>
                    <li>1/ Name</li>
                    <li>2/ Email address</li>
                    <li>3/ Mailing address</li>
                    <li>4/ Phone number</li>
                    <li>5/ Payment information</li>
                </ul>

                <h3 className='poppins font-semibold text-3xl uppercase mb-10'>
                    How We Use Your Information
                </h3>

                <h4 className='poppins font-semibold text-xl uppercase mb-5'>
                    Personal Information
                </h4>

                <p className='montserrat font-semibold text-gray-500 mb-5'>We use your personal information to:</p>

                <ul className='montserrat font-semibold text-gray-500 mb-10'>
                    <li>1/ Process and fulfill your orders</li>
                    <li>2/ Communicate with you about your orders and provide customer support</li>
                    <li>3/ Send you promotional emails and newsletters (you may opt-out at any time)</li>
                    <li>4/ Improve our website and services</li>
                </ul>


                <h3 className='poppins font-semibold text-3xl uppercase mb-5'>
                    Sharing Your Information
                </h3>

                <p className='montserrat font-semibold text-gray-500 mb-5'>We do not sell, trade, or otherwise transfer your personal information to outside parties except in the following circumstances:</p>

                <ul className='montserrat font-semibold text-gray-500 mb-10'>
                    <li>1/ To trusted third-party service providers who assist us in operating our website, conducting our business, or servicing you, so long as those parties agree to keep this information confidential</li>
                    <li>2/ To comply with legal requirements, enforce our site policies, or protect our rights, property, or safety, and the safety of others</li>
                </ul>


                <h3 className='poppins font-semibold text-3xl uppercase mb-5'>
                    Data Security
                </h3>

                <p className='montserrat font-semibold text-gray-500 mb-10'>We implement a variety of security measures to maintain the safety of your personal information. This includes using secure servers and encrypting sensitive information transmitted online. However, no method of transmission over the internet or electronic storage is 100% secure, and we cannot guarantee absolute security.</p>


                <h3 className='poppins font-semibold text-3xl uppercase mb-5'>
                    Cookies
                </h3>

                <p className='montserrat font-semibold text-gray-500 mb-10'>Our website uses cookies to enhance your browsing experience. Cookies are small files that a site or its service provider transfers to your computer’s hard drive through your web browser (if you allow) that enables the site’s or service provider’s systems to recognize your browser and capture and remember certain information. You can choose to disable cookies through your browser settings, but this may affect your ability to use some features of our website.</p>


                <h3 className='poppins font-semibold text-3xl uppercase mb-5'>
                    Your Consent
                </h3>

                <p className='montserrat font-semibold text-gray-500 mb-10'>By using our website, you consent to our Privacy Policy.</p>


                <h3 className='poppins font-semibold text-3xl uppercase mb-5'>
                    Changes to Our Privacy Policy
                </h3>

                <p className='montserrat font-semibold text-gray-500 mb-10'>We reserve the right to update this Privacy Policy at any time. Any changes will be posted on this page, and the date of the latest revision will be indicated at the top of the policy. We encourage you to review this Privacy Policy periodically to stay informed about how we are protecting your information.</p>


                <h3 className='poppins font-semibold text-3xl uppercase mb-5'>
                    Contact Us
                </h3>

                <p className='montserrat font-semibold text-gray-500 mb-5'>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>

                <h5 className='montserrat font-semibold text-gray-500'>The White BD</h5>
                <a href='mailto:info@thewhitebd.com' target='_blank' className='montserrat font-semibold text-gray-500'>info@thewhitebd.com</a><br />
                <a href='callto:+8809697377876' target='_blank' className='montserrat font-semibold text-gray-500'>+8809697377876</a>

                <p className='montserrat font-semibold text-gray-500 mb-5'>Thank you for choosing The White BD. We value your trust and are committed to protecting your privacy.</p>
            </div>
            <Footer />
        </>
    )
}
