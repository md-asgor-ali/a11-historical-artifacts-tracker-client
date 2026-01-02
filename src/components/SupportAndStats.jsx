import { motion } from "framer-motion";
import { Users, Globe, BookOpen, Clock, Star } from "lucide-react";
import { useNavigate } from "react-router";

const SupportAndStats = () => {
  const navigate = useNavigate();

  const linkToContactSupport = () => navigate("/contact-support");
  const linkToBrowseDocumentaion = () => navigate("/browse-documentation");

  const stats = [
    { number: "24/7", label: "Expert Support", icon: Clock },
    { number: "98%", label: "Satisfaction Rate", icon: Star },
    { number: "500+", label: "Research Partners", icon: Users },
    { number: "50+", label: "Countries Served", icon: Globe },
  ];

  return (
    <section
      className="relative py-20 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, rgba(20,20,20,0.95) 0%, rgba(30,30,30,0.98) 50%, rgba(20,20,20,0.95) 100%)",
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-amber-600/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(251,191,36,0.08),transparent_50%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.05),transparent_50%)]"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Title & Subtitle */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 bg-clip-text text-transparent">
              Support
            </span>{" "}
            & Platform Stats
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Explore our support resources and see a snapshot of our community and global reach.
          </p>
        </motion.div>

        {/* Support Card */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-block p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:shadow-2xl transition-all duration-500">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 flex items-center justify-center backdrop-blur-sm border border-amber-300/20">
                <Users className="h-8 w-8 text-amber-400" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">Still have questions?</h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Our expert team is here to help you explore the fascinating world of historical artifacts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={linkToContactSupport}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-medium hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-600/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Globe className="h-5 w-5" />
                <span>Contact Support</span>
              </motion.button>

              <motion.button
                onClick={linkToBrowseDocumentaion}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <BookOpen className="h-5 w-5" />
                <span>Browse Documentation</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 hover:scale-105 hover:-translate-y-2 transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.6 }}
            >
              <stat.icon className="h-8 w-8 text-amber-400 mx-auto mb-3" />
              <div className="text-3xl font-bold text-white mb-1">{stat.number}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SupportAndStats;
