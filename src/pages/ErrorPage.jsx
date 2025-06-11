import React from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-50 to-pink-100 flex flex-col items-center justify-center px-6 py-12 text-center">
      {/* 404 Number */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-8xl font-extrabold text-purple-700 drop-shadow-lg mb-4"
      >
        404
      </motion.h1>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-gray-800 mb-3"
      >
        Lost in History?
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="text-gray-600 max-w-xl mx-auto mb-6 text-lg leading-relaxed"
      >
        This page may have vanished like a forgotten relic. But don't worry—you can head back
        to explore our rich collection of historical treasures.
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <Link
          to="/"
          className="inline-flex items-center bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-full text-lg font-medium shadow-lg transition"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </motion.div>

      {/* Illustration */}
      <motion.img
        src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
        alt="Lost Artifact"
        className="w-64 mt-12 opacity-95"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.6 }}
      />
    </div>
  );
};

export default ErrorPage;
