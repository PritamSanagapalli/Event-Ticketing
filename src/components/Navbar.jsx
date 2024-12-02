import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Ticket, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/events?search=${searchQuery}`);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <Ticket className="h-8 w-8 text-indigo-600" />
            <span className="font-bold text-xl text-gray-800">EventHub</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" className="absolute right-3 top-2.5">
                <Search className="h-5 w-5 text-gray-400" />
              </button>
            </form>
            
            <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
            <Link to="/events" className="text-gray-600 hover:text-indigo-600">Events</Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact</Link>
            
            {isAuthenticated ? (
              <button
                onClick={logout}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/"
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden rounded-lg p-2 hover:bg-gray-100"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="mb-4">
              <input
                type="text"
                placeholder="Search events..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </form>
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-600 hover:text-indigo-600">Home</Link>
              <Link to="/events" className="text-gray-600 hover:text-indigo-600">Events</Link>
              <Link to="/about" className="text-gray-600 hover:text-indigo-600">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact</Link>
              {isAuthenticated ? (
                <button
                  onClick={logout}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-center"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;