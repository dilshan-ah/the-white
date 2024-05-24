import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import blacktee from '../assets/black.png'

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';


const ProductGallerySlider = ({thumb,gallery}) => {

    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    return (
        <div className='w-4/5'>
            <Swiper
                style={{
                    '--swiper-navigation-color': '#fff',
                    '--swiper-pagination-color': '#fff',
                }}
                spaceBetween={10}
                navigation={true}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper2 mb-2"
            >
                <SwiperSlide>
                    <img src={`http://127.0.0.1:8000/uploads/product-thumbs/${thumb}`} className='w-full'/>
                </SwiperSlide>

                {gallery?.map((galleryimage)=>(
                    <SwiperSlide>
                        <img src={`http://127.0.0.1:8000/uploads/product-gallery/${galleryimage?.image_path}`} className='w-full' />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Swiper
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={4}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img src={`http://127.0.0.1:8000/uploads/product-thumbs/${thumb}`} className='w-full' />
                </SwiperSlide>
                {gallery?.map((galleryimage)=>(
                    <SwiperSlide>
                        <img src={`http://127.0.0.1:8000/uploads/product-gallery/${galleryimage?.image_path}`} className='w-full' />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default ProductGallerySlider