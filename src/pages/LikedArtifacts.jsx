import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useNavigate, Link } from "react-router";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Heart, Star, Eye } from "lucide-react";

const LikedArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchLikedArtifacts = async () => {
      try {
        const res = await axiosSecure.get(`/artifacts?likedBy=${user.email}`);
        setLikedArtifacts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch liked artifacts:", error);
        if (error.response?.status === 403 || error.response?.status === 401) {
          navigate("/unauthorized");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchLikedArtifacts();
  }, [user, axiosSecure, navigate]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-400 font-bold text-xl">
        Loading...
      </div>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Helmet>
        <title>Liked Artifacts || Historical Artifacts Tracker</title>
      </Helmet>

      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/10 animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.05),transparent_50%)] animate-pulse-slow"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(251,191,36,0.06),transparent_50%)] animate-pulse-slow"></div>

      <div className="relative z-10 max-w-6xl mx-auto p-6 py-12">
        <motion.h1
          className="text-4xl font-bold text-center text-amber-400 mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Liked Artifacts
        </motion.h1>

        {likedArtifacts.length === 0 ? (
          <p className="text-gray-400 text-center text-lg mt-10">
            You haven't liked any artifacts yet. Explore and like some!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {likedArtifacts.map((artifact) => (
              <motion.div
                key={artifact._id}
                className="group relative overflow-hidden rounded-3xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-black/85 via-black/80 to-black/85 shadow-lg"
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden rounded-t-3xl">
                  <motion.img
                    src={artifact.image || "/placeholder.svg?height=250&width=400"}
                    alt={artifact.name}
                    className="w-full h-full object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.7 }}
                    onError={(e) => (e.target.src = "/placeholder.svg?height=250&width=400")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

                  {/* Type Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="px-3 py-1 rounded-full bg-amber-500/90 text-black font-bold text-xs backdrop-blur-sm border border-amber-300/30 shadow-lg">
                      {artifact.type}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-amber-300 transition-colors duration-300">
                    {artifact.name}
                  </h3>

                  {/* Info */}
                  <div className="space-y-1 text-gray-300 text-sm mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-amber-400" />
                      <span>Created: {artifact.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-400" />
                      <span>Found: {artifact.discoveredAt}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-green-400" />
                      <span>{artifact.presentLocation}</span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-gray-400">
                      <Heart className="h-4 w-4 text-red-400" />
                      <span>{artifact.likeCount || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 ${i < 4 ? "text-amber-400 fill-current" : "text-gray-600"}`}
                        />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">4.8</span>
                    </div>
                  </div>

                  {/* Action */}
                  <Link
                    to={`/artifacts/${artifact._id}`}
                    className="flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 font-semibold hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-300 backdrop-blur-sm border border-amber-400/20 w-full"
                  >
                    <Eye className="h-4 w-4" /> View Details
                  </Link>
                </div>

                {/* Hover Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-amber-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedArtifacts;
