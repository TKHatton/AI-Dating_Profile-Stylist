# AI Dating Profile Stylist - Deployment Guide

This document provides a comprehensive guide for deploying the AI Dating Profile Stylist application to Netlify.

## Project Overview

The AI Dating Profile Stylist is a web application that helps users create compelling dating profiles through a conversational interface. The application:

1. Guides users through a series of 10 thoughtful questions
2. Analyzes responses to understand personality, preferences, and dating style
3. Generates personalized content including:
   - A short, personality-rich dating bio (max 400 characters)
   - 3-5 photo prompt suggestions based on vibe, passion, and lifestyle
   - 2-4 first message openers tailored to communication and tone
   - 1-2 dating app suggestions based on dating goals and style
   - 1-2 first date ideas that match tone and comfort zone
4. Provides a downloadable PDF of the generated profile

## Technical Implementation

The application is built with:
- **React** and **Next.js** for the frontend framework
- **TailwindCSS** for styling
- **Framer Motion** for animations
- **HTML2Canvas** and **jsPDF** for PDF export functionality

## Netlify Deployment Instructions

### Prerequisites
- A GitHub account
- A Netlify account

### Step 1: Push to GitHub
1. Create a new repository on GitHub
2. Initialize git in the project directory and push the code:
```bash
cd ai-dating-profile-stylist
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/ai-dating-profile-stylist.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Log in to your Netlify account
2. Click "New site from Git"
3. Select GitHub as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select the repository you just created

### Step 3: Configure Deployment Settings
When prompted, use these settings:
- **Branch to deploy**: `main` (or your preferred branch)
- **Base directory**: Leave empty (use the root directory)
- **Build command**: `npm run build` (already configured in netlify.toml)
- **Publish directory**: `out` (already configured in netlify.toml)
- **Functions directory**: Leave empty (not used in this project)

### Step 4: Deploy
Click "Deploy site" and Netlify will build and deploy your application.

## Troubleshooting

If you encounter build issues during deployment:

1. **Missing dependencies**: Ensure all dependencies are properly installed:
```bash
npm install framer-motion html2canvas jspdf @tailwindcss/postcss7-compat
```

2. **TailwindCSS configuration**: If you see warnings about Tailwind not purging unused styles, you can update the tailwind.config.js file to include the content paths:
```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  // rest of the config
}
```

3. **Build timeout**: If the build times out on Netlify, you may need to increase the build timeout in your site settings.

## Local Development

To run the project locally:
```bash
npm install
npm run dev
```

The application will be available at http://localhost:3000.

## Project Structure

- `/src/components` - React components for the UI
- `/src/pages` - Next.js pages
- `/src/styles` - Global styles and TailwindCSS configuration
- `/src/utils` - Utility functions including profile generation logic
- `/src/data` - Data files for tags and question flow
- `/public` - Static assets

## Next Steps

After deployment, you may want to:
1. Set up a custom domain in Netlify
2. Configure form handling if you want to collect user data
3. Add analytics to track user engagement
4. Implement user accounts for saving profiles

## Support

If you need further assistance, please refer to:
- [Next.js Documentation](https://nextjs.org/docs)
- [Netlify Documentation](https://docs.netlify.com)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
