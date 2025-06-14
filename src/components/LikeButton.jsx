import React, { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const LikeButton = ({ artifactId, initialLikedBy = [], initialLikeCount = 0 }) => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialLikeCount);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setLiked(initialLikedBy.includes(user.email));
    }
  }, [initialLikedBy, user]);

  const handleToggleLike = async () => {
    if (!user?.email) return alert("Please login to like artifacts.");
    setLoading(true);

    try {
      const res = await axiosSecure.patch(`/artifacts/${artifactId}/like`, {
        userEmail: user.email,
      });

      setLiked(res.data.liked);
      setLikeCount(res.data.likeCount);
    } catch (err) {
      console.error("❌ Failed to toggle like:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleLike}
      disabled={loading}
      className={`mt-2 px-4 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
        liked ? "bg-red-500 text-white hover:bg-red-600" : "bg-gray-300 hover:bg-gray-400 text-black"
      }`}
    >
      {liked ? "❤️ Liked" : "🤍 Like"} ({likeCount})
    </button>
  );
};

export default LikeButton;
