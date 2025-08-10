import React from "react";
import { FaStar } from "react-icons/fa";

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
];

const CustomerReviews = () => {
  return (
    <section className="bg-indigo-100 w-11/12 mx-auto rounded-3xl mt-20 py-16 px-6 sm:px-10">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-purple-500 mb-6">
          What Our <span className="text-rose-500">Users Say</span>
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          Real voices from passionate contributors, learners, and history
          lovers who use our platform every day.
        </p>

        <div className="grid md:grid-cols-3 gap-10">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white p-6 rounded-xl shadow-xl border border-pink-100 hover:shadow-2xl transition duration-300"
            >
              <img
                src={review.avatar}
                alt={review.name}
                className="w-20 h-20 mx-auto rounded-full mb-4 border-4 border-purple-500 shadow"
              />
              <h4 className="text-xl text-purple-500 font-semibold  mb-1">
                {review.name}
              </h4>
              <div className="flex justify-center mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
              <p className="text-gray-600 text-sm italic">“{review.feedback}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerReviews;
