import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import sliderone from '../assets/1.png'
import slidertwo from '../assets/2.png'

import 'swiper/css';
import 'swiper/css/effect-fade';


import { Autoplay, EffectFade, Scrollbar } from 'swiper/modules';
import { DataContext } from '../../context/Context';


const BannerSlider = () => {
    const { banner } = useContext(DataContext)

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (banner && banner.length > 0) {
            setLoading(false);
        }
    }, [banner]);

    return (
        <>
            {loading && (
                <div className="skeleton h-screen w-full"></div>
            )}

            <Swiper
                effect={'fade'}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, EffectFade]}
                className="mySwiper"
            >
                {banner?.map((bnr) => (
                    <SwiperSlide>
                        <img src={`http://127.0.0.1:8000/uploads/banners/${bnr.img_path}`} alt="" className='w-full' />
                    </SwiperSlide>
                ))}

            </Swiper>
        </>

    )
}

export default BannerSlider