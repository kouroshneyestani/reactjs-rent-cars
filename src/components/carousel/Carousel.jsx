import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import swiper styles
import "swiper/css";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import "../../assets/plugins/css/swiper.css";

const Carousel = ({ slides, ...props }) => {
    return (
        <Swiper modules={[Pagination]} {...props}>
            {slides.map((slideContent, index) => (
                <SwiperSlide key={index}>{slideContent}</SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
