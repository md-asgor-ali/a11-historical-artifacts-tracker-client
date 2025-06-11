import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-100 to-blue-50 text-gray-800 pt-12 pb-8 px-4 mt-16 shadow-inner rounded-t-3xl">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 px-4">
        {/* Branding */}
        <div>
          <h2 className="text-2xl font-bold text-blue-800 mb-2">
            Historical Artifacts Tracker
          </h2>
          <p className="text-sm text-gray-600">
            Discover, preserve, and celebrate history. Your personal archive of
            ancient wonders. 🏺
          </p>
          <div className="flex space-x-4 mt-4 text-blue-600">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <FaFacebookF className="text-xl hover:text-blue-800 transition-transform hover:scale-125" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <FaTwitter className="text-xl hover:text-blue-800 transition-transform hover:scale-125" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <FaInstagram className="text-xl hover:text-pink-600 transition-transform hover:scale-125" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer">
              <FaLinkedinIn className="text-xl hover:text-blue-700 transition-transform hover:scale-125" />
            </a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="footer-title font-bold text-blue-700 mb-2">
            Navigation
          </h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <Link to="/" className="hover:text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <Link to="/all-artifacts" className="hover:text-blue-700">
                All Artifacts
              </Link>
            </li>
            <li>
              <Link to="/add-artifact" className="hover:text-blue-700">
                Add Artifact
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="hover:text-blue-700">
                Blogs
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="footer-title font-bold text-blue-700 mb-2">Support</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <a href="#" className="hover:text-blue-700">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Report Issue
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Partnerships
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="footer-title font-bold text-blue-700 mb-2">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>
              <a href="#" className="hover:text-blue-700">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-blue-700">
                Cookie Policy
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 text-center text-sm text-gray-500 border-t pt-6 relative">
        <p>
          &copy; {currentYear} Historical Artifacts Tracker — All rights
          reserved.
        </p>
        <a
          href="#top"
          className="absolute right-4 top-4 text-blue-600 hover:text-blue-800 transition"
          title="Back to top"
        >
          <FaArrowUp className="text-lg" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
