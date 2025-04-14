import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import WelcomeCard from '../components/WelcomeCard';
import QuestionCard from '../components/QuestionCard';
import FeedbackDisplay from '../components/FeedbackDisplay';
import ReviewTable from '../components/ReviewTable';
import ProfileOutputCard from '../components/ProfileOutputCard';
import { questionFlow } from '../data/questionFlow';
import { extractTags, generateProfile } from '../utils/profileGenerator';

const encouragingFeedback = [
  "Great answer! I'm getting to know you better.",
  "Thanks for sharing that! It helps me understand your style.",
  "Perfect! That gives me a good sense of what matters to you.",
  "Awesome! I'm starting to see what makes you unique.",
  "Love it! That's exactly the kind of detail that will make your profile stand out.",
  "Excellent! Your personality is really shining through.",
  "Fantastic! This is helping me craft something authentic to you.",
  "Wonderful! I'm collecting all the best bits that make you, you.",
  "That's helpful! I'm piecing together what makes you special.",
  "Brilliant! I'm getting a clearer picture of your dating style."
];

export default function Home() {
  const [stage, setStage] = useState('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [profileData, setProfileData] = useState(null);
  
  const questions = questionFlow.questions;
  
  const handleStart = () => {
    setStage('questions');
  };
  
  const handleAnswerSubmit = (answer) => {
    // Save the answer
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
    
    // Show feedback
    const randomFeedback = encouragingFeedback[Math.floor(Math.random() * encouragingFeedback.length)];
    setFeedback(randomFeedback);
    setShowFeedback(true);
    
    // After a delay, move to the next question or review
    setTimeout(() => {
      setShowFeedback(false);
      
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setStage('review');
      }
    }, 2000);
  };
  
  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };
  
  const handleEdit = (index) => {
    setCurrentQuestionIndex(index);
    setStage('questions');
  };
  
  const handleGenerateProfile = () => {
    // Extract tags from answers
    const userTags = extractTags(answers, questions);
    
    // Generate profile based on tags
    const profile = generateProfile(userTags);
    setProfileData(profile);
    
    // Move to profile display stage
    setStage('profile');
  };
  
  const handleRestart = () => {
    setStage('welcome');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setProfileData(null);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        <AnimatePresence mode="wait">
          {stage === 'welcome' && (
            <WelcomeCard key="welcome" onStart={handleStart} />
          )}
          
          {stage === 'questions' && (
            <>
              {showFeedback ? (
                <FeedbackDisplay key="feedback" feedback={feedback} />
              ) : (
                <QuestionCard
                  key={`question-${currentQuestionIndex}`}
                  question={questions[currentQuestionIndex]}
                  currentQuestion={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                  onSubmit={handleAnswerSubmit}
                  onBack={handleBack}
                  isLastQuestion={currentQuestionIndex === questions.length - 1}
                />
              )}
            </>
          )}
          
          {stage === 'review' && (
            <ReviewTable
              key="review"
              answers={answers}
              questions={questions}
              onEdit={handleEdit}
              onSubmit={handleGenerateProfile}
            />
          )}
          
          {stage === 'profile' && profileData && (
            <ProfileOutputCard
              key="profile"
              profileData={profileData}
              onRestart={handleRestart}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
