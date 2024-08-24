import React from 'react'
import logo from '../assets/logo.png'
import bkash from '../assets/bkash-logo.webp'
import nagad from '../assets/Nagad-Logo.png'
import rocket from '../assets/rocket-logo.png'
import upay from '../assets/upay_logo.png'

import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { RiTiktokLine } from "react-icons/ri";
import { FiYoutube } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { SlSocialLinkedin } from 'react-icons/sl'
import { Link } from 'react-router-dom'



const Footer = () => {
  return (
    <div className='w-full bg-black mt-28'>
      <div className='container px-5 py-20 mx-auto grid grid-cols-4 gap-5'>
        <div className='lg:col-span-1 col-span-4'>
          <Link to='/'>
            <img src={logo} className='brightness-0 invert w-52 mb-5' alt="" />
          </Link>

          <p className='text-base text-white mb-5 font-bold'>MUL TEE VERSE OF DROP TEES</p>

          <div className='flex gap-3'>

            <a href="https://www.facebook.com/thewhite.apparel" target='_blank'>
              <FiFacebook className='text-white text-2xl' />
            </a>

            <a href="https://www.instagram.com/the_white.bd/?hl=en" target='_blank'>
              <FaInstagram className='text-white text-2xl' />
            </a>

            <a href="https://wa.me/01779744512" target='_blank'>
              <FaWhatsapp className='text-white text-2xl' />
            </a>

            <a href="https://www.tiktok.com/@the.white.bd" target='_blank'>
              <RiTiktokLine className='text-white text-2xl' />
            </a>

            <a href="https://www.youtube.com/@TheWHITEsquad112" target='_blank'>
              <FiYoutube className='text-white text-2xl' />
            </a>

            <a href="https://x.com/TheWhiteBD">
              <FaXTwitter className='text-white text-2xl' />
            </a>

            <a href="https://www.linkedin.com/company/thewhitebd/">
              <SlSocialLinkedin className='text-white text-2xl' />
            </a>

          </div>

        </div>

        <div className='flex flex-col lg:items-center lg:col-span-1 md:col-span-2 col-span-4'>
          <div>
            <h3 className='text-white text-xl font-bold poppins mb-3'>Get in touch</h3>
            <ul>
              <li>
                <a href="callto:+8809697377876" className='flex items-center gap-3 text-white font-semibold grostesk mb-3'>
                  <IoMdCall />
                  <span>+8809697377876</span>
                </a>
              </li>

              <li>
                <a href="callto:+8809697437299" className='flex items-center gap-3 text-white font-semibold grostesk mb-3'>
                  <IoMdCall />
                  <span>+8809697437299</span>
                </a>
              </li>

              <li>
                <a href="mailto:info@thewhitebd.com" className='flex items-center gap-3 text-white font-semibold grostesk'>
                  <IoMdMail />
                  <span>info@thewhitebd.com</span>
                </a>
              </li>

            </ul>
          </div>

        </div>

        <div className='flex flex-col lg:items-center lg:col-span-1 md:col-span-2 col-span-4'>
          <div>
            <h3 className='text-white text-xl font-bold poppins mb-3'>Customer Service</h3>
            <ul>
              <li>
                <Link to='/return-and-refund' className='flex items-center gap-3 text-white font-semibold grostesk mb-3'>
                  <span>Returns & Refund</span>
                </Link>
              </li>

              <li>
                <Link to='/privacy-policy' className='flex items-center gap-3 text-white font-semibold grostesk mb-3'>
                  <span>Privacy Policy</span>
                </Link>
              </li>

              <li>
                <Link to='/customer-review' className='flex items-center gap-3 text-white font-semibold grostesk mb-3'>
                  <span>Customer Reviews</span>
                </Link>
              </li>

            </ul>
          </div>

        </div>

        <div className=' flex-col lg:items-center lg:col-span-1 col-span-4'>
          <h3 className='text-white text-xl font-bold poppins mb-3 text-center'>Subscribe <br />to our newsletter</h3>

          <form className='flex flex-col items-center'>
            <input type="email" className='w-full outline-0 bg-transparent border-b-2 p-3 text-center focus:bg-transparent font-semibold semibold text-white' placeholder='your email' />

            <button className='px-7 py-2 my-3 text-white border-2 border-white capitalize grostesk font-bold hover:bg-white hover:text-black transition-all' type="submit">Subscribe</button>
          </form>
        </div>


      </div>

      <div className='container mx-auto border-t-2 border-white py-2 flex gap-10 flex-wrap md:justify-between justify-center items-center'>
        <p className='text-base text-white md:text-start text-center'>Copyright © 2024 | The White | Made with ❤️ in Bangladesh</p>

        
        <Link to='https://www.facebook.com/groups/892693480870669' target='_blank' className='text-base text-white md:text-start text-center font-bold'>#JoinTheWhiteSquad</Link>
      </div>
    </div>
  )
}

export default Footer