import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import axios from "axios";
import Loading from "../components/Loading";

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState(""); // for input
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input (optional but improves UX)
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [searchText]);

  useEffect(() => {
    const fetchArtifacts = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "https://a11-historical-artifacts-tracker-se.vercel.app/artifacts",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              name: debouncedSearch,
            },
          }
        );

        setArtifacts(res.data);
      } catch (err) {
        console.error("Failed to fetch artifacts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchArtifacts();
  }, [debouncedSearch]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search artifacts by name..."
          className="w-full sm:w-1/2 px-4 py-2 border rounded shadow focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>

      {/* Artifact Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {artifacts.map((artifact) => (
          <div
            key={artifact._id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <img
              src={artifact.image}
              alt={artifact.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl text-purple-500 font-bold mb-2">{artifact.name}</h2>
              <p className="text-gray-700 mb-1">
                <strong>Type:</strong> {artifact.type}
              </p>
              <p className="text-gray-700 mb-1">
                <strong>Discovered At:</strong> {artifact.discoveredAt}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Location:</strong> {artifact.location}
              </p>
              <Link
                to={`/artifacts/${artifact._id}`}
                className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
              >
                View Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllArtifacts;
