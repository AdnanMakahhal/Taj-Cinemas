// import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
// import "./styles.css";

import { Scrollbar } from "swiper/modules";
import { Children } from "react";

function SwiperAdnan({ children }) {
  return (
    <>
      <Swiper
        slidesPerView="auto"
        spaceBetween={20}
        scrollbar={{
          draggable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
          },
          "@0.75": {
            slidesPerView: 2,
          },
          "@1.00": {
            slidesPerView: 3,
          },
          "@1.50": {
            slidesPerView: 4,
          },
        }}
        modules={[Scrollbar]}
        className="mySwiper mb-10"
      >
        {Children.map(children, (child) => (
          <SwiperSlide>{child}</SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
export default SwiperAdnan;
