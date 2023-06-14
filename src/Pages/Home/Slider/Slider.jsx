import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";

const Slider = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <img className="w-full h-screen" src="https://images.shiksha.com/mediadata/images/articles/1671521998phpeU3cHA.jpeg" alt="img"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-screen" src="https://images.shiksha.com/mediadata/images/articles/1671521998phpeU3cHA.jpeg" alt="img"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-screen" src="https://images.shiksha.com/mediadata/images/articles/1671521998phpeU3cHA.jpeg" alt="img"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-screen" src="https://images.shiksha.com/mediadata/images/articles/1671521998phpeU3cHA.jpeg" alt="img"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-screen" src="https://images.shiksha.com/mediadata/images/articles/1671521998phpeU3cHA.jpeg" alt="img"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-screen" src="https://images.shiksha.com/mediadata/images/articles/1671521998phpeU3cHA.jpeg" alt="img"/>
                </SwiperSlide>
                <SwiperSlide>
                    <img className="w-full h-screen" src="https://images.shiksha.com/mediadata/images/articles/1671521998phpeU3cHA.jpeg" alt="img"/>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Slider;