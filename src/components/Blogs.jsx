import React from "react";
import { Helmet } from "react-helmet-async";
import { Sparkles, ChevronRight } from "lucide-react";
import { motion } from 'framer-motion';

const blogPosts = [
  {
    id: 1,
    title: "The Rosetta Stone: Unlocking Ancient Scripts",
    image:
      "https://images.unsplash.com/photo-1659077545369-91282ef29c01?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0",
    excerpt:
      "Discovered in 1799, the Rosetta Stone was the key to understanding Egyptian hieroglyphs. Learn how this artifact changed history...",
  },
  {
    id: 2,
    title: "Top 5 Lost Civilizations and Their Mysterious Artifacts",
    image:
      "https://plus.unsplash.com/premium_photo-1694475367746-526db5575bb4?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0",
    excerpt:
      "From the Inca to the Indus Valley, explore the cultures whose artifacts tell stories long forgotten...",
  },
  {
    id: 3,
    title: "Preserving Ancient Tools: A Guide for Modern Archivists",
    image:
      "https://images.unsplash.com/photo-1731246164682-867af4a1a2b1?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0",
    excerpt:
      "Preservation of ancient tools is essential for understanding early human innovation. Here’s how museums do it right...",
  },
];

const Blogs = () => {
  return (
    <div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(20,20,20,0.98) 50%, rgba(0,0,0,0.95) 100%)",
      }}
    >
      <Helmet>
        <title>Blogs | Historical Artifacts Tracker</title>
      </Helmet>

      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.08),transparent_50%)]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 justify-center mx-auto"
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="h-5 w-5 text-amber-400" />
            <span className="text-amber-400 font-medium">Historical Blogs</span>
          </motion.div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            Our{" "}
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Articles
            </span>
          </h1>

          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Read insightful articles and stories about historical artifacts and ancient civilizations.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="group relative overflow-hidden rounded-2xl backdrop-blur-xl border border-white/10 hover:border-white/20 transition-all duration-500"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)",
                backdropFilter: "blur(20px) saturate(180%)",
                WebkitBackdropFilter: "blur(20px) saturate(180%)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Content */}
              <div className="p-6 relative z-10">
                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-amber-300 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <button className="flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 font-medium hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-300 backdrop-blur-sm border border-amber-400/20 hover:border-amber-400/40">
                  <span>Read More</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-amber-500/5 to-amber-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
