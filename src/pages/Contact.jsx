import React, { useRef, useState } from 'react'
import Header from '../components/header'
import shopbanner from '../assets/shop.jpeg'
import Footer from '../components/Footer'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { useEffect } from 'react';

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
            <Header />

            <div className='contact-banner py-48 mt-10 relative flex justify-center'>
                <h1 className='grostesk font-bold text-6xl uppercase text-white z-50 relative'>Contact us</h1>
                <div className='w-full h-full bg-black/50 absolute top-0 left-0'></div>
            </div>

            <div className='container mx-auto py-20 grid grid-cols-2 gap-20'>
                <div>
                    <h3 className='grostesk font-bold text-3xl uppercase mb-10'>
                        GET In touch
                    </h3>
                    <form ref={form} onSubmit={sendMail}>
                        <input type="text" name="name" placeholder='Your Name' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />
                        <input type="email" name="email" placeholder='Your Email' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />
                        <input type="text" name="subject" placeholder='Enter the subject' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded' />

                        <textarea name="message" rows={7} placeholder='Enter your message' className='grostesk font-bold w-full outline-none border-2 border-black px-5 py-3 mb-5 rounded'></textarea>

                        <button className="btn w-full rounded-none hover:bg-transparent hover:text-black border-2 border-black hover:border-black grostesk px-5 py-3 font-bold bg-black text-white">Send Message</button>
                    </form>

                    {
                        emailSent && <div className="alert bg-black text-white w-max fixed right-10 bottom-10">
                        <span className='grostesk font-bold'>Message sent successfully.</span>
                      </div>
                    }
                </div>

                <div>
                    <h3 className='grostesk font-bold text-xl uppercase mb-4'>
                        Our address
                    </h3>

                    <p className='para mb-10'>
                        99/A Kichu akta road,<br />
                        Bhola,<br />
                        Bangladesh
                    </p>

                    <h3 className='grostesk font-bold text-xl uppercase mb-4'>
                        Social Media
                    </h3>

                    <div className='flex gap-5 mb-10'>
                        <Link to='https://facebook.com' target='_blank' className='btn rounded-full bg-black text-white p-0 w-10 min-h-10 h-10 hover:bg-white hover:text-black border-2 border-black hover:border-black'>
                            <FaFacebookF className='text-lg' />
                        </Link>

                        <Link className='btn rounded-full bg-black text-white p-0 w-10 min-h-10 h-10 hover:bg-white hover:text-black border-2 border-black hover:border-black'>
                            <FaInstagram className='text-lg' />
                        </Link>

                        <Link className='btn rounded-full bg-black text-white p-0 w-10 min-h-10 h-10 hover:bg-white hover:text-black border-2 border-black hover:border-black'>
                            <FaWhatsapp className='text-lg' />
                        </Link>
                    </div>

                    <h3 className='grostesk font-bold text-xl uppercase mb-4'>
                        Contact Information
                    </h3>

                    <h3 className='grostesk font-bold text-base uppercase mb-4'>
                        Email Us
                    </h3>

                    <p className='para capitalize mb-2'>
                        For Product questions/concerns, brand information & general inquiries
                    </p>

                    <a href="mailto:thewhite2811@gmail.com" className='text-lg font-semibold grostesk underline'>thewhite2811@gmail.com</a>

                    <h3 className='grostesk font-bold text-base uppercase mb-4 mt-4'>
                        Phone Number
                    </h3>

                    <p className='para capitalize mb-2'>
                        For Product questions/concerns, brand information & general inquiries
                    </p>

                    <a href="tel:+8809697377876" className='text-lg font-semibold grostesk underline block'>+8809697377876</a>

                    <a href="tel:+8809697437299" className='text-lg font-semibold grostesk underline'>+8809697437299</a>
                </div>
            </div>

            <h1 className='grostesk font-bold text-6xl uppercase text-center mb-10 z-50 relative'>You can also find us at!</h1>


            <div className='container mx-auto grid grid-cols-3 gap-10'>
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
        </>
    )
}

export default Contact