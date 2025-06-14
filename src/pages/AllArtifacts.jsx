import React, { useEffect, useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Loading from '../components/Loading';

const AllArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get('http://localhost:5000/artifacts',{
          headers: {
      Authorization: `Bearer ${token}`,
          }
      }) // Make sure this route exists in your backend
      .then((res) => {
        setArtifacts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch artifacts:', err);
        setLoading(false);
      });
  }, []);

   if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
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
            <h2 className="text-xl font-bold mb-2">{artifact.name}</h2>
            <p className="text-gray-700 mb-1"><strong>Type:</strong> {artifact.type}</p>
            <p className="text-gray-700 mb-1"><strong>Discovered At:</strong> {artifact.discoveredAt}</p>
            <p className="text-gray-700 mb-2"><strong>Location:</strong> {artifact.location}</p>
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
  );
};

export default AllArtifacts;
