# FITTNESS TRACKER 🏋️‍♂️🍎

A comprehensive fitness and nutrition tracking application built with a modern tech stack. This project features a React-based frontend and a Strapi CMS backend, integrated with Gemini AI for personalized diet planning and nutrition analysis.

## 🚀 Features

- **Personalized Dashboard**: Track your daily calorie intake, calories burned, and overall progress.
- **AI-Powered Nutrition**: Analyze food intake and generate personalized diet plans using Google Gemini AI.
- **Activity Logging**: Keep a record of your workouts and daily physical activities.
- **Food Logging**: Log your meals and monitor nutritional data.
- **User Onboarding**: Tailored experience based on your age, weight, height, and fitness goals.
- **Kinetic Noir Mode**: A specialized visualization or mode for an immersive experience.

## 🛠 Tech Stack

### Frontend
- **Framework**: React.js with TypeScript
- **State Management**: React Context API
- **Styling**: Tailwind CSS
- **Build Tool**: Vite
- **Icons & UI**: Lucide React, Framer Motion

### Backend
- **CMS**: [Strapi](https://strapi.io/) (Headless CMS)
- **Database**: PostgreSQL / SQLite (configured via Strapi)
- **AI Integration**: Google Gemini API

## 📂 Project Structure

- `client/`: React frontend application.
- `server/`: Strapi backend application.
- `nutriscan.html`: standalone tool for nutrition scanning.
- `font_showcase.html`: Font preview utility.

## 🏁 Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- NPM or Yarn

### Backend Setup (Server)
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example` (if available) and configure your database and API keys.
4. Start the Strapi server:
   ```bash
   npm run develop
   ```

### Frontend Setup (Client)
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## 🧠 AI Integration

The app uses Gemini AI to:
- Generate weekly diet plans based on user profiles.
- Analyze food images or descriptions for nutritional content (via `geminiService.ts`).

## 📜 License

This project is licensed under the MIT License.
