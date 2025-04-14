import { tags } from '../data/tags';

// Enhanced tag extraction with NLP-like functionality
export const extractTags = (answers, questions) => {
  const userTags = {
    tone_tags: [],
    passion_tags: [],
    personality_tags: [],
    strength_tags: [],
    communication_tags: [],
    lifestyle_tags: [],
    dating_goals: [],
    dealbreaker_tags: [],
    love_languages: [],
    humor_styles: [],
    bio_style_preference: [],
    first_date_vibe: [],
    app_savviness: []
  };
  
  // Process each answer to extract relevant tags
  answers.forEach((answer, index) => {
    if (!answer || answer.trim() === '') return;
    
    const question = questions[index];
    const tagCategories = question.tags_generated || [];
    const lowerAnswer = answer.toLowerCase();
    
    // Enhanced keyword matching with context awareness
    tagCategories.forEach(category => {
      if (!userTags[category] || !tags[category]) return;
      
      // Check for keywords in the answer with context
      Object.keys(tags[category]).forEach(tag => {
        const lowerTag = tag.toLowerCase();
        
        // Direct match
        if (lowerAnswer.includes(lowerTag)) {
          if (!userTags[category].includes(tag)) {
            userTags[category].push(tag);
          }
          return;
        }
        
        // Synonym matching for common terms
        const synonyms = getSynonyms(lowerTag);
        for (const synonym of synonyms) {
          if (lowerAnswer.includes(synonym)) {
            if (!userTags[category].includes(tag)) {
              userTags[category].push(tag);
            }
            break;
          }
        }
        
        // Context-based matching for specific questions
        if (question.id === 1 && category === 'tone_tags') {
          // Question about vibe/personality
          if ((lowerAnswer.includes('funny') || lowerAnswer.includes('humor') || lowerAnswer.includes('joke')) && tag === 'playful') {
            userTags[category].push(tag);
          } else if ((lowerAnswer.includes('sweet') || lowerAnswer.includes('caring') || lowerAnswer.includes('kind')) && tag === 'romantic') {
            userTags[category].push(tag);
          } else if ((lowerAnswer.includes('smart') || lowerAnswer.includes('clever') || lowerAnswer.includes('quick')) && tag === 'witty') {
            userTags[category].push(tag);
          }
        } else if (question.id === 4 && category === 'dating_goals') {
          // Question about dating goals
          if ((lowerAnswer.includes('serious') || lowerAnswer.includes('committed') || lowerAnswer.includes('long term')) && tag === 'long-term relationship') {
            userTags[category].push(tag);
          } else if ((lowerAnswer.includes('fun') || lowerAnswer.includes('casual') || lowerAnswer.includes('nothing serious')) && tag === 'casual fun') {
            userTags[category].push(tag);
          } else if ((lowerAnswer.includes('forever') || lowerAnswer.includes('the one') || lowerAnswer.includes('life partner')) && tag === 'soulmate') {
            userTags[category].push(tag);
          }
        }
      });
    });
    
    // Special handling for question 10 (anything else)
    if (question.id === 10) {
      // Check all possible tag categories for this catch-all question
      Object.keys(tags).forEach(category => {
        if (!userTags[category]) return;
        
        Object.keys(tags[category]).forEach(tag => {
          const lowerTag = tag.toLowerCase();
          if (lowerAnswer.includes(lowerTag) && !userTags[category].includes(tag)) {
            userTags[category].push(tag);
          }
        });
      });
    }
  });
  
  // Fill in defaults for empty categories to ensure we have something to work with
  if (userTags.tone_tags.length === 0) userTags.tone_tags.push('authentic');
  if (userTags.passion_tags.length === 0) userTags.passion_tags.push('travel');
  if (userTags.dating_goals.length === 0) userTags.dating_goals.push('long-term relationship');
  
  return userTags;
};

