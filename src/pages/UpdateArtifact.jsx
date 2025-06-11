import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";

const UpdateArtifact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artifact, setArtifact] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/artifacts/${id}`)
      .then((res) => setArtifact(res.data))
      .catch((err) => console.error("Failed to load artifact", err));
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const updatedData = {
      name: form.name.value,
      image: form.image.value,
      type: form.type.value,
      historicalContext: form.historicalContext.value,
      createdAt: form.createdAt.value,
      discoveredAt: form.discoveredAt.value,
      discoveredBy: form.discoveredBy.value,
      presentLocation: form.presentLocation.value,
    };

    try {
      await axios.put(`http://localhost:5000/artifacts/${id}`, updatedData);
      Swal.fire("Success", "Artifact updated successfully", "success");
      navigate("/my-artifacts");
    } catch (err) {
      Swal.fire("Error", "Failed to update artifact", "error");
    }
  };

  if (!artifact) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="max-w-xl mx-auto p-4 mt-10">
      <h2 className="text-2xl font-bold mb-4">Update Artifact</h2>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input name="name" defaultValue={artifact.name} className="w-full p-2 border rounded" required />
        <input name="image" defaultValue={artifact.image} className="w-full p-2 border rounded" required />
        <select name="type" defaultValue={artifact.type} className="w-full p-2 border rounded" required>
          <option value="">Select Type</option>
          <option value="Tools">Tools</option>
          <option value="Weapons">Weapons</option>
          <option value="Documents">Documents</option>
          <option value="Writings">Writings</option>
        </select>
        <input name="historicalContext" defaultValue={artifact.historicalContext} className="w-full p-2 border rounded" required />
        <input name="createdAt" defaultValue={artifact.createdAt} className="w-full p-2 border rounded" required />
        <input name="discoveredAt" defaultValue={artifact.discoveredAt} className="w-full p-2 border rounded" required />
        <input name="discoveredBy" defaultValue={artifact.discoveredBy} className="w-full p-2 border rounded" required />
        <input name="presentLocation" defaultValue={artifact.presentLocation} className="w-full p-2 border rounded" required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update Artifact
        </button>
      </form>
    </div>
  );
};

export default UpdateArtifact;
