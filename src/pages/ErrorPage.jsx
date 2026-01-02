import React from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";
import { motion } from "framer-motion";

const ErrorPage = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white flex flex-col items-center justify-center px-6 text-center">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-500/10 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(251,191,36,0.08),transparent_50%)]"></div>

      <div className="relative z-10 max-w-2xl">
        {/* 404 */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="text-8xl md:text-9xl font-extrabold text-amber-400 drop-shadow-lg mb-4"
        >
          404
        </motion.h1>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Lost in History?
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-gray-400 text-lg leading-relaxed mb-8"
        >
          This page has vanished like a forgotten artifact.  
          Don’t worry — return home and continue exploring history’s greatest treasures.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold shadow-lg hover:from-amber-400 hover:to-amber-500 transition-all duration-300"
          >
            <FaArrowLeft /> Back to Home
          </Link>
        </motion.div>

        {/* Illustration */}
        <motion.img
          src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
          alt="Lost Artifact"
          className="w-64 mx-auto mt-12 opacity-90"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        />
      </div>
    </div>
  );
};

export default ErrorPage;