// Helper function for synonym matching
const getSynonyms = (word) => {
  const synonymMap = {
    'playful': ['fun', 'funny', 'humorous', 'silly', 'goofy', 'lighthearted'],
    'romantic': ['sweet', 'dreamy', 'loving', 'affectionate', 'tender'],
    'witty': ['clever', 'smart', 'intelligent', 'quick', 'sharp'],
    'direct': ['straightforward', 'honest', 'blunt', 'frank', 'clear'],
    'confident': ['self-assured', 'bold', 'strong', 'assertive', 'secure'],
    'travel': ['adventure', 'exploring', 'journey', 'trip', 'vacation', 'wanderlust'],
    'music': ['songs', 'concert', 'band', 'singing', 'playlist', 'instrument'],
    'books': ['reading', 'literature', 'novel', 'stories', 'author'],
    'long-term relationship': ['serious', 'committed', 'marriage', 'partner', 'future together'],
    'casual fun': ['casual', 'nothing serious', 'short term', 'hookup', 'dating around'],
    'coffee date': ['cafe', 'coffee shop', 'casual meeting', 'quick date'],
    'texting lover': ['text', 'message', 'chat', 'dm', 'messaging'],
    'calls preferred': ['phone', 'call', 'voice', 'talking', 'conversation'],
  };
  
  return synonymMap[word] || [];
};

// Enhanced profile generation with more personalization
export const generateProfile = (userTags) => {
  // Generate bio with more personality
  const bio = generateEnhancedBio(userTags);
  
  // Generate photo prompts with better variety
  const photoPrompts = generateEnhancedPhotoPrompts(userTags);
  
  // Generate first messages with more personalization
  const firstMessages = generateEnhancedFirstMessages(userTags);
  
  // Generate app suggestions based on user goals and style
  const appSuggestions = generateEnhancedAppSuggestions(userTags);
  
  // Generate first date ideas tailored to user preferences
  const firstDateIdeas = generateEnhancedFirstDateIdeas(userTags);
  
  return {
    bio,
    photo_prompts: photoPrompts,
    first_messages: firstMessages,
    app_suggestions: appSuggestions,
    first_date_ideas: firstDateIdeas
  };
};

// Enhanced bio generation with more personality and structure
const generateEnhancedBio = (userTags) => {
  // Get primary tone
  const toneTag = userTags.tone_tags[0] || 'authentic';
  const toneStyle = tags.tone_tags[toneTag]?.bio_style || 'authentic, genuine';
  
  // Get primary passion
  const passionTag = userTags.passion_tags[0] || 'life experiences';
  
  // Get primary personality trait
  const personalityTag = userTags.personality_tags[0] || 'balanced';
  
  // Get primary strength
  const strengthTag = userTags.strength_tags[0] || 'authentic';
  
  // Get dating goal
  const goalTag = userTags.dating_goals[0] || 'connection';
  const goalFocus = tags.dating_goals[goalTag]?.bio_focus || 'meaningful connections';
  
  // Get communication style
  const commTag = userTags.communication_tags[0] || 'balanced';
  
  // Get bio style preference
  const bioStyleTag = userTags.bio_style_preference[0] || 'authentic';
  
  // Template-based approach with variations
  const templates = [
    `${toneStyle.split(',')[0]} soul with a passion for ${passionTag}. Bringing ${strengthTag} energy to every conversation. Seeking ${goalFocus} with someone who values good ${commTag === 'detailed' ? 'conversation' : 'communication'}.`,
    
    `${personalityTag} at heart, obsessed with all things ${passionTag}. Known for being ${strengthTag} and ${toneStyle.split(',')[0]}. Looking for ${goalFocus} and genuine connection.`,
    
    `Equal parts ${toneStyle.split(',')[0]} and ${personalityTag}. When not ${getPassionActivity(passionTag)}, you'll find me ${getPersonalityActivity(personalityTag)}. Hoping to find someone who appreciates ${strengthTag} connections and ${goalFocus}.`,
    
    `Bringing the ${toneStyle} vibes and ${strengthTag} energy. Passionate about ${passionTag} and searching for someone who values ${goalFocus}. Let's see where this goes?`,
    
    `${capitalizeFirstLetter(personalityTag)} ${passionTag}-enthusiast seeking ${goalFocus}. I pride myself on being ${strengthTag} and ${toneStyle.split(',')[0]}. Let's connect and see what unfolds.`
  ];
  
  // Select template based on bio style preference or randomly if not specified
  let templateIndex = Math.floor(Math.random() * templates.length);
  if (bioStyleTag === 'short & punchy') templateIndex = 3;
  if (bioStyleTag === 'story-based') templateIndex = 2;
  if (bioStyleTag === 'emotionally deep') templateIndex = 0;
  if (bioStyleTag === 'straight-to-the-point') templateIndex = 4;
  
  // Ensure bio is under 400 characters
  let bio = templates[templateIndex];
  if (bio.length > 400) {
    bio = bio.substring(0, 397) + '...';
  }
  
  return bio;
};

