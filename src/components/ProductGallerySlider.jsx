import React, { useEffect, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import { FreeMode, Navigation, Thumbs } from 'swiper/modules';

const ProductGallerySlider = ({ thumb, gallery }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (thumb && gallery && gallery.length > 0) {
            setLoading(false);
        }
    }, [thumb, gallery]);

    return (
        <div className='md:w-4/5'>
            {loading ? (
                <div>
                    <div className="skeleton h-96 w-full mb-4"></div>
                    <div className='grid grid-cols-4 gap-4'>
                        <div className="skeleton w-full h-28"></div>
                        <div className="skeleton w-full h-28"></div>
                        <div className="skeleton w-full h-28"></div>
                        <div className="skeleton w-full h-28"></div>
                    </div>
                </div>
            ) : (
                <>
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
                            <img src={`https://adminpanel.thewhitebd.com/uploads/product-thumbs/${thumb}`} className='w-full' alt="Main product" />
                        </SwiperSlide>

                        {gallery?.map((galleryimage, index) => (
                            <SwiperSlide key={index}>
                                <img src={`https://adminpanel.thewhitebd.com/uploads/product-gallery/${galleryimage?.image_path}`} className='w-full' alt={`Gallery image ${index}`} />
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
                            <img src={`https://adminpanel.thewhitebd.com/uploads/product-thumbs/${thumb}`} className='w-full' alt="Thumbnail" />
                        </SwiperSlide>
                        {gallery?.map((galleryimage, index) => (
                            <SwiperSlide key={index}>
                                <img src={`https://adminpanel.thewhitebd.com/uploads/product-gallery/${galleryimage?.image_path}`} className='w-full' alt={`Thumbnail image ${index}`} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </>
            )}
        </div>
    );
}

export default ProductGallerySlider;
