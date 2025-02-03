
import React, { useState } from "react";
import logo from "../Asset/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 

  return (
    <>
      <div className="nav flex flex-wrap small: px-4 px-[60px] items-center justify-between h-[70px] bg-stone-900 md:h-[90px]">
        {/* Logo */}
        <img src={logo} className="w-[150px] object-cover md:w-[190px]" alt="Logo" />

        {/* Links */}
        <div className="links hidden md:flex items-center gap-[15px]">
          <Link className="transition-all hover:text-blue-500" to="/home">Home</Link>
          <Link className="transition-all hover:text-blue-500" to="/about">About</Link>
          <Link className="transition-all hover:text-blue-500" to="/services">Services</Link>
          <Link className="transition-all hover:text-blue-500" to="/contact">Contact</Link>
          <button
  onClick={() => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("fullName");
    
    setTimeout(() => navigate("/login"), 100); // Ensures localStorage is cleared before redirect
  }}
  className="btnNormal bg-red-500 transition-all hover:bg-red-600 px-[20px]"
>
  Logout
</button>

        </div>

        
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      
      <div className={`sm:hidden ${isMenuOpen ? "block" : "hidden"} !bg-transparent bg-gradient-to-br from-gray-900 via-gray-800 text-white`}>
        <Link
          className="block px-4 py-2 transition-all hover:text-blue-500"
          to="/home"
          onClick={() => setIsMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          className="block px-4 py-2 transition-all hover:text-blue-500"
          to="/about"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </Link>
        <Link
          className="block px-4 py-2 transition-all hover:text-blue-500"
          to="/services"
          onClick={() => setIsMenuOpen(false)}
        >
          Services
        </Link>
        <Link
          className="block px-4 py-2 transition-all hover:text-blue-500"
          to="/contact"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact
        </Link>
        <button
          onClick={() => {
            const token = localStorage.getItem("token");
            if (token) {
              localStorage.removeItem("token");
              localStorage.removeItem("isLoggedIn");
              localStorage.removeItem("fullName");
            }
            navigate("/login");
            window.location.reload();
          }}
          className="block w-full bg-red-500 text-center py-2 transition-all hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </>
  );
};

export default Navbar;



