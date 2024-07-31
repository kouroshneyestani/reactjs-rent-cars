import React from "react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

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
