import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Heart, MapPin, Calendar, Clock, User } from "lucide-react";

const ArtifactDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  const [artifact, setArtifact] = useState(null);
  const [likeCount, setLikeCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  const fetchArtifact = async () => {
    try {
      const res = await axiosSecure.get(`/artifacts/${id}`);
      const data = res.data;
      setArtifact(data);
      setLikeCount(data.likeCount || 0);
      setHasLiked(data.likedBy?.includes(user?.email));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching artifact:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.email) fetchArtifact();
  }, [id, user?.email]);

  const handleLikeToggle = async () => {
    if (!user?.email) return;

    try {
      const res = await axiosSecure.patch(`/artifacts/${id}/like`, {
        userEmail: user.email,
      });

      if (res.data.modifiedCount > 0) {
        setHasLiked(res.data.hasLiked);
        setLikeCount(res.data.likeCount);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  if (loading || !artifact)
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-400 font-bold text-xl">
        Loading artifact...
      </div>
    );

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <Helmet>
        <title>{artifact.name} || Historical Artifacts Tracker</title>
      </Helmet>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-purple-600/10"></div>

      <div className="relative z-10 max-w-4xl mx-auto p-6 py-14">
        <motion.div
          className="rounded-3xl overflow-hidden backdrop-blur-xl bg-black/70 border border-white/10 shadow-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Image */}
          <div className="relative h-80 overflow-hidden">
            <motion.img
              src={artifact.image}
              alt={artifact.name}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent"></div>

            {/* Type badge */}
            <div className="absolute top-5 right-5 px-4 py-1 rounded-full bg-amber-500 text-black font-bold text-sm shadow-lg">
              {artifact.type}
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <h2 className="text-3xl font-bold text-amber-400 mb-4">
              {artifact.name}
            </h2>

            <div className="grid sm:grid-cols-2 gap-4 text-gray-300 text-sm mb-6">
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                Created: {artifact.createdAt}
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                Discovered: {artifact.discoveredAt}
              </p>
              <p className="flex items-center gap-2">
                <User className="w-4 h-4 text-purple-400" />
                By: {artifact.discoveredBy}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-400" />
                {artifact.location}
              </p>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6">
              {artifact.shortDesc}
            </p>

            {/* Like Section */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleLikeToggle}
                className={`flex items-center gap-2 px-6 py-2 rounded-xl font-semibold transition-all duration-300 ${
                  hasLiked
                    ? "bg-red-500/90 hover:bg-red-600 text-white"
                    : "bg-amber-500/90 hover:bg-amber-400 text-black"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    hasLiked ? "fill-white" : "fill-none"
                  }`}
                />
                {hasLiked ? "Dislike" : "Like"}
              </button>

              <span className="text-lg font-semibold text-gray-200">
                ❤️ {likeCount}
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ArtifactDetails;
