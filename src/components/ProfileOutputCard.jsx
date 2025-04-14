import React from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ProfileOutputCard = ({ profileData, onRestart }) => {
  const { bio, photo_prompts, first_messages, app_suggestions, first_date_ideas } = profileData;
  
  const downloadAsPDF = async () => {
    const element = document.getElementById('profile-card');
    const canvas = await html2canvas(element, {
      scale: 2,
      logging: false,
      useCORS: true,
      backgroundColor: '#ffffff'
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });
    
    const imgWidth = 210;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save('my-dating-profile.pdf');
  };
  
  return (
    <motion.div 
      className="card"
      id="profile-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-6">
        <div className="text-deep-rose text-3xl mb-2">✨</div>
        <h2 className="text-2xl font-medium text-gray-800">Your Dating Profile</h2>
        <p className="text-gray-600">Here's your personalized dating profile content</p>
      </div>
      
      <div className="space-y-6 mb-8">
        <div className="bg-slate-lavender bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-deep-rose mb-2">Your Bio</h3>
          <p className="text-gray-700">{bio}</p>
        </div>
        
        <div className="bg-teal bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-teal mb-2">Photo Ideas</h3>
          <ul className="space-y-2">
            {photo_prompts.map((prompt, index) => (
              <li key={index} className="text-gray-700">
                <span className="text-teal mr-2">•</span> {prompt}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-soft-gold bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-steel-navy mb-2">First Message Ideas</h3>
          <ul className="space-y-2">
            {first_messages.map((message, index) => (
              <li key={index} className="text-gray-700">
                <span className="text-soft-gold mr-2">•</span> {message}
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-steel-navy bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-steel-navy mb-2">Recommended Apps</h3>
          <div className="flex flex-wrap gap-2">
            {app_suggestions.map((app, index) => (
              <span key={index} className="bg-white px-3 py-1 rounded-full text-sm border border-steel-navy text-steel-navy">
                {app}
              </span>
            ))}
          </div>
        </div>
        
        <div className="bg-deep-rose bg-opacity-10 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-deep-rose mb-2">First Date Ideas</h3>
          <ul className="space-y-2">
            {first_date_ideas.map((idea, index) => (
              <li key={index} className="text-gray-700">
                <span className="text-deep-rose mr-2">•</span> {idea}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="flex justify-between">
        <button 
          onClick={onRestart}
          className="btn btn-outline"
        >
          Start Over
        </button>
        
        <button 
          onClick={downloadAsPDF}
          className="btn btn-primary"
        >
          Download PDF
        </button>
      </div>
    </motion.div>
  );
};

export default ProfileOutputCard;
