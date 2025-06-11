import React from "react";

const blogPosts = [
  {
    id: 1,
    title: "The Rosetta Stone: Unlocking Ancient Scripts",
    image:
      "https://images.unsplash.com/photo-1659077545369-91282ef29c01?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    excerpt:
      "Discovered in 1799, the Rosetta Stone was the key to understanding Egyptian hieroglyphs. Learn how this artifact changed history...",
  },
  {
    id: 2,
    title: "Top 5 Lost Civilizations and Their Mysterious Artifacts",
    image:
      "https://plus.unsplash.com/premium_photo-1694475367746-526db5575bb4?q=80&w=1177&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    excerpt:
      "From the Inca to the Indus Valley, explore the cultures whose artifacts tell stories long forgotten...",
  },
  {
    id: 3,
    title: "Preserving Ancient Tools: A Guide for Modern Archivists",
    image:
      "https://images.unsplash.com/photo-1731246164682-867af4a1a2b1?q=80&w=1113&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    excerpt:
      "Preservation of ancient tools is essential for understanding early human innovation. Here’s how museums do it right...",
  },
];

const Blogs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-700">
        Historical Blogs & Articles
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform hover:scale-105"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <button className="text-blue-600 hover:underline font-medium">
                Read More →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
