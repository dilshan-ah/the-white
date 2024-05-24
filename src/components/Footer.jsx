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



const Footer = () => {
  return (
    <div className='w-full bg-black mt-28'>
      <div className='container px-5 py-20 mx-auto grid grid-cols-4'>
        <div>
          <img src={logo} className='brightness-0 invert w-52 mb-5' alt="" />
          <p className='text-base text-white mb-5'>It is a drop shoulder t-shirt selling online platform that helps you find get the drop shoulder t-shirt of your choice</p>

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

            <a href="#">
              <FaXTwitter className='text-white text-2xl' />
            </a>

          </div>

        </div>

        <div className='flex flex-col items-center'>
          <div>
            <h3 className='text-white text-xl font-bold grostesk mb-3'>Get in touch</h3>
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
                <a href="mailto:thewhite2811@gmail.com" className='flex items-center gap-3 text-white font-semibold grostesk'>
                  <IoMdMail />
                  <span>thewhite2811@gmail.com</span>
                </a>
              </li>

            </ul>
          </div>

        </div>

        <div className='flex flex-col items-center'>
          <div>
            <h3 className='text-white text-xl font-bold grostesk mb-3'>Customer Service</h3>
            <ul>
              <li>
                <a href="#" className='flex items-center gap-3 text-white font-semibold grostesk mb-3'>
                  <span>Returns</span>
                </a>
              </li>

              <li>
                <a href="#" className='flex items-center gap-3 text-white font-semibold grostesk mb-3'>
                  <span>Shipping</span>
                </a>
              </li>

              <li>
                <a href="#" className='flex items-center gap-3 text-white font-semibold grostesk mb-3'>
                  <span>Privacy Policy</span>
                </a>
              </li>

            </ul>
          </div>

        </div>

        <div className=' flex-col items-center'>
          <h3 className='text-white text-xl font-bold grostesk mb-3 text-center'>Subscribe <br />to our newsletter</h3>

          <form className='flex flex-col items-center'>
            <input type="email" className='w-full outline-0 bg-transparent border-b-2 p-3 text-center focus:bg-transparent font-bold grostesk text-white' placeholder='your email' />

            <button className='px-7 py-2 my-3 text-white border-2 border-white capitalize grostesk font-bold hover:bg-white hover:text-black transition-all' type="submit">Subscribe</button>
          </form>
        </div>


      </div>

      <div className='container mx-auto border-t-2 border-white py-5 flex justify-between items-center'>
        <p className='text-base text-white'>Copyright © 2024 | The White | Made with ❤️ in Bangladesh</p>

        <div className='flex gap-3 bg-white px-3 py-1 rounded-lg'>
          <img src={bkash} className='w-8 h-8 object-cover' alt="" />
          <img src={nagad} className='w-8 h-8 object-cover' alt="" />
          <img src={rocket} className='h-8 object-cover' alt="" />
          <img src={upay} className='h-8 object-cover' alt="" />
        </div>
      </div>
    </div>
  )
}

export default Footer