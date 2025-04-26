import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, BarChart2, Settings, Home, LogOut, User, Book } from 'lucide-react';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';

interface NavbarProps {
  user?: {
    name: string;
    avatar?: string;
  };
}

const Navbar: React.FC<NavbarProps> = ({ user }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const handleContactClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault(); 
    setIsMenuOpen(false);

    if (location.pathname === '/') {
      const ctaSection = document.getElementById('cta-section');
      if (ctaSection) {
        ctaSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/contact');
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Book className="h-8 w-8 text-blue-800" />
              <span className="ml-2 text-2xl font-bold bg-gradient-to-r from-blue-800 to-emerald-600 bg-clip-text text-transparent">
                LedgerSense
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/analytics" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                  Analytics
                </Link>
                <Link to="/predictions" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                  Predictions
                </Link>
                <Link to="/upload" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                  Upload File
                </Link>

                <div className="relative ml-3">
                  <div>
                    <button 
                      type="button" 
                      className="flex items-center max-w-xs rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      onClick={toggleProfile}
                    >
                      <Avatar src={user.avatar} name={user.name} size="sm" />
                    </button>
                  </div>
                  
                  {isProfileOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 z-10">
                      <Link 
                        to="/profile" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </Link>
                      <Link 
                        to="/logout" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </Link>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link to="/about" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                  About
                </Link>
                {/* <Link to="/features" className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium">
                  Features
                </Link> */}
                <a 
                  href={location.pathname === '/' ? '#cta-section' : '/contact'}
                  onClick={handleContactClick}
                  className="text-gray-700 hover:text-blue-800 px-3 py-2 text-sm font-medium cursor-pointer"
                >
                  Contact
                </a>
                <Link to="/login">
                  <Button variant="outline" size="sm">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-800 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {user ? (
              <>
                <Link 
                  to="/dashboard" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Home className="h-5 w-5 mr-2" />
                    Dashboard
                  </div>
                </Link>
                <Link 
                  to="/analytics" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2" />
                    Analytics
                  </div>
                </Link>
                <Link 
                  to="/predictions" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <BarChart2 className="h-5 w-5 mr-2" />
                    Predictions
                  </div>
                </Link>
                <Link 
                  to="/upload" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Book className="h-5 w-5 mr-2" />
                    Upload File
                  </div>
                </Link>
                <Link 
                  to="/profile" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </div>
                </Link>
                <Link 
                  to="/settings" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <Settings className="h-5 w-5 mr-2" />
                    Settings
                  </div>
                </Link>
                <Link 
                  to="/logout" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <LogOut className="h-5 w-5 mr-2" />
                    Sign out
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to="/about" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                {/* <Link 
                  to="/features" 
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Features
                </Link> */}
                <a 
                  href={location.pathname === '/' ? '#cta-section' : '/contact'}
                  onClick={handleContactClick}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-800 cursor-pointer"
                >
                  Contact
                </a>
                <Link 
                  to="/login" 
                  className="block px-3 py-2 text-base font-medium text-blue-800 bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link 
                  to="/signup" 
                  className="block px-3 py-2 text-base font-medium text-white bg-blue-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;