// Helper function to get activity related to passion
const getPassionActivity = (passion) => {
  const activities = {
    'travel': 'exploring new destinations',
    'music': 'discovering new playlists',
    'books': 'getting lost in a good book',
    'fitness': 'hitting the gym or trails',
    'art': 'creating or appreciating art',
    'cooking': 'experimenting in the kitchen',
    'photography': 'capturing perfect moments'
  };
  
  return activities[passion] || 'pursuing my passions';
};

// Helper function to get activity related to personality
const getPersonalityActivity = (personality) => {
  const activities = {
    'introverted': 'enjoying quiet moments of reflection',
    'extroverted': 'connecting with friends and meeting new people',
    'curious': 'learning something new and fascinating',
    'grounded': 'appreciating life\'s simple pleasures',
    'adventurous': 'seeking out new experiences',
    'reflective': 'contemplating life\'s bigger questions'
  };
  
  return activities[personality] || 'being authentically me';
};

// Helper function to capitalize first letter
const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

// Enhanced photo prompt generation with better variety and personalization
const generateEnhancedPhotoPrompts = (userTags) => {
  const prompts = [];
  
  // Add tone-based photo prompt
  if (userTags.tone_tags.length > 0) {
    const toneTag = userTags.tone_tags[0];
    const prompt = tags.tone_tags[toneTag]?.photo_prompt;
    if (prompt) prompts.push(prompt);
  }
  
  // Add passion-based photo prompts (up to 2)
  userTags.passion_tags.slice(0, 2).forEach(passion => {
    const prompt = tags.passion_tags[passion];
    if (prompt) prompts.push(prompt);
  });
  
  // Add personality-based photo prompt
  if (userTags.personality_tags.length > 0) {
    const personalityTag = userTags.personality_tags[0];
    const prompt = tags.personality_tags[personalityTag];
    if (prompt) prompts.push(prompt);
  }
  
  // Add lifestyle-based photo prompt
  if (userTags.lifestyle_tags.length > 0) {
    const lifestyleTag = userTags.lifestyle_tags[0];
    if (lifestyleTag === 'early bird') {
      prompts.push('Morning routine shot with natural lighting');
    } else if (lifestyleTag === 'night owl') {
      prompts.push('Evening activity or city lights photo');
    } else if (lifestyleTag === 'remote worker') {
      prompts.push('Your favorite work spot or creative space');
    } else if (lifestyleTag === 'laid-back') {
      prompts.push('Casual, relaxed photo in your favorite comfortable setting');
    }
  }
  
  // Add universal high-quality photo prompt
  prompts.push('A clear, well-lit photo that shows your face and genuine smile');
  
  // Ensure we have at least 3 prompts but no more than 5
  const defaultPrompts = [
    'A candid shot showing your natural smile',
    'You engaged in your favorite hobby',
    'A travel photo from a place that means something to you',
    'A photo that captures your everyday style',
    'A picture that tells a story about who you are'
  ];
  
  while (prompts.length < 3) {
    const randomPrompt = defaultPrompts[Math.floor(Math.random() * defaultPrompts.length)];
    if (!prompts.includes(randomPrompt)) {
      prompts.push(randomPrompt);
    }
  }
  
  // Remove duplicates and limit to 5
  const uniquePrompts = [...new Set(prompts)];
  return uniquePrompts.slice(0, 5);
};

