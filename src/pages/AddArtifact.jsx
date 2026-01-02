import React, { useContext, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertCircle,
  Calendar,
  Clock,
  Eye,
  EyeOff,
  FileText,
  ImageIcon,
  MapPin,
  Plus,
  Tag,
  Upload,
  Search,
  User 
} from "lucide-react";
import { useNavigate } from "react-router";

const AddArtifact = () => {
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    type: "",
    historicalContext: "",
    description: "",
    createdAt: "",
    discoveredAt: "",
    discoveredBy: "",
    presentLocation: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [showImagePreview, setShowImagePreview] = useState(false);

  const artifactTypes = [
    "Tools", "Weapons", "Documents", "Writings", "Pottery",
    "Stones", "Jewelry", "Coins", "Sculptures", "Textiles",
    "Religious Items", "Household Items", "Art", "Other",
  ];

  const loggedInUser = {
    name: user?.displayName || "NA",
    email: user?.email || "NA",
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));

    // Image preview
    if (name === "imageUrl") setImagePreview(value);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Artifact name is required";
    if (!formData.imageUrl.trim()) newErrors.imageUrl = "Image URL is required";
    if (!formData.type) newErrors.type = "Artifact type is required";
    if (!formData.historicalContext.trim()) newErrors.historicalContext = "Historical context is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    if (!formData.createdAt.trim()) newErrors.createdAt = "Creation date is required";
    if (!formData.discoveredAt.trim()) newErrors.discoveredAt = "Discovery date is required";
    if (!formData.discoveredBy.trim()) newErrors.discoveredBy = "Discoverer name is required";
    if (!formData.presentLocation.trim()) newErrors.presentLocation = "Present location is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const payload = { ...formData, adderName: user?.displayName, adderEmail: user?.email, likeCount: 0 };

    try {
      const res = await axiosSecure.post("/artifacts", payload);
      if (res.data.insertedId) {
        Swal.fire({ icon: "success", title: "Artifact Added!", text: "Artifact added successfully" });
        navigate("/all-artifacts");
      }
    } catch (err) {
      Swal.fire({ icon: "error", title: "Error", text: err.message });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };
  const inputVariants = { focus: { scale: 1.02, transition: { duration: 0.2 } }, blur: { scale: 1, transition: { duration: 0.2 } } };

  return (
    <div className="min-h-screen py-12 px-4 relative overflow-hidden bg-black">
      <Helmet><title>HistoriVault | Add Artifact</title></Helmet>

      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(251,191,36,0.1),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(251,191,36,0.08),transparent_50%)]"></div>

      {/* Floating icons */}
      {[Upload, Calendar, MapPin, FileText, Tag].map((Icon, i) => (
        <motion.div key={i} className="absolute text-amber-400/20"
          style={{ left: `${10 + i * 20}%`, top: `${5 + i * 15}%` }}
          animate={{ y: [0, -30, 0], rotate: [0, 10, -10, 0], opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 6 + i * 0.5, repeat: Infinity, delay: i * 1.2 }}
        >
          <Icon className="h-8 w-8" />
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div className="text-center mb-12" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <motion.div className="inline-flex items-center space-x-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20" whileHover={{ scale: 1.05 }}>
            <Plus className="h-5 w-5 text-amber-400" />
            <span className="text-amber-400 font-medium">Add New Discovery</span>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-wide">
            Submit <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">Artifact</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Share your archaeological discoveries with the global research community
          </p>
        </motion.div>

        {/* Form */}
        <motion.form onSubmit={handleSubmit} className="space-y-8" variants={containerVariants} initial="hidden" animate="visible">
          <div className="p-8 rounded-3xl backdrop-blur-xl border border-white/10 relative overflow-hidden"
            style={{ background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(20,20,20,0.9) 50%, rgba(0,0,0,0.8) 100%)" }}>
            
            {/* Glass reflection */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 pointer-events-none"></div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
              {/* Left Column */}
              <div className="space-y-6">
                {[
                  { label: "Artifact Name", name: "name", icon: Tag, type: "text" },
                  { label: "Artifact Type", name: "type", icon: FileText, type: "select" },
                  { label: "Created At", name: "createdAt", icon: Calendar, type: "text" },
                  { label: "Discovered At", name: "discoveredAt", icon: Search, type: "text" },
                  { label: "Discovered By", name: "discoveredBy", icon: User, type: "text" },
                  { label: "Present Location", name: "presentLocation", icon: MapPin, type: "text" },
                ].map(field => (
                  <motion.div key={field.name} variants={itemVariants}>
                    <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                      <field.icon className="h-4 w-4 text-amber-400" />
                      <span>{field.label}</span>
                      <span className="text-red-400">*</span>
                    </label>
                    <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                      {field.type === "select" ? (
                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${errors[field.name] ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"}`}
                        >
                          <option value="">Select artifact type...</option>
                          {artifactTypes.map(type => <option key={type} value={type} className="bg-gray-800 text-white">{type}</option>)}
                        </select>
                      ) : (
                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleInputChange}
                          placeholder={`Enter ${field.label.toLowerCase()}...`}
                          className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${errors[field.name] ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"}`}
                        />
                      )}
                    </motion.div>
                    {errors[field.name] && (
                      <motion.p className="mt-2 text-sm text-red-400 flex items-center space-x-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors[field.name]}</span>
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Image */}
                <motion.div variants={itemVariants}>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                    <ImageIcon className="h-4 w-4 text-amber-400" />
                    <span>Artifact Image URL</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <motion.div variants={inputVariants} whileFocus="focus" initial="blur">
                    <input
                      type="url"
                      name="imageUrl"
                      value={formData.imageUrl}
                      onChange={handleInputChange}
                      placeholder="https://example.com/artifact.jpg"
                      className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 ${errors.imageUrl ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"}`}
                    />
                  </motion.div>
                  {errors.imageUrl && (
                    <motion.p className="mt-2 text-sm text-red-400 flex items-center space-x-1" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.imageUrl}</span>
                    </motion.p>
                  )}

                  {/* Preview */}
                  {imagePreview && (
                    <motion.div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-400">Image Preview</span>
                        <button type="button" onClick={() => setShowImagePreview(!showImagePreview)} className="text-amber-400 hover:text-amber-300 transition-colors">
                          {showImagePreview ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                      <AnimatePresence>
                        {showImagePreview && (
                          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="relative rounded-xl overflow-hidden border border-white/20">
                            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" onError={e => (e.target.src = "/placeholder.svg")} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </motion.div>

                {/* Historical Context */}
                <motion.div variants={itemVariants}>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                    <Clock className="h-4 w-4 text-amber-400" />
                    <span>Historical Context</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="historicalContext"
                    value={formData.historicalContext}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Describe the historical context..."
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 resize-none ${errors.historicalContext ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"}`}
                  />
                  {errors.historicalContext && (
                    <motion.p className="mt-2 text-sm text-red-400 flex items-center space-x-1">
                      <AlertCircle className="h-4 w-4" />
                      <span>{errors.historicalContext}</span>
                    </motion.p>
                  )}
                </motion.div>

                {/* Description */}
                <motion.div variants={itemVariants}>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                    <FileText className="h-4 w-4 text-amber-400" />
                    <span>Short Description</span>
                    <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    placeholder="Provide a detailed description..."
                    className={`w-full px-4 py-3 bg-white/10 backdrop-blur-sm border rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-400/50 transition-all duration-300 resize-none ${errors.description ? "border-red-400/50 ring-2 ring-red-400/20" : "border-white/20"}`}
                  />
                  <div className="flex justify-between items-center mt-2">
                    {errors.description ? (
                      <motion.p className="text-sm text-red-400 flex items-center space-x-1">
                        <AlertCircle className="h-4 w-4" />
                        <span>{errors.description}</span>
                      </motion.p>
                    ) : <div></div>}
                    <span className={`text-sm ${formData.description.length < 20 ? "text-gray-400" : "text-green-400"}`}>{formData.description.length}/20 min</span>
                  </div>
                </motion.div>

                {/* Submitter Info */}
                <motion.div variants={itemVariants}>
                  <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-3">
                    <User className="h-4 w-4 text-amber-400" />
                    <span>Submitted By</span>
                  </label>
                  <div className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500/20 to-amber-600/20 rounded-full flex items-center justify-center border border-amber-400/20">
                      <User className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{loggedInUser.name}</p>
                      <p className="text-gray-400 text-sm">{loggedInUser.email}</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div className="mt-8 flex justify-center" variants={itemVariants}>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-3 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-lg bg-gradient-to-r from-amber-500 to-amber-600 text-black hover:from-amber-400 hover:to-amber-500 shadow-amber-600/30 hover:shadow-amber-500/40"
                whileHover={!isSubmitting ? { scale: 1.05 } : {}}
                whileTap={!isSubmitting ? { scale: 0.95 } : {}}
              >
                <Upload className="h-6 w-6" />
                <span>Add Artifact</span>
              </motion.button>
            </motion.div>
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default AddArtifact;
