import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { motion } from "framer-motion";
import { Mail, Lock, User, Image } from "lucide-react";
import { FcGoogle } from "react-icons/fc";

/* ---------------- Animated Background ---------------- */
const AnimatedBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <motion.div
      className="absolute w-[420px] h-[420px] bg-amber-500/20 blur-[120px] rounded-full"
      animate={{ x: [0, 120, -80, 0], y: [0, -100, 80, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      style={{ top: "10%", left: "5%" }}
    />

    <motion.div
      className="absolute w-[520px] h-[520px] bg-zinc-700/30 blur-[150px] rounded-full"
      animate={{ x: [0, -100, 120, 0], y: [0, 120, -100, 0] }}
      transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      style={{ bottom: "5%", right: "10%" }}
    />

    <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.035)_1px,transparent_0)] bg-[length:18px_18px] opacity-30" />
  </div>
);

/* ---------------- Glass Reflection ---------------- */
const GlassReflection = () => (
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-br from-white/10 via-white/0 to-transparent opacity-40 rounded-t-3xl" />
    <div className="absolute bottom-0 left-0 w-full h-1/4 bg-gradient-to-t from-white/5 to-transparent opacity-30 rounded-b-3xl" />
  </div>
);

const Register = () => {
  const { createUser, setUser, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    if (!passwordPattern.test(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters, include uppercase, lowercase, and a number.",
      });
      return;
    }

    createUser(email, password)
      .then((result) => {
        setUser(result.user);
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: `Welcome, ${name}!`,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: error.message,
        });
      });
  };

  const handleGoogleSignIn = () => {
    googleLogin()
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Google Sign-In Successful",
          text: `Welcome, ${result.user.displayName || "User"}!`,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Sign-In Failed",
          text: error.message,
        });
      });
  };

  return (
    <div className="relative min-h-screen bg-zinc-950 flex items-center justify-center px-4 py-20 overflow-hidden">
      <Helmet>
        <title>HistoriVault | Register</title>
      </Helmet>

      <AnimatedBackground />

      {/* ---------------- Glass Card ---------------- */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md bg-zinc-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl"
      >
        <GlassReflection />

        <div className="relative p-8">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-white mb-1">
              Create Account
            </h1>
            <p className="text-gray-400 text-sm">
              Join{" "}
              <span className="text-amber-400 font-semibold">
                HistoriVault
              </span>{" "}
              today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 ml-1">
                Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 ml-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="your@email.com"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                />
              </div>
            </div>

            {/* Photo */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 ml-1">
                Photo URL
              </label>
              <div className="relative">
                <Image className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="text"
                  name="photo"
                  required
                  placeholder="Profile picture URL"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-400" />
                <input
                  type="password"
                  name="password"
                  required
                  placeholder="Strong password"
                  className="w-full pl-11 pr-4 py-3 bg-white/10 border border-white/15 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400/40"
                />
              </div>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-600 text-black font-semibold hover:from-amber-300 hover:to-amber-500 transition shadow-lg"
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-700" />
            <span className="text-gray-400 text-xs">OR</span>
            <div className="flex-1 border-t border-gray-700" />
          </div>

          {/* Google */}
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white/10 border border-white/15 text-white hover:bg-white/15 transition"
          >
            <FcGoogle size={22} />
            <span className="text-sm font-medium">Continue with Google</span>
          </button>

          {/* Login */}
          <p className="mt-6 text-center text-xs text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-amber-400 hover:text-amber-300 font-semibold"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
