import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const slides = [
  {
    id: 1,
    title: "Uncover Lost Civilizations 🌍",
    desc: "Journey through time and explore the mysteries of ancient societies.",
    image: "https://images.unsplash.com/photo-1705628080778-f86b2f90a114?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: 2,
    title: "Timeless Treasures 💎",
    desc: "Dive into collections of ancient coins, pottery, and royal relics.",
    image: "https://cdn.pixabay.com/photo/2017/07/22/11/46/adventure-2528477_1280.jpg",
  },
  {
    id: 3,
    title: "Preserve History, Inspire Future 🏛️",
    desc: "Help preserve historical artifacts and learn their untold stories.",
    image: "https://plus.unsplash.com/premium_photo-1661963989923-17181d237cef?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Slider = () => {
  return (
    <div className="w-11/12 mx-auto my-8 rounded-xl overflow-hidden shadow-lg">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-[500px]">
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-6 md:px-20 text-white">
                <h2 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-sm md:text-lg max-w-xl drop-shadow">
                  {slide.desc}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
