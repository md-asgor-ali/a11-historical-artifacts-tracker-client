import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Loading from "./Loading";

const FeaturedArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(
        "https://a11-historical-artifacts-tracker-se.vercel.app/artifacts/featured"
      )
      .then((res) => {
        setArtifacts(res.data);
        console.log("Fetched featured artifacts:", res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured artifacts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="w-11/12 mx-auto my-12 bg-gradient-to-br from-purple-50 to-indigo-100 py-5 rounded-xl shadow-md">
      <h2 className="text-3xl text-purple-500 font-bold text-center mb-8">
        🔥 Featured Artifacts
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artifacts.map((artifact) => (
          <div
            key={artifact._id}
            className="rounded-xl shadow-md bg-white overflow-hidden"
          >
            <img
              src={artifact.image}
              alt={artifact.name}
              className="w-full h-52 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl text-purple-500 font-semibold mb-2">{artifact.name}</h3>
              <p className="text-gray-600 mb-3">{artifact.shortDesc}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-700">
                  ❤️ {artifact.likeCount || 0} Likes
                </span>
                <Link to={`/artifact/${artifact._id}`}>
                  <button className="btn btn-sm  btn-primary">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link to="/all-artifacts">
          <button className="btn btn-outline btn-primary">See All</button>
        </Link>
      </div>
    </div>
  );
};

export default FeaturedArtifacts;
