import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Carousel = ({ slides, ...props }) => {
    return (
        <Swiper {...props}>
            {slides.map((slideContent, index) => (
                <SwiperSlide key={index}>{slideContent}</SwiperSlide>
            ))}
        </Swiper>
    );
};

export default Carousel;
