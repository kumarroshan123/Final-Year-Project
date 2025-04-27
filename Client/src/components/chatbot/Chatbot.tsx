import React, { useState, useEffect } from 'react';
import { BsChatDots } from 'react-icons/bs';
import { IoClose } from "react-icons/io5"; 
import { useLocation } from 'react-router-dom';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // Get location object

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Close chatbot on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
      {/* Chat Window */} 
      {isOpen && (
        <div className="absolute bottom-full right-0 mb-2 w-80 h-96 border border-gray-300 rounded-lg bg-white shadow-lg flex flex-col overflow-hidden">
          <div className="bg-gray-100 p-3 font-bold border-b border-gray-300 flex justify-between items-center">
            <span>Chatbot</span>
            <button 
              onClick={toggleChat} // Close button inside window also toggles
              className="text-gray-500 hover:text-gray-800"
              aria-label="Close chat"
            >
              <IoClose size={20} />
            </button>
          </div>
          <div className="flex-grow p-3 overflow-y-auto">
            {/* Chat messages will go here */}
            <p>Hello! How can I help you today?</p>
          </div>
          <div className="flex border-t border-gray-300 p-3">
            <input 
              type="text" 
              placeholder="Type your message..." 
              className="flex-grow p-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
              Send
            </button>
          </div>
        </div>
      )}

      {/* Chat Icon Button */}
      <button 
        onClick={toggleChat} // Icon button now toggles
        className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-auto" // Ensure button is at the bottom if container grows
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? <IoClose size={24} /> : <BsChatDots size={24} />}
      </button>
    </div>
  );
};

export default Chatbot; 