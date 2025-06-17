import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";

const MyArtifacts = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
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

  const handleDelete = (id) => {
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
          navigate("/all-artifacts");
        } catch (err) {
          Swal.fire("Error", "Failed to delete artifact", "error");
        }
      }
    });
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 mt-10">
      <Helmet>
        <title>My Artifacts || Historical Artifacts Tracker</title>
      </Helmet>
      <h2 className="text-3xl font-bold mb-6">My Artifacts</h2>
      {myArtifacts.length === 0 ? (
        <p className="text-gray-600 text-center">
          You haven’t added any artifacts yet. Start contributing history!
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {myArtifacts.map((artifact) => (
            <div key={artifact._id} className="border rounded-lg shadow-md p-4">
              <img
                src={artifact.image}
                alt={artifact.name}
                className="w-full h-48 object-cover rounded"
              />
              <h3 className="text-xl font-semibold mt-2">{artifact.name}</h3>
              <p>
                <strong>Type:</strong> {artifact.type}
              </p>
              <p>
                <strong>Likes:</strong> {artifact.likeCount || 0}
              </p>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => navigate(`/update-artifact/${artifact._id}`)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(artifact._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyArtifacts;
