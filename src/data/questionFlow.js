export const questionFlow = {
  session_name: "Glow-Up Session",
  instructions: "Ask each question one at a time. After each user response, acknowledge their input, tag it appropriately, and display progress (e.g., 'Question 3 of 10'). Do not generate the final dating profile until all questions are complete. At the end, confirm if they want to review or proceed to profile generation.",
  questions: [
    {
      id: 1,
      prompt: "How would your friends describe your vibe in 3 words? (Funny, thoughtful, flirty, bold—whatever comes to mind!)",
      tags_generated: [
        "tone_tags",
        "personality_tags"
      ]
    },
    {
      id: 2,
      prompt: "What's something you're really good at in relationships—or something you're proud of in how you show up?",
      tags_generated: [
        "strength_tags",
        "love_language",
        "attachment_style"
      ]
    },
    {
      id: 3,
      prompt: "What are you obsessed with these days—hobbies, shows, activities, anything?",
      tags_generated: [
        "passion_tags",
        "photo_style"
      ]
    },
    {
      id: 4,
      prompt: "What are you hoping to find through dating right now? (Totally cool if it's complicated!)",
      tags_generated: [
        "dating_goals",
        "communication_style"
      ]
    },
    {
      id: 5,
      prompt: "Is there something that's a hard no for you in dating? (Bad communication, ghosting, smoking, etc.)",
      tags_generated: [
        "dealbreaker_tags",
        "red_flags"
      ]
    },
    {
      id: 6,
      prompt: "How do you like to stay in touch with someone you're vibing with? (Text, voice notes, deep convos?)",
      tags_generated: [
        "communication_tags",
        "attachment_styles"
      ]
    },
    {
      id: 7,
      prompt: "What kind of photos do you feel most like yourself in? (Candid, glam, outdoorsy, goofy…)",
      tags_generated: [
        "photo_style",
        "tone_tags",
        "lifestyle_tags"
      ]
    },
    {
      id: 8,
      prompt: "What would your ideal first date feel like?",
      tags_generated: [
        "first_date_vibe",
        "lifestyle_tags",
        "love_language"
      ]
    },
    {
      id: 9,
      prompt: "What dating apps have you tried—or are thinking about trying? And how do you feel about them?",
      tags_generated: [
        "app_savviness",
        "app_recommendation"
      ]
    },
    {
      id: 10,
      prompt: "Anything else about you you think I should know before I work my magic?",
      tags_generated: [
        "custom",
        "fallback"
      ]
    }
  ]
};