// Enhanced first message generation with more personalization
const generateEnhancedFirstMessages = (userTags) => {
  const messages = [];
  
  // Add tone-based message
  if (userTags.tone_tags.length > 0) {
    const toneTag = userTags.tone_tags[0];
    const messageStyle = tags.tone_tags[toneTag]?.first_message;
    
    if (messageStyle === "cheeky with emojis") {
      messages.push("Hey there! Your profile made me smile 😊 What's been the highlight of your week?");
      messages.push("I had to stop scrolling when I saw your profile 👀 What's your idea of a perfect weekend?");
    } else if (messageStyle === "open-hearted and sweet") {
      messages.push("Hi! I really enjoyed reading your profile. What's something that brings you joy these days?");
      messages.push("Hello! Your profile resonated with me. I'd love to know what inspires you lately?");
    } else if (messageStyle === "wordplay or clever opener") {
      messages.push("I was going to come up with a clever opening line, but I'd rather just say hello and ask what's making you happy lately?");
      messages.push("They say a good conversation starts with a witty opener, but I'm more interested in what makes you tick. Care to share?");
    } else if (messageStyle === "bold opener or ask a clear question") {
      messages.push("Hello! I'm curious - what's something you're passionate about that most people don't know?");
      messages.push("Hi there! If you could have dinner with anyone, living or dead, who would it be and why?");
    } else if (messageStyle === "flirt with bold honesty") {
      messages.push("I find your profile intriguing and would love to get to know the person behind it. What's something you're looking forward to?");
      messages.push("Your profile caught my attention in the best way. What's something you're currently excited about?");
    } else if (messageStyle === "a soft, imaginative compliment or question") {
      messages.push("Your profile feels like finding a favorite book I didn't know existed. What story are you currently living?");
      messages.push("There's something genuinely captivating about your profile. What's a dream you're currently nurturing?");
    }
  }
  
  // Add communication style message
  if (userTags.communication_tags.length > 0) {
    const commTag = userTags.communication_tags[0];
    
    if (commTag === "texting lover") {
      messages.push("Hey! Quick question - coffee or tea? (This is how I judge character 😉)");
    } else if (commTag === "calls preferred") {
      messages.push("Hi there! I'd love to learn more about the story behind your profile. Would you share?");
    } else if (commTag === "short & sweet") {
      messages.push("Hi! Your profile caught my eye. Recent favorite book/movie/show?");
    } else if (commTag === "detailed") {
      messages.push("Hello! I noticed we might share some interests. What first drew you to online dating, and what keeps you hopeful about it?");
    } else if (commTag === "expressive") {
      messages.push("Your profile made me feel like we could have a wonderful conversation. What's something that made you feel truly alive recently?");
    }
  }
  
  // Add passion-based message
  if (userTags.passion_tags.length > 0) {
    const passionTag = userTags.passion_tags[0];
    
    if (passionTag === "travel") {
      messages.push("If you could teleport anywhere in the world right now, where would you go and why?");
    } else if (passionTag === "music") {
      messages.push("What song has been on repeat for you lately? I'm always looking for new music recommendations!");
    } else if (passionTag === "books") {
      messages.push("I'm always looking for my next read - what book has impacted you most recently?");
    } else if (passionTag === "fitness") {
      messages.push("What's your favorite way to stay active? I'm always looking for new workout inspiration!");
    } else if (passionTag === "art") {
      messages.push("What's the last piece of art (any medium) that really moved you?");
    } else if (passionTag === "cooking") {
      messages.push("If you were to cook your signature dish for someone, what would it be?");
    }
  }
  
  // Ensure we have at least 2 messages but no more than 4
  const defaultMessages = [
    "Hi there! What's something you're looking forward to this week?",
    "Your profile caught my attention! What's your idea of a perfect day?",
    "Hello! If you could have dinner with anyone, living or dead, who would it be and why?",
    "Hey! What's your favorite way to spend a Sunday?"
  ];
  
  while (messages.length < 2) {
    const randomMessage = defaultMessages[Math.floor(Math.random() * defaultMessages.length)];
    if (!messages.includes(randomMessage)) {
      messages.push(randomMessage);
    }
  }
  
  // Remove duplicates and limit to 4
  const uniqueMessages = [...new Set(messages)];
  return uniqueMessages.slice(0, 4);
};

