import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const reviews = [
  {
    id: 1,
    name: "Amina Rahman",
    feedback:
      "This platform helped me explore historical artifacts I never knew existed! The details and images are amazing.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=45",
  },
  {
    id: 2,
    name: "Jahid Hasan",
    feedback:
      "As a history student, I find the site incredibly useful for quick insights and references. Loving the user contributions!",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=36",
  },
  {
    id: 3,
    name: "Sarah Hossain",
    feedback:
      "I added a rare coin from my grandfather's collection and people appreciated it. It's fun and educational!",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=25",
  },
  {
    id: 4,
    name: "Rakib Islam",
    feedback:
      "The UI is beautiful and smooth. Browsing artifacts feels like walking through a virtual museum.",
    rating: 5,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    feedback:
      "I love how users can contribute and like artifacts. It creates a strong learning community.",
    rating: 4,
    avatar: "https://i.pravatar.cc/150?img=8",
  },
];

// Duplicate for seamless infinite scroll
const sliderReviews = [...reviews, ...reviews];

const CustomerReviews = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      {/* Floating sparkles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-amber-400/20 text-2xl"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 10, -10, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          What Our{" "}
          <span className="bg-gradient-to-r from-amber-400 to-amber-500 bg-clip-text text-transparent">
            Users Say
          </span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          Real voices from passionate contributors, learners, and history lovers.
        </p>
      </div>

      {/* Slider */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-10 px-10"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          {sliderReviews.map((review, i) => (
            <motion.div
              key={`${review.id}-${i}`}
              onMouseEnter={() => setHoveredCard(i)}
              onMouseLeave={() => setHoveredCard(null)}
              className={`min-w-[320px] max-w-[320px] p-6 rounded-3xl border border-white/10 backdrop-blur-md bg-white/5 shadow-lg transition-all duration-500 ${
                hoveredCard === i ? "scale-105" : "scale-100"
              }`}
            >
              {/* Avatar */}
              <div className="flex justify-center mb-4">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-20 h-20 rounded-full border-4 border-amber-400 shadow-md object-cover"
                />
              </div>

              {/* Name */}
              <h4 className="text-xl text-amber-400 font-semibold mb-2 text-center">
                {review.name}
              </h4>

              {/* Rating */}
              <div className="flex justify-center mb-3">
                {[...Array(review.rating)].map((_, idx) => (
                  <FaStar key={idx} className="text-yellow-400 w-4 h-4 mx-0.5" />
                ))}
              </div>

              {/* Feedback */}
              <p className="text-gray-300 text-sm italic text-center leading-relaxed">
                “{review.feedback}”
              </p>

              {/* Sparkle */}
              {review.rating === 5 && (
                <motion.div
                  className="absolute top-4 right-4 text-amber-400"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  ✨
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerReviews;
