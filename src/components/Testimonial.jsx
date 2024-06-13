import React, { useContext, useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import ReviewCard from './ReviewCard';
import 'swiper/css/effect-fade';
import { Autoplay } from 'swiper/modules';
import { DataContext } from '../../context/Context';

const Testimonial = () => {

    const { review } = useContext(DataContext)
    return (
        <div className='container mx-auto px-5'>
            <Swiper
                slidesPerView={3}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                spaceBetween={30}
                pagination={{
                    clickable: true,
                }}
                modules={[Autoplay]}
                className="Swiper"
            >
                {review?.map((rvw, index) => (
                    <SwiperSlide key={index}>
                        <ReviewCard review={rvw}/>
                    </SwiperSlide>
                ))}

            </Swiper>
        </div>
    )
}

export default Testimonial