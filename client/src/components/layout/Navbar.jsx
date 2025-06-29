import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { HomeIcon, DocumentPlusIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="bg-blue-500 w-8 h-8 rounded-md flex items-center justify-center">
                <DocumentPlusIcon className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">ResumeCraft</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/" className="flex items-center text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <HomeIcon className="h-5 w-5 mr-1" />
                  Dashboard
                </Link>
                <Link to="/editor" className="flex items-center text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  <DocumentPlusIcon className="h-5 w-5 mr-1" />
                  New Resume
                </Link>
                <div className="flex items-center space-x-2">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-8 h-8" />
                  <span className="text-gray-700 text-sm font-medium">{user.email}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center text-gray-600 hover:text-red-500 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <ArrowRightOnRectangleIcon className="h-5 w-5 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium">
                  Login
                </Link>
                <Link to="/register" className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;