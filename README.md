# Xercise - Exercises App

Welcome to the Xercise project! A comprehensive fitness companion application that helps users discover, explore, and learn about exercises through an interactive and intuitive interface. Built using React and Vite, this website offers a rich set of features including exercise search, interactive muscle anatomy visualization, detailed exercise information, video demonstrations, and personalized recommendations.

## Features

### 🔍 Exercise Discovery
- **Advanced Search**: Easily search for specific exercises using keywords with real-time filtering
- **Horizontal Scroll Bar Menu**: Conveniently browse and select exercises by muscle group categories
- **Pagination**: Navigate through extensive exercise database efficiently with paginated results
- **Muscle Group Filtering**: Filter exercises by specific muscle groups to target your workout needs

### 🧍 Interactive Anatomy Visualization
- **Clickable Body Diagrams**: Interactive front and back body views with highlighted muscle groups
- **Visual Muscle Selection**: Click on specific muscles to instantly view related exercises
- **Responsive Body Views**: Automatically adapts between single and dual body views based on screen size
- **Flip Functionality**: Easily switch between front and back body views on mobile devices

### 📋 Detailed Exercise Information
- **Exercise Detail Pages**: Comprehensive information for each exercise including:
  - Targeted muscle groups
  - Required equipment
  - Step-by-step instructions
  - Body part classification
- **Exercise Videos**: YouTube video demonstrations for visual learning
- **Similar Exercises**: Smart recommendations based on:
  - Target muscle groups
  - Equipment type

### ⚡ Performance & User Experience
- **Lazy Loading**: Optimized page loading with code-splitting for faster initial load times
- **Session Storage**: Intelligent caching of exercise data to reduce API calls and improve performance
- **Smooth Animations**: Page transitions powered by Framer Motion for a polished experience
- **Error Handling**: Robust error boundaries and custom 404 page for graceful error management
- **Responsive Design**: Fully responsive interface optimized for desktop, tablet, and mobile devices

### 🧭 Navigation
- **Multi-Page Application**: Seamless navigation between:
  - Home page with search and browse functionality
  - Interactive muscles page with anatomy visualization
  - Individual exercise detail pages
- **React Router Integration**: Fast client-side routing for instant page transitions

## Technologies Used

- **React**: JavaScript library for building user interfaces
- **Vite**: Next-generation frontend build tool for fast development and optimized production builds
- **React Router**: Declarative routing for React applications
- **Framer Motion**: Animation library for smooth page transitions and interactions
- **ExerciseDB API**: Comprehensive exercise database via RapidAPI
- **YouTube API**: Video demonstrations and tutorials
- **HTML5/CSS3**: Modern markup and styling
- **JavaScript (ES6+)**: Modern JavaScript features and syntax

## Deployment

This website has been successfully deployed and is accessible at http://xercise-companion.netlify.app/

## Project Structure

The application is organized with a clean, modular architecture:
- **Components**: Reusable UI components (NavBar, Footer, Exercise cards, etc.)
- **Pages**: Main application views (HomePage, MusclesPage, ExerciseDetailsPage)
- **Utils**: Utility functions for API calls and data fetching
- **Assets**: Images and static resources

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`
