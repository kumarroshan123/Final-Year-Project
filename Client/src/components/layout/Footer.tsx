import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Book } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();

  // Generic handler for footer links
  const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, targetPath: string) => {
    if (location.pathname === targetPath) {
      event.preventDefault(); // Prevent navigation if already on the target page
      window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top
    }
    // If not on the target page, the Link component will handle navigation
  };

  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-inner">
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
          {/* Brand */}
          <div className="flex flex-col h-full justify-between border-b md:border-b-0 md:border-r border-gray-800 pb-8 md:pb-0 md:pr-8">
            <div>
              <div className="flex items-center mb-4">
                <Book className="h-9 w-9 text-blue-400" />
                <span className="ml-2 text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                  LedgerSense
                </span>
              </div>
              <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                Transforming traditional business records into actionable insights with OCR and analytics.
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2 md:px-8 border-b md:border-b-0 md:border-r border-gray-800 pb-8 md:pb-0">
            <h3 className="text-lg font-semibold mb-4 tracking-wide">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" onClick={(e) => handleLinkClick(e, '/')} className="text-gray-300 hover:text-white transition">Home</Link>
              </li>
              <li>
                <Link to="/about" onClick={(e) => handleLinkClick(e, '/about')} className="text-gray-300 hover:text-white transition">About Us</Link>
              </li>
              <li>
                <Link to="/pricing" onClick={(e) => handleLinkClick(e, '/pricing')} className="text-gray-300 hover:text-white transition">Pricing</Link>
              </li>
              <li>
                <Link to="/contact" onClick={(e) => handleLinkClick(e, '/contact')} className="text-gray-300 hover:text-white transition">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="flex flex-col gap-2 md:px-8">
            <h3 className="text-lg font-semibold mb-4 tracking-wide">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="text-gray-300 hover:text-white transition">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition">Help Center</Link>
              </li>
              <li>
                <Link to="/demo" className="text-gray-300 hover:text-white transition">Tutorials</Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white transition">FAQs</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-300 text-sm text-center">
            &copy; {currentYear} LedgerSense. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;