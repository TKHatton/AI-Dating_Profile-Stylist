# AI Dating Profile Stylist

A visually stunning, emotionally intelligent AI experience that helps users build a magnetic dating profile using a warm, one-question-at-a-time interface.

## Features

- Personalized dating bio generation (max 400 characters)
- Photo prompt suggestions based on user's vibe, passion, and lifestyle
- First message openers tailored to communication style and tone
- Dating app suggestions based on dating goals and style
- First date ideas that match tone and comfort zone
- PDF export functionality

## Technology Stack

- React
- Next.js
- TailwindCSS
- Framer Motion
- HTML2Canvas & jsPDF for PDF export

## Deployment Instructions for Netlify

This project is configured for easy deployment on Netlify through GitHub. Follow these steps to deploy:

### 1. Push to GitHub

First, create a repository on GitHub and push this code:

```bash
# Initialize git repository
git init
git add .
git commit -m "Initial commit"

# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR_USERNAME/ai-dating-profile-stylist.git
git push -u origin main
```

### 2. Connect to Netlify

1. Sign in to your Netlify account
2. Click "New site from Git"
3. Select GitHub as your Git provider
4. Authorize Netlify to access your GitHub account
5. Select the repository you just created

### 3. Configure Deployment Settings

When prompted, use these settings:

- **Branch to deploy**: `main` (or your preferred branch)
- **Base directory**: Leave empty (use the root directory)
- **Build command**: `npm run build` (this is already configured in netlify.toml)
- **Publish directory**: `out` (this is already configured in netlify.toml)
- **Functions directory**: Leave empty (not used in this project)

### 4. Advanced Settings (Optional)

- You can configure environment variables if needed
- Set up a custom domain if desired

### 5. Deploy

Click "Deploy site" and Netlify will build and deploy your application.

## Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

The application will be available at http://localhost:3000.

## Build for Production

To build the project for production:

```bash
npm run build
```

This will create a static export in the `out` directory that can be deployed to any static hosting service.

## Project Structure

- `/src/components` - React components
- `/src/pages` - Next.js pages
- `/src/styles` - Global styles and TailwindCSS configuration
- `/src/utils` - Utility functions including profile generation logic
- `/src/data` - Data files for tags and question flow
- `/public` - Static assets

## License

ISC
