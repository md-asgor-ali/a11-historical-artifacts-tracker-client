import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const { signIn, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: `Welcome back, ${result.user.displayName || "User"}!`,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-4">
      <div className="card w-full max-w-md bg-white p-8 rounded-3xl shadow-lg border border-blue-100">
        <h1 className="text-4xl text-center font-bold text-blue-700 mb-6">Login</h1>

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              required
              className="input input-bordered w-full focus:border-blue-500"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              required
              minLength="6"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
              title="Minimum 6 characters, 1 uppercase, 1 lowercase, and 1 number."
              className="input input-bordered w-full focus:border-blue-500"
            />
          </div>

          {/* Forgot Password */}
          <div className="text-right text-sm">
            <a href="#" className="text-blue-500 hover:underline">Forgot password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-blue-600 text-white w-full hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        {/* Divider */}
        <div className="divider text-sm text-gray-500">OR</div>

        {/* Google Sign In */}
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white text-gray-700 border border-gray-300 w-full hover:shadow-md transition"
        >
          <svg
            aria-label="Google logo"
            width="20"
            height="20"
            viewBox="0 0 512 512"
            className="mr-2"
          >
            <path fill="#EA4335" d="M113 309l-15 58-57 1c-22-40-35-86-35-135s13-95 35-135l51 1 22 51c-9 26-13 54-13 83 0 29 4 57 12 83z"/>
            <path fill="#34A853" d="M256 112c35 0 66 12 91 32l68-67C372 33 318 8 256 8c-94 0-174 54-214 133l61 48c26-74 97-127 179-127z"/>
            <path fill="#4A90E2" d="M256 504c62 0 117-24 157-64l-67-54c-25 19-56 30-90 30-82 0-153-53-179-126l-61 48c39 79 120 133 214 133z"/>
            <path fill="#FBBC05" d="M413 219H256v81h89c-12 33-37 58-89 58-53 0-98-36-114-85l-61 48c28 57 88 97 160 97 93 0 168-75 168-168 0-11-1-22-3-32z"/>
          </svg>
          Continue with Google
        </button>

        {/* Register */}
        <p className="text-sm text-center mt-4 text-gray-600">
          New here?{" "}
          <Link to="/register" className="text-blue-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
