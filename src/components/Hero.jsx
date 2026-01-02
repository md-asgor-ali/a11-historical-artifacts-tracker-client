import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade } from "swiper/modules";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import { ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import sliderImage1 from "../assets/sliderImage1.jpg";
import sliderImage2 from "../assets/image2.jpg";
import sliderImage3 from "../assets/sliderImage3.jpg";
import sliderImage4 from "../assets/sliderImage4.jpg";

const slides = [
  {
    img: sliderImage1,
    title: "Preserving the Past",
    desc: "Explore rare and ancient artifacts from around the world.",
    cta: "Explore Artifacts",
    link: "/all-artifacts",
  },
  {
    img: sliderImage2,
    title: "Unlock Hidden Stories",
    desc: "Every artifact tells a story waiting to be discovered.",
    cta: "Browse Collection",
    link: "/all-artifacts",
  },
  {
    img: sliderImage3,
    title: "A Digital Museum",
    desc: "Experience history through a modern digital platform.",
    cta: "Start Exploring",
    link: "/all-artifacts",
  },
  {
    img: sliderImage4,
    title: "Your Portal to History",
    desc: "Join a global community preserving human heritage.",
    cta: "Get Started",
    link: "/login",
  },
];

const Hero = () => {
  const [active, setActive] = useState(0);

  return (
    <section className="relative h-[80vh] overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        loop
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActive(swiper.realIndex)}
        className="h-full w-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>
            <div className="relative h-full w-full flex items-center justify-center">

              {/* Background Image */}
              <motion.img
                src={slide.img}
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover brightness-[0.45]"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                draggable={false}
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20" />

              {/* Content */}
              <motion.div
                key={active}
                className="relative z-10 text-center px-6 max-w-3xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-white to-amber-500">
                  <Typewriter
                    options={{
                      strings: [slide.title],
                      autoStart: true,
                      delay: 55,
                      cursor: "_",
                    }}
                  />
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-8">
                  {slide.desc}
                </p>

                <a
                  href={slide.link}
                  className="inline-flex items-center gap-2 px-8 py-3
                             rounded-full bg-amber-400 text-black font-semibold
                             hover:bg-amber-300 transition shadow-lg"
                >
                  {slide.cta}
                  <ArrowRight size={18} />
                </a>

                {/* Stats */}
                <div className="mt-10 flex justify-center gap-6 text-sm text-amber-200/90">
                  <span><strong>10k+</strong> Artifacts</span>
                  <span><strong>200+</strong> Museums</span>
                  <span><strong>Global</strong> Community</span>
                </div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
