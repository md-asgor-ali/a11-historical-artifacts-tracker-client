import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import logo from "../assets/logo.jpg";
import { LogOut, Heart, Star } from "lucide-react";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const location = useLocation();

  // Theme state and toggler
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logged Out!",
          text: "You have successfully logged out.",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Logout error:", error);
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Logout failed. Please try again.",
        });
      });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location]);

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 font-semibold rounded-md transition-all duration-200 ${
      isActive
        ? "bg-purple-500 text-white"
        : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
    }`;

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle}>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/all-artifacts" className={navLinkStyle}>
          All Artifacts
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/add-artifact" className={navLinkStyle}>
              Add Artifacts
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-artifacts" className={navLinkStyle}>
              My Artifacts
            </NavLink>
          </li>
          <li>
            <NavLink to="/liked-artifacts" className={navLinkStyle}>
              Liked Artifacts
            </NavLink>
          </li>
        </>
      )}
      <li>
        <NavLink to="/blogs" className={navLinkStyle}>
          Blogs
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="bg-blue-100 shadow-md sticky top-0 z-50 w-full">
      <div className=" navbar w-11/12 mx-auto">
        <div className="navbar-start w-full">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-white rounded-box w-60 z-10"
            >
              {navLinks}
            </ul>
          </div>
          <Link
            to="/"
            className=" text-xl font-extrabold text-purple-500 flex items-center gap-2"
          >
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="hidden sm:inline">
              Historical Artifacts Tracker
            </span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
        </div>

        <div className="navbar-end flex items-center gap-3">
          {/* Theme toggle button */}
          <button
            onClick={handleThemeToggle}
            className="btn btn-sm btn-circle bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>

          {!user ? (
            <Link
              to="/login"
              className="btn bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold"
            >
              Login
            </Link>
          ) : (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full ring ring-purple-400 ring-offset-base-100 ring-offset-2">
                  <img
                    src={
                      user.photoURL ||
                      "https://i.ibb.co/2nS7tQc/default-avatar.png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </button>

              {userMenuOpen && (
                <ul className="absolute right-0 top-12 p-4 bg-white text-gray-800 rounded-lg shadow-lg w-56 space-y-2 z-50 animate-fade-in">
                  <li className="font-bold text-center text-purple-600">
                    {user.displayName || "User"}
                  </li>
                  <hr />
                  <li>
                    <NavLink
                      to="/my-artifacts"
                      className="flex items-center gap-2"
                    >
                      <Star size={16} /> My Artifacts
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/liked-artifacts"
                      className="flex items-center gap-2"
                    >
                      <Heart size={16} /> Liked Artifacts
                    </NavLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-2 text-red-500 hover:text-red-600 w-full"
                    >
                      <LogOut size={16} /> Logout
                    </button>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
