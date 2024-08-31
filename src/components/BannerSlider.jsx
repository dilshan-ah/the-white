import React, { useContext, useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

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
                className="mySwiper sm:pt-0 pt-24"
            >
                {banner?.map((bnr) => (
                    <SwiperSlide>
                        <img src={`https://adminpanel.thewhitebd.com/uploads/banners/${bnr.img_path}`} alt="" className='w-full' />
                    </SwiperSlide>
                ))}

            </Swiper>
        </>

    )
}

export default BannerSlider