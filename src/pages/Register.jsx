import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

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
    console.log(photo)

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
        const user = result.user;
        setUser(user);
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-8">
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-6 animate-pulse">
          Register Now!
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="label text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              className="input input-bordered w-full"
              placeholder="Your name"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="label text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full"
              placeholder="Your email"
              required
            />
          </div>

          {/* Photo URL */}
          <div>
            <label className="label text-gray-700">Photo URL</label>
            <input
              type="text"
              name="photo"
              className="input input-bordered w-full"
              placeholder="Profile picture URL"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="label text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full"
              placeholder="Strong password"
              required
            />
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary bg-purple-600 hover:bg-purple-700 w-full text-white"
          >
            Register
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-sm text-gray-500">or</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* Google Sign-In */}
        <button
          onClick={handleGoogleSignIn}
          className="btn w-full bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
        >
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            viewBox="0 0 512 512"
            className="mr-2"
          >
            <path
              fill="#EA4335"
              d="M113 309l-15 58-57 1c-22-40-35-86-35-135s13-95 35-135l51 1 22 51c-9 26-13 54-13 83 0 29 4 57 12 83z"
            />
            <path
              fill="#34A853"
              d="M256 112c35 0 66 12 91 32l68-67C372 33 318 8 256 8c-94 0-174 54-214 133l61 48c26-74 97-127 179-127z"
            />
            <path
              fill="#4A90E2"
              d="M256 504c62 0 117-24 157-64l-67-54c-25 19-56 30-90 30-82 0-153-53-179-126l-61 48c39 79 120 133 214 133z"
            />
            <path
              fill="#FBBC05"
              d="M413 219H256v81h89c-12 33-37 58-89 58-53 0-98-36-114-85l-61 48c28 57 88 97 160 97 93 0 168-75 168-168 0-11-1-22-3-32z"
            />
          </svg>
          Continue with Google
        </button>

        {/* Login Redirect */}
        <p className="text-center text-sm mt-4 text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-600 underline hover:text-purple-800">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
