import React, { useState } from 'react';
import { motion } from 'framer-motion';

const QuestionCard = ({ 
  question, 
  currentQuestion, 
  totalQuestions, 
  onSubmit, 
  onBack,
  isLastQuestion 
}) => {
  const [answer, setAnswer] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (answer.trim()) {
      onSubmit(answer);
      setAnswer('');
    }
  };

  const progressPercentage = ((currentQuestion) / totalQuestions) * 100;

  return (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Question {currentQuestion} of {totalQuestions}</span>
          <span>{Math.round(progressPercentage)}% Complete</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <h2 className="text-xl font-medium text-gray-800 mb-4">{question.prompt}</h2>
      
      <form onSubmit={handleSubmit}>
        <textarea
          className="input-field min-h-[120px] mb-4"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          required
        />
        
        <div className="flex justify-between">
          {currentQuestion > 1 ? (
            <button 
              type="button" 
              onClick={onBack}
              className="btn btn-outline"
            >
              ← Back
            </button>
          ) : (
            <div></div>
          )}
          
          <button 
            type="submit" 
            className="btn btn-primary"
          >
            {isLastQuestion ? "Finish" : "Next →"}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default QuestionCard;
