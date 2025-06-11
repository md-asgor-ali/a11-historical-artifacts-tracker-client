import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import axios from "axios";
import { useNavigate } from "react-router";

const LikedArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [likedArtifacts, setLikedArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }

    const fetchLikedArtifacts = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/artifacts?likedBy=${user.email}`
        );
        setLikedArtifacts(res.data || []);
      } catch (error) {
        console.error("Failed to fetch liked artifacts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLikedArtifacts();
  }, [user, navigate]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <h2 className="text-3xl font-bold mb-6">Liked Artifacts</h2>
      {likedArtifacts.length === 0 ? (
        <p className="text-gray-600 text-center">
          You haven't liked any artifacts yet. Explore and like some!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {likedArtifacts.map((artifact) => (
            <div key={artifact._id} className="border rounded-lg shadow-md p-4">
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{artifact.name}</h3>
              <p><strong>Type:</strong> {artifact.type}</p>
              <p><strong>Likes:</strong> {artifact.likeCount || 0}</p>
              <button
                onClick={() => navigate(`/artifact/${artifact._id}`)}
                className="mt-3 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedArtifacts;
