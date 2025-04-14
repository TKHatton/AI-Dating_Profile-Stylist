import React from 'react';
import { motion } from 'framer-motion';

const ReviewTable = ({ answers, questions, onEdit, onSubmit }) => {
  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-xl font-medium text-gray-800 mb-4">Review Your Answers</h2>
      <p className="text-gray-600 mb-6">Take a moment to review your answers before we create your profile.</p>
      
      <div className="space-y-4 mb-6">
        {questions.map((question, index) => (
          <div key={question.id} className="border border-slate-lavender rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-sm font-medium text-gray-700">{question.prompt}</h3>
              <button 
                onClick={() => onEdit(index)}
                className="text-teal text-sm hover:underline"
              >
                Edit
              </button>
            </div>
            <p className="text-gray-600">{answers[index] || "No answer provided"}</p>
          </div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={onSubmit}
          className="btn btn-primary px-8"
        >
          Generate My Profile
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewTable;
