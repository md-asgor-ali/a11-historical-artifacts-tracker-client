import React, { useState, useRef, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router";
import {
  Menu,
  X,
  User,
  LogOut,
  Heart,
  BookOpen,
  Home,
  PlusCircle,
  Star,
} from "lucide-react";
import navLogo from "../assets/logo.png";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

// ================= LINKS =================
const navigationLinks = [
  { name: "Home", to: "/", icon: <Home className="h-4 w-4" /> },
  {
    name: "All Artifacts",
    to: "/all-artifacts",
    icon: <BookOpen className="h-4 w-4" />,
  },
  { name: "Blogs", to: "/blogs", icon: <BookOpen className="h-4 w-4" /> },
];

const userLinks = [
  {
    name: "Add Artifact",
    to: "/add-artifact",
    icon: <PlusCircle className="h-4 w-4" />,
  },
  {
    name: "My Artifacts",
    to: "/my-artifacts",
    icon: <Star className="h-4 w-4" />,
  },
  {
    name: "Liked Artifacts",
    to: "/liked-artifacts",
    icon: <Heart className="h-4 w-4" />,
  },
];

// ================= NAV ITEM =================
const NavItem = ({ to, icon, name, onClick }) => (
  <NavLink to={to} onClick={onClick}>
    {({ isActive }) => (
      <div
        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
          isActive
            ? "text-amber-300 bg-amber-500/20 border border-amber-400/30"
            : "text-gray-200 hover:text-amber-300 hover:bg-white/10"
        }`}
      >
        <div className="flex items-center gap-2">
          {icon}
          <span>{name}</span>
        </div>
      </div>
    )}
  </NavLink>
);

// ================= USER DROPDOWN LINKS =================
const userDropdownLinks = (user) => {
  return userLinks;
};

// ================= NAVBAR =================
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Logged out successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Logout failed",
          text: error.message,
        });
      });
  };

  const handleNavLinkClick = (to) => {
    setDropdownOpen(false);
    setIsOpen(false);
    navigate(to);
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/80 backdrop-blur-xl shadow-2xl border-b border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-30 pointer-events-none" />
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 md:h-20 items-center justify-between">
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <NavLink
              to="/"
              onClick={() => setIsOpen(false)}
              className="group flex items-center space-x-2 md:space-x-3"
            >
              <div className="flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-br from-amber-400/90 to-amber-600/90 shadow-lg shadow-amber-500/30 transition-all duration-300 group-hover:scale-110 group-hover:shadow-amber-500/50 backdrop-blur-sm border border-amber-300/20">
                <img
                  src={navLogo || "/placeholder.svg"}
                  alt="HistoriVault Logo"
                  className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-white tracking-wide drop-shadow-lg">
                  HistoriVault
                </span>
                <span className="text-[10px] md:text-xs text-amber-400/90 tracking-wider font-medium">
                  HISTORICAL ARTIFACTS
                </span>
              </div>
            </NavLink>
          </div>

          {/* NAV LINKS - CENTER */}
          <div className="hidden md:flex flex-1 justify-center items-center">
            <div className="flex items-center space-x-1 bg-white/5 rounded-full px-2 py-1 backdrop-blur-sm border border-white/10">
              {/* Main navigation links */}
              {navigationLinks.map((link) => (
                <NavItem
                  key={link.name}
                  to={link.to}
                  icon={link.icon}
                  name={link.name}
                />
              ))}

              {/* User-specific links */}
              {user &&
                userLinks.map((link) => (
                  <NavItem
                    key={link.name}
                    to={link.to}
                    icon={link.icon}
                    name={link.name}
                  />
                ))}
            </div>
          </div>

          {/* RIGHT SIDE: USER */}
          <div className="flex-shrink-0 flex items-center justify-end space-x-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 px-1 py-1 rounded-full bg-white/10 border border-amber-400/20 hover:bg-amber-400/10 focus:outline-none transition-all"
                >
                  <img
                    src={user.photoURL || "/placeholder.svg"}
                    alt={user.displayName || "User"}
                    className="h-8 w-8 md:h-10 md:w-10 rounded-full object-cover border-2 border-amber-400/40 shadow"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-black/90 rounded-xl shadow-xl border border-white/10 py-2 px-2 z-50 backdrop-blur-xl animate-fadeIn">
                    <div className="flex items-center mb-3 gap-2 px-2 pt-2">
                      <img
                        src={user.photoURL || "/placeholder.svg"}
                        alt={user.displayName || "User"}
                        className="h-10 w-10 rounded-full object-cover border border-amber-400/40"
                      />
                      <div>
                        <div className="font-bold text-white text-sm truncate">
                          {user.displayName || "User"}
                        </div>
                        <div className="text-xs text-amber-300 truncate">
                          {user.email}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 mb-2">
                      {userDropdownLinks(user).map((link) => (
                        <button
                          key={link.name}
                          onClick={() => handleNavLinkClick(link.to)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-gray-200 hover:bg-amber-400/20 hover:text-amber-400 transition-all text-left"
                        >
                          {link.icon}
                          {link.name}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={handleLogOut}
                      className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-red-500/10 transition-all text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/login"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-black font-medium text-sm hover:from-amber-400/90 hover:to-amber-500/90 transition-all duration-300 shadow-lg shadow-amber-600/30 hover:shadow-amber-500/40 backdrop-blur-sm border border-amber-300/20 hover:scale-105"
              >
                <User className="h-4 w-4" />
                <span>Login</span>
              </NavLink>
            )}

            {/* MOBILE MENU BUTTON */}
            <div className="flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-full bg-white/10 text-gray-200 hover:bg-white/20 hover:text-white transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-400/50 backdrop-blur-sm border border-white/10"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3 border-t border-white/10 bg-black/95 backdrop-blur-lg">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center space-x-3 px-4 py-3 text-base font-medium rounded-lg transition-all duration-300 ${
                  isActive
                    ? "text-amber-300 bg-amber-500/20 border border-amber-400/30 shadow-lg shadow-amber-500/20"
                    : "text-gray-200 hover:bg-white/10 hover:text-amber-300"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`p-2 rounded-lg ${
                      isActive ? "bg-amber-500/20" : "bg-white/10"
                    }`}
                  >
                    {link.icon}
                  </span>
                  <span>{link.name}</span>
                </>
              )}
            </NavLink>
          ))}

          {/* Mobile User Section */}
          {user ? (
            <div className="pt-2 border-t border-white/10 mt-2">
              <div className="flex flex-col gap-1">
                {userDropdownLinks(user).map((link) => (
                  <button
                    key={link.name}
                    onClick={() => handleNavLinkClick(link.to)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-base text-gray-200 hover:bg-amber-400/20 hover:text-amber-400 transition-all"
                  >
                    <span className="p-2 rounded-lg bg-white/10">
                      {link.icon}
                    </span>
                    <span>{link.name}</span>
                  </button>
                ))}
                <button
                  onClick={handleLogOut}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-base text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <span className="p-2 rounded-lg bg-white/10">
                    <LogOut className="h-5 w-5" />
                  </span>
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center gap-2 w-full mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-amber-500/90 to-amber-600/90 text-black font-medium hover:from-amber-400/90 hover:to-amber-500/90 transition-all duration-300 shadow-lg shadow-amber-600/30"
            >
              <User className="h-5 w-5" />
              <span>Login to Your Account</span>
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
