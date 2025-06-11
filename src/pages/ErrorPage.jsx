// pages/NotFound.jsx

import React from "react";
import { Link } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 via-blue-50 to-gray-100 flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-xl">
        <h1 className="text-7xl font-extrabold text-blue-700 drop-shadow mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          Lost in History?
        </h2>
        <p className="text-gray-600 text-lg mb-6 leading-relaxed">
          The page you’re looking for may have been lost to time like an ancient
          artifact. But don’t worry, you can always return to our collection and
          continue your journey through the past.
        </p>
        <Link
          to="/"
          className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-full transition shadow-md"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>

      <img
        src="https://cdn-icons-png.flaticon.com/512/3064/3064197.png"
        alt="Lost Artifact"
        className="w-56 mt-10 opacity-90"
      />
    </div>
  );
};

export default ErrorPage;
