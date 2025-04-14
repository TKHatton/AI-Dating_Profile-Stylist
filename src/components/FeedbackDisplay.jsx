import React from 'react';
import { motion } from 'framer-motion';

const FeedbackDisplay = ({ feedback }) => {
  return (
    <motion.div 
      className="card mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <div className="text-deep-rose text-2xl mb-2">✨</div>
        <p className="text-gray-700">{feedback}</p>
      </div>
    </motion.div>
  );
};

export default FeedbackDisplay;
