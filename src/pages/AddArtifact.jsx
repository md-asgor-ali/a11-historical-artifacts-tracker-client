import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";

const AddArtifact = () => {
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    type: "Tools",
    context: "",
    shortDesc: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    location: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newArtifact = {
      ...formData,
      adderName: user?.displayName,
      adderEmail: user?.email,
      likeCount: 0,
    };

    try {
      const response = await axios.post("http://localhost:5000/artifacts", newArtifact);
      if (response.data.insertedId) {
        Swal.fire({
          icon: "success",
          title: "Artifact Added!",
          text: "The artifact has been added successfully.",
        });
        e.target.reset();
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to add artifact. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Add New Artifact</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <input type="text" name="name" placeholder="Artifact Name" onChange={handleChange} required className="input input-bordered w-full" />
        <input type="url" name="image" placeholder="Artifact Image URL" onChange={handleChange} required className="input input-bordered w-full" />
        <select name="type" onChange={handleChange} required className="select select-bordered w-full">
          <option>Tools</option>
          <option>Weapons</option>
          <option>Documents</option>
          <option>Writings</option>
        </select>
        <textarea name="context" placeholder="Historical Context" onChange={handleChange} required className="textarea textarea-bordered w-full"></textarea>
        <textarea name="shortDesc" placeholder="Short Description" onChange={handleChange} required className="textarea textarea-bordered w-full"></textarea>
        <input type="text" name="createdAt" placeholder="Created At (e.g., 100 BC)" onChange={handleChange} required className="input input-bordered w-full" />
        <input type="text" name="discoveredAt" placeholder="Discovered At (e.g., 1799)" onChange={handleChange} required className="input input-bordered w-full" />
        <input type="text" name="discoveredBy" placeholder="Discovered By" onChange={handleChange} required className="input input-bordered w-full" />
        <input type="text" name="location" placeholder="Present Location" onChange={handleChange} required className="input input-bordered w-full" />
        <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full bg-gray-100" />
        <input type="email" value={user?.email} readOnly className="input input-bordered w-full bg-gray-100" />
        <button type="submit" className="btn btn-primary w-full">Add Artifact</button>
      </form>
    </div>
  );
};

export default AddArtifact;