// Enhanced app suggestions based on user goals and style
const generateEnhancedAppSuggestions = (userTags) => {
  const suggestions = [];
  
  // Add dating goal based app suggestions
  if (userTags.dating_goals.length > 0) {
    const goalTag = userTags.dating_goals[0];
    const apps = tags.dating_goals[goalTag]?.app_suggestions;
    if (apps) suggestions.push(...apps);
  }
  
  // Add app savviness based suggestion
  if (userTags.app_savviness.length > 0) {
    const savvyTag = userTags.app_savviness[0];
    
    if (savvyTag === "first timer") {
      suggestions.push("Bumble");
    } else if (savvyTag === "app fatigue") {
      suggestions.push("Coffee Meets Bagel");
    } else if (savvyTag === "experienced dater") {
      suggestions.push("Hinge");
    } else if (savvyTag === "skeptical") {
      suggestions.push("OkCupid");
    }
  }
  
  // Add personality-based suggestion
  if (userTags.personality_tags.length > 0) {
    const personalityTag = userTags.personality_tags[0];
    
    if (personalityTag === "introverted") {
      suggestions.push("Coffee Meets Bagel");
    } else if (personalityTag === "extroverted") {
      suggestions.push("Bumble");
    } else if (personalityTag === "curious") {
      suggestions.push("OkCupid");
    } else if (personalityTag === "adventurous") {
      suggestions.push("Tinder");
    }
  }
  
  // Ensure we have at least 1 suggestion but no more than 2
  if (suggestions.length === 0) {
    suggestions.push("Hinge", "Bumble");
  }
  
  // Remove duplicates and limit to 2
  const uniqueSuggestions = [...new Set(suggestions)];
  return uniqueSuggestions.slice(0, 2);
};

// Enhanced first date ideas tailored to user preferences
const generateEnhancedFirstDateIdeas = (userTags) => {
  const ideas = [];
  
  // Add first date vibe based ideas
  if (userTags.first_date_vibe.length > 0) {
    const vibeTag = userTags.first_date_vibe[0];
    
    if (vibeTag === "coffee date") {
      ideas.push("Coffee at a cozy local café with interesting art on the walls");
    } else if (vibeTag === "museum") {
      ideas.push("Exploring a museum exhibit that changes regularly, followed by discussing your favorite pieces");
    } else if (vibeTag === "picnic") {
      ideas.push("A casual picnic in the park with simple snacks and good conversation");
    } else if (vibeTag === "video chat first") {
      ideas.push("Virtual coffee date with a fun prompt to discuss, like 'what book changed your perspective?'");
    } else if (vibeTag === "low-pressure") {
      ideas.push("A short walk in a public park or garden with the option to extend if it's going well");
    }
  }
  
  // Add personality based idea
  if (userTags.personality_tags.length > 0) {
    const personalityTag = userTags.personality_tags[0];
    
    if (personalityTag === "introverted") {
      ideas.push("Quiet bookstore browse followed by coffee in a low-key setting");
    } else if (personalityTag === "extroverted") {
      ideas.push("Lively farmers market or street fair where you can people-watch and try new things");
    } else if (personalityTag === "curious") {
      ideas.push("Trying a new activity neither of you have done before, like a cooking class or art workshop");
    } else if (personalityTag === "adventurous") {
      ideas.push("Outdoor adventure like hiking to a scenic viewpoint or kayaking if you're both outdoorsy");
    } else if (personalityTag === "grounded") {
      ideas.push("A relaxed walk through a botanical garden or nature center");
    } else if (personalityTag === "reflective") {
      ideas.push("A quiet café with a view where you can have meaningful conversation");
    }
  }
  
  // Add passion based idea
  if (userTags.passion_tags.length > 0) {
    const passionTag = userTags.passion_tags[0];
    
    if (passionTag === "travel") {
      ideas.push("Meeting at an international café or restaurant that serves cuisine from a country you both want to visit");
    } else if (passionTag === "music") {
      ideas.push("A casual live music venue with a relaxed atmosphere where you can still talk");
    } else if (passionTag === "books") {
      ideas.push("Meeting at a bookstore café where you can browse and discuss your favorite reads");
    } else if (passionTag === "fitness") {
      ideas.push("A light activity like mini-golf or a scenic walk that keeps you moving without being too intense");
    } else if (passionTag === "art") {
      ideas.push("A small gallery opening or art walk where you can discuss what you see");
    } else if (passionTag === "cooking") {
      ideas.push("A food hall or market where you can sample different foods and discuss your favorites");
    } else if (passionTag === "photography") {
      ideas.push("A photogenic location like a botanical garden or scenic overlook where you can take pictures together");
    }
  }
  
  // Ensure we have at least 1 idea but no more than 2
  if (ideas.length === 0) {
    ideas.push("Coffee and a walk in the park", "Casual dinner at a local favorite");
  }
  
  // Remove duplicates and limit to 2
  const uniqueIdeas = [...new Set(ideas)];
  return uniqueIdeas.slice(0, 2);
};
