import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

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
    if (!user) {
      navigate("/login");
    }
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
    if (user?.email) {
      fetchArtifact();
    }
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

  if (loading || !artifact) return <div className="text-center py-10">Loading artifact...</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-lg bg-white mt-10">
      <img
        src={artifact.image}
        alt={artifact.name}
        className="w-full h-64 object-cover rounded-lg"
      />
      <h2 className="text-2xl font-bold mt-4">{artifact.name}</h2>
      <p><strong>Type:</strong> {artifact.type}</p>
      <p><strong>Created At:</strong> {artifact.createdAt}</p>
      <p><strong>Discovered At:</strong> {artifact.discoveredAt}</p>
      <p><strong>Discovered By:</strong> {artifact.discoveredBy}</p>
      <p><strong>Location:</strong> {artifact.location}</p>
      <p><strong>Context:</strong> {artifact.context}</p>
      <p><strong>Description:</strong> {artifact.shortDesc}</p>

      <div className="mt-6 flex items-center gap-4">
        <button
          onClick={handleLikeToggle}
          className={`px-5 py-2 rounded font-medium shadow transition ${
            hasLiked
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          {hasLiked ? "Dislike" : "Like"}
        </button>
        <span className="text-lg font-semibold">Likes: {likeCount}</span>
      </div>
    </div>
  );
};

export default ArtifactDetails;
