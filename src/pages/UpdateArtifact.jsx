import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import {
  Tag,
  ImageIcon,
  FileText,
  Calendar,
  Search,
  User,
  MapPin,
  Upload,
} from "lucide-react";

const UpdateArtifact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [artifact, setArtifact] = useState(null);

  useEffect(() => {
    axiosSecure
      .get(`/artifacts/${id}`)
      .then((res) => setArtifact(res.data))
      .catch((err) => console.error("Failed to load artifact", err));
  }, [id, axiosSecure]);

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
      await axiosSecure.put(`/artifacts/${id}`, updatedData);
      Swal.fire("Success", "Artifact updated successfully", "success");
      navigate("/my-artifacts");
    } catch (err) {
      Swal.fire("Error", "Failed to update artifact", "error");
    }
  };

  if (!artifact)
    return (
      <div className="min-h-screen flex items-center justify-center text-amber-400 text-xl font-bold">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen relative overflow-hidden bg-black text-white py-14 px-4">
      <Helmet>
        <title>Update Artifact | Historical Artifacts Tracker</title>
      </Helmet>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-amber-600/10"></div>

      <motion.div
        className="max-w-4xl mx-auto relative z-10"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">
            Update{" "}
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Artifact
            </span>
          </h1>
          <p className="text-gray-400 mt-2">
            Modify artifact information with precision
          </p>
        </div>

        {/* Form Card */}
        <motion.form
          onSubmit={handleUpdate}
          className="p-8 rounded-3xl backdrop-blur-xl border border-white/10 shadow-2xl bg-black/70 space-y-6"
        >
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Tag className="h-4 w-4 text-amber-400" /> Artifact Name
            </label>
            <input
              name="name"
              defaultValue={artifact.name}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-amber-400 outline-none"
              required
            />
          </div>

          {/* Image */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <ImageIcon className="h-4 w-4 text-amber-400" /> Image URL
            </label>
            <input
              name="image"
              defaultValue={artifact.image}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-amber-400 outline-none"
              required
            />
          </div>

          {/* Type */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <FileText className="h-4 w-4 text-amber-400" /> Artifact Type
            </label>
            <select
              name="type"
              defaultValue={artifact.type}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-amber-400 outline-none"
              required
            >
              <option className="bg-black">Tools</option>
              <option className="bg-black">Weapons</option>
              <option className="bg-black">Documents</option>
              <option className="bg-black">Writings</option>
            </select>
          </div>

          {/* Historical Context */}
          <div>
            <label className="flex items-center gap-2 text-gray-300 mb-2">
              <Search className="h-4 w-4 text-amber-400" /> Historical Context
            </label>
            <input
              name="historicalContext"
              defaultValue={artifact.historicalContext}
              className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white focus:ring-2 focus:ring-amber-400 outline-none"
              required
            />
          </div>

          {/* Dates */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-2">
                <Calendar className="h-4 w-4 text-amber-400" /> Created At
              </label>
              <input
                name="createdAt"
                defaultValue={artifact.createdAt}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-2">
                <Search className="h-4 w-4 text-amber-400" /> Discovered At
              </label>
              <input
                name="discoveredAt"
                defaultValue={artifact.discoveredAt}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
                required
              />
            </div>
          </div>

          {/* Discoverer & Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-2">
                <User className="h-4 w-4 text-amber-400" /> Discovered By
              </label>
              <input
                name="discoveredBy"
                defaultValue={artifact.discoveredBy}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-300 mb-2">
                <MapPin className="h-4 w-4 text-amber-400" /> Present Location
              </label>
              <input
                name="presentLocation"
                defaultValue={artifact.presentLocation}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white"
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-6 flex justify-center">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-3 px-10 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg hover:from-amber-400 hover:to-amber-500"
            >
              <Upload className="h-5 w-5" />
              Update Artifact
            </motion.button>
          </div>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default UpdateArtifact;
