import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router"; // ✅ Correct import
import logo from "../assets/logo.jpg"; // ✅ Replace with your actual logo path

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 text-gray-800 pt-12 pb-8 px-6 mt-16 shadow-inner rounded-t-3xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Branding with logo */}
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <img
              src={logo}
              alt="Logo"
              className="w-12 h-12 rounded-xl shadow-md border border-purple-300"
            />
            <h2 className="text-xl font-bold text-purple-700">
              Historical Artifacts Tracker
            </h2>
          </div>
          <p className="text-sm text-gray-700">
            Discover, preserve, and celebrate history. Your digital archive of ancient wonders. 🏺
          </p>
          <div className="flex space-x-4 mt-4 text-purple-600">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-xl hover:text-blue-600 transition-transform hover:scale-125" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-xl hover:text-sky-500 transition-transform hover:scale-125" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="text-xl hover:text-pink-500 transition-transform hover:scale-125" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="text-xl hover:text-blue-700 transition-transform hover:scale-125" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-semibold text-purple-700 mb-3">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
            <li><Link to="/all-artifacts" className="hover:text-purple-600">All Artifacts</Link></li>
            <li><Link to="/add-artifact" className="hover:text-purple-600">Add Artifact</Link></li>
            <li><Link to="/blogs" className="hover:text-purple-600">Blogs</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-lg font-semibold text-purple-700 mb-3">Support</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="#" className="hover:text-purple-600">Contact Us</a></li>
            <li><a href="#" className="hover:text-purple-600">Help Center</a></li>
            <li><a href="#" className="hover:text-purple-600">Report Issue</a></li>
            <li><a href="#" className="hover:text-purple-600">Partnerships</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold text-purple-700 mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="#" className="hover:text-purple-600">Terms of Use</a></li>
            <li><a href="#" className="hover:text-purple-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-purple-600">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-12 border-t pt-6 relative text-center text-sm text-gray-600">
        <p>
          &copy; {currentYear} <span className="font-semibold text-purple-600">Historical Artifacts Tracker</span> — All rights reserved.
        </p>
        <a
          href="#top"
          title="Back to Top"
          className="absolute right-6 top-2 text-purple-500 hover:text-purple-700 transition transform hover:scale-110"
        >
          <FaArrowUp className="text-lg" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
