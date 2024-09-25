import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/logo.jpg';

export default function Navbar({ showAdmin, showR, showOther, showSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  const handleRegisterClick = () => {
    navigate('/home');
  };

  const handleAdminClick = () => {
    navigate('/admin');
  };

  const scrollToFooter = (e) => {
    e.preventDefault();
    document.getElementById('footer').scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu after click
  };

  const scrollToServices = (e) => {
    e.preventDefault();
    document.getElementById('services').scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false); // Close mobile menu after click
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const handleLogoClick = () => {
    
      navigate('/');
    
  };

  return (
    <div>
      <nav className="bg-docsoGreen p-2 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              onClick={handleLogoClick}
              alt="Docso Logo"
              className="h-20 w-20 rounded-full border-2 border-white"
            />
          </div>

          {/* Hamburger Menu for Mobile */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu} // Add a function to handle menu toggle
              className="text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {/* Navigation Links (Desktop View) */}
          {showOther && (
            <ul className="hidden md:flex flex-grow justify-center space-x-6 text-white">
              <li className="hover:text-lightGreen">
                <Link to="/">Home</Link>
              </li>
              <li className="hover:text-lightGreen">
                <Link to="/" onClick={scrollToServices}> Services </Link>
              </li>
              <li className="hover:text-lightGreen">
                <Link to="/" onClick={scrollToFooter}> Contact </Link>
              </li>
            </ul>
          )}

          {/* Search bar (Desktop View) */}
          {showSearch && (
            <div className="hidden md:flex items-center">
              <form onSubmit={handleSearchSubmit} className="flex">
                <input
                  type="text"
                  placeholder="Search Hospitals or Doctors..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-docsoGreen"
                />
                <button
                  type="submit"
                  className="bg-docsoGreen text-white px-4 py-2 rounded-r-md hover:bg-darkGreen transition duration-300"
                >
                  Search
                </button>
              </form>
            </div>
          )}

          {/* Admin & Register Buttons (Desktop View) */}
          <div className="hidden md:flex space-x-4">
            
              <button
                className="text-docsoGreen bg-white px-4 py-2 rounded-md hover:bg-docsoGreen hover:text-white transition duration-300"
                onClick={handleAdminClick}
              >
                Admin
              </button>
            
            
            {showR && (
              <button
                className="text-white border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-docsoGreen transition duration-300"
                onClick={handleRegisterClick}
              >
                Register Yourself
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu (show when toggleMobileMenu is clicked) */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-docsoGreen p-4">
            {showOther && (
              <ul className="space-y-4 text-white">
                <li className="hover:text-docsoGreen">
                  <Link to="/" onClick={toggleMobileMenu}>Home</Link>
                </li>
                <li className="hover:text-docsoGreen">
                  <Link to="/" onClick={scrollToServices}>Services</Link>
                </li>
                <li className="hover:text-docsoGreen">
                  <Link to="/" onClick={scrollToFooter}>Contact</Link>
                </li>
              </ul>
            )}
            {showSearch && (
              <div className="mt-4">
                <form onSubmit={handleSearchSubmit} className="flex">
                  <input
                    type="text"
                    placeholder="Search Hospitals or Doctors..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-docsoGreen"
                  />
                  <button
                    type="submit"
                    className="bg-docsoGreen text-white px-4 py-2 rounded-r-md hover:bg-darkGreen transition duration-300"
                  >
                    Search
                  </button>
                </form>
              </div>
            )}

            <div className="mt-4">
              {showAdmin && (
                <button
                  className="w-full text-docsoGreen bg-white px-4 py-2 rounded-md hover:bg-docsoGreen hover:text-white transition duration-300"
                  onClick={handleAdminClick}
                >
                  Admin
                </button>
              )}
              {showR && (
                <button
                  className="w-full mt-4 text-white border-2 border-white px-4 py-2 rounded-md hover:bg-white hover:text-docsoGreen transition duration-300"
                  onClick={handleRegisterClick}
                >
                  Register Yourself
                </button>
              )}
            </div>
          </div>
        )}
      </nav>
      <div className="h-5 bg-lightGreen"></div>
    </div>
  );
}