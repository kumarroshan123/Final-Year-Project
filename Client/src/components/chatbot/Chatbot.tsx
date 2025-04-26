import React, { useState } from 'react';
import { BsChatDots } from 'react-icons/bs'; // Example chat icon
import { IoClose } from "react-icons/io5"; // Example close icon
// import './Chatbot.css'; // Remove CSS import

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 z-50"
        aria-label="Open chat"
      >
        <BsChatDots size={24} />
      </button>
    );
  }

  return (
    <div className="fixed bottom-5 right-5 w-80 h-96 border border-gray-300 rounded-lg bg-white shadow-lg flex flex-col overflow-hidden z-50">
      <div className="bg-gray-100 p-3 font-bold border-b border-gray-300 flex justify-between items-center">
        <span>Chatbot</span>
        <button 
          onClick={toggleChat} 
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
  );
};

export default Chatbot; 