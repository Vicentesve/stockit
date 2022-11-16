import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

const Carousel = () => {
  const [my_swiper, set_my_swiper] = useState({});

  return (
    <div className="relative">
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-gray-100 to-transparent" />
      <Swiper
        slidesPerView={1}
        onInit={(ev) => {
          set_my_swiper(ev);
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        <SwiperSlide>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/71aQ3u78A3L._SX3000_.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/71dbxIcDioL._SX3000_.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            loading="lazy"
            src="https://m.media-amazon.com/images/I/71tIrZqybrL._SX3000_.jpg"
            alt=""
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            loading="lazy"
            className="object-cover w-full h-full opacity-85"
            src="https://m.media-amazon.com/images/I/61TD5JLGhIL._SX3000_.jpg"
            alt=""
          />
        </SwiperSlide>
      </Swiper>

      <button
        className="absolute top-[35%] left-0 z-10 text-gray-200 shadow-sm"
        onClick={() => my_swiper.slidePrev()}
      >
        <ChevronLeftIcon className="h-16" />
      </button>

      <button
        className="absolute top-[35%] right-0 z-10 text-gray-200 shadow-sm"
        onClick={() => my_swiper.slideNext()}
      >
        <ChevronRightIcon className="h-16" />
      </button>
    </div>
  );
};

export default Carousel;
