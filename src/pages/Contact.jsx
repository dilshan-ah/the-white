import React, { useRef, useState } from 'react'
import Header from '../components/header'
import Footer from '../components/Footer'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { RiTiktokLine } from 'react-icons/ri';
import { FiYoutube } from 'react-icons/fi';
import { FaXTwitter } from 'react-icons/fa6';
import { SlSocialLinkedin } from 'react-icons/sl';
import WhatsappChat from '../components/WhatsappChat';

const Contact = () => {

    const form = useRef();

    const [emailSent, SetEmailSent] = useState(false)

    useEffect(() => {
        let timer;
        if (emailSent) {
            timer = setTimeout(() => {
                SetEmailSent(false);
            }, 3000); // 1 second
        }
        return () => clearTimeout(timer); // Cleanup the timer on unmount or when emailSent changes
    }, [emailSent]);

    const sendMail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_vxotkvs', 'template_movqhim', form.current, {
                publicKey: 'lwvBJV_2Oe6d70C4o',
            })
            .then(
                () => {
                    SetEmailSent(true);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                },
            );
        e.target.reset()
    }

    return (
        <>
            <Helmet>
                <title>Contact | The White</title>
            </Helmet>

            <Header />

            <div className='contact-banner py-48 mt-10 relative flex justify-center'>
                <h1 className='poppins font-semibold sm:text-6xl text-4xl px-5 uppercase text-white z-40 relative'>Contact us</h1>
                <div className='w-full h-full bg-black/50 absolute top-0 left-0'></div>
            </div>

            <div className='container mx-auto py-20 grid lg:grid-cols-2 gap-20 px-5'>
                <div>
                    <h3 className='poppins font-semibold text-3xl uppercase mb-10 md:text-start text-center'>
                        GET In touch
                    </h3>
                    <form ref={form} onSubmit={sendMail}>
                        <input type="text" name="name" placeholder='Your Name' className='poppins font-semibold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />
                        <input type="email" name="email" placeholder='Your Email' className='poppins font-semibold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />
                        <input type="text" name="subject" placeholder='Enter the subject' className='poppins font-semibold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />

                        <textarea name="message" rows={7} placeholder='Enter your message' className='poppins font-semibold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded'></textarea>

                        <button className="btn w-full rounded-none hover:bg-transparent hover:text-black border-2 border-black hover:border-black grostesk px-5 py-3 font-bold bg-black text-white">Send Message</button>
                    </form>

                    {
                        emailSent && <div className="alert bg-black text-white w-max fixed right-10 bottom-10">
                            <span className='grostesk font-bold'>Message sent successfully.</span>
                        </div>
                    }
                </div>

                <div>
                    <h3 className='poppins font-semibold text-xl uppercase mb-4'>
                        OUR DISPLAY CENTER
                    </h3>

                    <p className='para montserrat font-semibold'>UNITED STATES</p>
                    <p className='para mb-10 montserrat font-semibold'>
                    5100, Kings Plaza Shopping Center,<br /> Brooklyn,<br /> New York - 11234
                    </p>

                    <p className='para montserrat font-semibold'>UNITED ARAB EMIRATES</p>
                    <p className='para montserrat mb-10 font-semibold'>
                    38B, Al Ghurair Center,<br /> Al Rigga Road, Deira,<br /> Dubai
                    </p>


                    <p className='para montserrat font-semibold'>BANGLADESH</p>
                    <p className='para montserrat mb-10 font-semibold'>
                    Ground Floor, North Court,<br /> Jamuna Future Park,<br />  Progoti Shoroni, Kuril,<br />
                    Dhaka - 1229</p>


                    <h3 className='poppins font-semibold text-xl uppercase mb-4'>
                        Social Media
                    </h3>

                    <div className='flex flex-wrap gap-5 mb-10'>
                        <Link to='https://www.facebook.com/thewhite.apparel' target='_blank' className='btn rounded-full bg-black text-white p-0 w-10 min-h-10 h-10 hover:bg-white hover:text-black border-2 border-black hover:border-black'>
                            <FaFacebookF className='text-lg' />
                        </Link>

                        <Link to='https://www.instagram.com/the_white.bd/?hl=en' target='_blank' className='btn rounded-full bg-black text-white p-0 w-10 min-h-10 h-10 hover:bg-white hover:text-black border-2 border-black hover:border-black'>
                            <FaInstagram className='text-lg' />
                        </Link>

                        <Link to='https://wa.me/+8801779744512' target='_blank' className='btn rounded-full bg-black text-white p-0 w-10 min-h-10 h-10 hover:bg-white hover:text-black border-2 border-black hover:border-black'>
                            <FaWhatsapp className='text-lg' />
                        </Link>

                        <Link to='https://www.tiktok.com/@the.white.bd' target='_blank' className='btn rounded-full bg-black text-white p-0 w-10 min-h-10 h-10 hover:bg-white hover:text-black border-2 border-black hover:border-black'>
                            <RiTiktokLine className='text-lg' />
                        </Link>

                        <Link to='https://www.youtube.com/@TheWHITEsquad112' target='_blank' className='btn rounded-full bg-black text-white p-0 w-10 min-h-10 h-10 hover:bg-white hover:text-black border-2 border-black hover:border-black'>
                            <FiYoutube className='text-lg' />
                        </Link>

                        <Link to='https://x.com/TheWhiteBD' target='_blank' className='btn rounded-full bg-black text-white p-0 w-10 min-h-10 h-10 hover:bg-white hover:text-black border-2 border-black hover:border-black'>
                            <FaXTwitter className='text-lg' />
                        </Link>

                        <Link to='https://www.linkedin.com/company/thewhitebd/' target='_blank' className='btn rounded-full bg-black text-white p-0 w-10 min-h-10 h-10 hover:bg-white hover:text-black border-2 border-black hover:border-black'>
                            <SlSocialLinkedin className='text-lg' />
                        </Link>
                    </div>

                    <h3 className='poppins font-semibold text-xl uppercase mb-4'>
                        Contact Information
                    </h3>

                    <h3 className='poppins font-semibold text-base uppercase mb-4'>
                        Email Us
                    </h3>

                    <p className='para capitalize mb-2'>
                        For Product questions/concerns, brand information & general inquiries
                    </p>

                    <a href="mailto:info@thewhitebd.com" className='text-lg font-semibold grostesk underline'>info@thewhitebd.com</a>

                    <h3 className='poppins font-semibold text-base uppercase mb-4 mt-4'>
                        Phone Number
                    </h3>

                    <p className='para capitalize mb-2'>
                        For Product questions/concerns, brand information & general inquiries
                    </p>

                    <a href="tel:+8809697377876" className='text-lg font-semibold grostesk underline block'>+8809697377876</a>

                    <a href="tel:+8809697437299" className='text-lg font-semibold grostesk underline'>+8809697437299</a>
                </div>
            </div>

            <h1 className='poppins font-semibold md:text-6xl text-3xl uppercase text-center mb-10 z-50 relative'>You can also find us at!</h1>


            <div className='container mx-auto grid lg:grid-cols-3 gap-10 px-5'>
                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3028.895774668941!2d-73.92262692508059!3d40.610123143847886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24343ab3c4adf%3A0xfb7370c49a9db106!2sKings%20Plaza%20Shopping%20Center!5e0!3m2!1sen!2sbd!4v1716058803265!5m2!1sen!2sbd" className='w-full' height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

                </div>

                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.0954686871282!2d55.314925474156354!3d25.267373728857002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5ccbba570929%3A0xd87c839b0da90455!2sAl%20Ghurair%20Centre!5e0!3m2!1sen!2sbd!4v1716059034941!5m2!1sen!2sbd" className='w-full' height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

                </div>

                <div>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.14208650106!2d90.42166437410268!3d23.813545986351535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c62fb95f16c1%3A0xb333248370356dee!2sJamuna%20Future%20Park!5e0!3m2!1sen!2sbd!4v1716059320465!5m2!1sen!2sbd" className='w-full' height={450} style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

                </div>
            </div>

            <Footer />
            <WhatsappChat/>
        </>
    )
}

export default Contact