import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Swal from 'sweetalert2';

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: 'Logged Out!',
          text: 'You have successfully logged out.',
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error('Logout error:', error);
        Swal.fire({
          icon: 'error',
          title: 'Oops!',
          text: 'Logout failed. Please try again.',
        });
      });
  };

  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 font-semibold rounded-md transition-all duration-200 ${
      isActive
        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
        : 'text-gray-700 hover:bg-blue-100 hover:text-blue-600'
    }`;

  const navLinks = (
    <>
      <li><NavLink to="/" className={navLinkStyle}>Home</NavLink></li>
      <li><NavLink to="/all-artifacts" className={navLinkStyle}>All Artifacts</NavLink></li>
      {user && (
        <>
          <li><NavLink to="/add-artifact" className={navLinkStyle}>Add Artifacts</NavLink></li>
          <li><NavLink to="/my-artifacts" className={navLinkStyle}>My Artifacts</NavLink></li>
          <li><NavLink to="/liked-artifacts" className={navLinkStyle}>Liked Artifacts</NavLink></li>
        </>
      )}
      <li><NavLink to="/blogs" className={navLinkStyle}>Blogs</NavLink></li>
    </>
  );

  return (
    <div className="navbar bg-white shadow-md sticky top-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-60 z-10"
          >
            {navLinks}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl font-extrabold text-blue-700">
          🏺 Historical Artifacts Tracker
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 space-x-2">{navLinks}</ul>
      </div>

      <div className="navbar-end">
        {!user ? (
          <Link to="/login" className="btn btn-primary">Login</Link>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={user.photoURL || 'https://i.ibb.co/2nS7tQc/default-avatar.png'} alt="User Avatar" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="mt-3 p-3 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 z-10"
            >
              <li className="text-center font-bold text-blue-700">{user.displayName || 'User'}</li>
              <div className="divider my-1" />
              <li><NavLink to="/my-artifacts" className={navLinkStyle}>My Artifacts</NavLink></li>
              <li><NavLink to="/liked-artifacts" className={navLinkStyle}>Liked Artifacts</NavLink></li>
              <li>
                <button onClick={handleLogOut} className="btn btn-sm btn-error text-white mt-2 w-full">
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
