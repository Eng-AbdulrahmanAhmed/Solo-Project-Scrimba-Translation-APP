# Scrimba Solo Project - Translation App

A full-stack, AI-powered translation application. This app takes user input and translates it into French, Spanish, or Japanese using a custom Express backend connected to the OpenRouter API.

## ✨ Features
- **Frontend**: Built with React, TypeScript, and Vite. Features a dynamic UI with text input, language selection via radio buttons (with flags), and seamless state toggling between the input view and the translated result view.
- **Backend**: An Express.js server configured with CORS that securely handles API requests.
- **AI Integration**: Uses the official `openai` Node SDK to communicate with OpenRouter's API, dynamically injecting the user's selected language into the system prompt for highly accurate translations.

## 🚀 Getting Started

### 1. Environment Setup
Before running the backend, create a `.env` file inside the `BackEnd` folder with your API credentials:
```env
PORT=3001
OPENROUTER_API_KEY=your_actual_api_key_here
BASE_URL=https://openrouter.ai/api/v1
MODEL=meta-llama/llama-3-8b-instruct:free
```

### 2. Backend Setup
```bash
cd BackEnd
npm install
npm run dev # Runs server on http://localhost:3001
```

### 3. Frontend Setup
```bash
cd FrontEnd/Translation-App
npm install
npm run dev # Runs Vite dev server on http://localhost:5173
```