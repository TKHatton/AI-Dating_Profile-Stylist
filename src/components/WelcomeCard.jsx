import React from 'react';
import { motion } from 'framer-motion';

const WelcomeCard = ({ onStart }) => {
  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <div className="w-32 h-32 mx-auto mb-4">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="10" y="10" width="80" height="80" rx="15" fill="#FBBCBC" />
            <rect x="20" y="20" width="60" height="60" rx="10" fill="#F8D7D7" />
            <path d="M35 40 H65 M35 50 H55 M35 60 H50" stroke="#BE233D" strokeWidth="3" strokeLinecap="round" />
            <circle cx="40" cy="30" r="5" fill="#BE233D" />
            <path d="M50 30 Q55 25 60 30 T70 30" stroke="#BE233D" strokeWidth="3" fill="none" />
          </svg>
        </div>
        <h1 className="text-3xl font-medium text-gray-800 mb-2">AI Dating Profile Stylist</h1>
        <p className="text-gray-600 mb-6">Let's create a magnetic dating profile that truly reflects who you are.</p>
      </div>
      
      <div className="bg-slate-lavender bg-opacity-10 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-medium text-steel-navy mb-2">Here's what we'll create:</h3>
        <ul className="space-y-2">
          <li className="text-gray-700">
            <span className="text-deep-rose mr-2">•</span> A personality-rich dating bio
          </li>
          <li className="text-gray-700">
            <span className="text-deep-rose mr-2">•</span> Photo prompt suggestions
          </li>
          <li className="text-gray-700">
            <span className="text-deep-rose mr-2">•</span> First message openers
          </li>
          <li className="text-gray-700">
            <span className="text-deep-rose mr-2">•</span> Dating app recommendations
          </li>
          <li className="text-gray-700">
            <span className="text-deep-rose mr-2">•</span> First date ideas
          </li>
        </ul>
      </div>
      
      <div className="text-center">
        <button 
          onClick={onStart}
          className="btn btn-primary px-8 py-3"
        >
          Let's Get Started
        </button>
      </div>
    </motion.div>
  );
};

export default WelcomeCard;
