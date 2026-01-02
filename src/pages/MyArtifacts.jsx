import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import useAxiosSecure from "../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Calendar, Clock, MapPin, Heart, Star, Edit, Trash2, Eye } from "lucide-react";
import { useNavigate, Link } from "react-router";

const MyArtifacts = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const [myArtifacts, setMyArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.email) return;

    axiosSecure
      .get(`/my-artifacts?adderEmail=${user.email}`)
      .then((res) => setMyArtifacts(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [user, axiosSecure]);

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This artifact will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/artifacts/${id}`);
          Swal.fire("Deleted!", "Artifact has been removed.", "success");
          setMyArtifacts((prev) => prev.filter((a) => a._id !== id));
        } catch (err) {
          Swal.fire("Error", "Failed to delete artifact", "error");
        }
      }
    });
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-400 font-bold text-xl">
        Loading...
      </div>
    );

  return (
    <div className="relative min-h-screen overflow-hidden bg-black text-white">
      <Helmet>
        <title>My Artifacts || Historical Artifacts Tracker</title>
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
          My Artifacts
        </motion.h1>

        {myArtifacts.length === 0 ? (
          <p className="text-gray-400 text-center text-lg mt-10">
            You haven’t added any artifacts yet. Start contributing history!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {myArtifacts.map((artifact) => (
              <motion.div
                key={artifact._id}
                className="group relative overflow-hidden rounded-3xl backdrop-blur-xl border border-white/10 bg-gradient-to-br from-black/90 via-black/80 to-black/90 shadow-lg"
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
                      <span>{artifact.likedBy?.length || 0}</span>
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

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Link
                      to={`/artifacts/${artifact._id}`}
                      className="flex-1 flex items-center justify-center gap-1 px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-300 font-semibold hover:from-amber-500/30 hover:to-amber-600/30 transition-all duration-300 backdrop-blur-sm border border-amber-400/20"
                    >
                      <Eye className="h-4 w-4" /> View
                    </Link>
                    <button
                      onClick={() => navigate(`/update-artifact/${artifact._id}`)}
                      className="flex-1 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 hover:bg-white/20 hover:text-white hover:border-white/30 transition-all duration-300"
                    >
                      <Edit className="h-4 w-4 inline-block mr-1" /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(artifact._id)}
                      className="flex-1 px-3 py-2 rounded-xl bg-red-500/10 backdrop-blur-sm border border-red-400/20 text-red-400 hover:bg-red-500/20 hover:text-red-300 hover:border-red-400/40 transition-all duration-300"
                    >
                      <Trash2 className="h-4 w-4 inline-block mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyArtifacts;
