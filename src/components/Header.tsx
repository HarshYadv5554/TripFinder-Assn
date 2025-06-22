import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, User, Heart, MapPin, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    setIsMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-gradient-to-r from-teal-600 to-teal-700 p-2 rounded-xl group-hover:shadow-lg transition-shadow">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">StayFinder</span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex items-center bg-white border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow">
            <button 
              onClick={() => navigate('/search')}
              className="flex items-center space-x-4 px-6 py-3 w-96"
            >
              <div className="flex-1 text-left">
                <span className="text-sm font-medium text-gray-700">Where</span>
                <p className="text-xs text-gray-500">Search destinations</p>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex-1 text-left">
                <span className="text-sm font-medium text-gray-700">When</span>
                <p className="text-xs text-gray-500">Add dates</p>
              </div>
              <div className="h-6 w-px bg-gray-300"></div>
              <div className="flex-1 text-left">
                <span className="text-sm font-medium text-gray-700">Who</span>
                <p className="text-xs text-gray-500">Add guests</p>
              </div>
              <div className="bg-teal-600 p-3 rounded-full ml-2">
                <Search className="h-4 w-4 text-white" />
              </div>
            </button>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/host" 
              className="hidden md:block text-sm font-medium text-gray-700 hover:text-teal-600 transition-colors"
            >
              Become a Host
            </Link>
            
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 p-2 border border-gray-300 rounded-full hover:shadow-md transition-shadow"
              >
                <Menu className="h-4 w-4 text-gray-600" />
                <div className="bg-gray-500 p-1 rounded-full">
                  <User className="h-4 w-4 text-white" />
                </div>
              </button>

              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="text-sm font-medium text-gray-900">
                          {user.user_metadata?.name || user.email}
                        </p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                      <Link
                        to="/host"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Host your home
                      </Link>
                      <Link
                        to="/trips"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Your trips
                      </Link>
                      <Link
                        to="/favorites"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlists
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Log in
                      </Link>
                      <Link
                        to="/register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Sign up
                      </Link>
                      <hr className="my-2 border-gray-100" />
                      <Link
                        to="/host"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Host your home
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search Button */}
          <button 
            onClick={() => navigate('/search')}
            className="md:hidden p-2 text-gray-600"
          >
            <Search className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;