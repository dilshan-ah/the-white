import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import sliderone from '../assets/1.png'
import slidertwo from '../assets/2.png'

import 'swiper/css';
import 'swiper/css/effect-fade';


import { Autoplay, EffectFade, Scrollbar } from 'swiper/modules';

const BannerSlider = () => {
    return (
        <Swiper
            effect={'fade'}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            modules={[Autoplay, EffectFade]}
            className="mySwiper"
        >
            <SwiperSlide>
                <img src={sliderone} alt="" className='w-full' />
            </SwiperSlide>

            <SwiperSlide>
                <img src={slidertwo} alt="" className='w-full' />
            </SwiperSlide>
        </Swiper>
    )
}

export default BannerSlider