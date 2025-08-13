import React from 'react';
import ChatInterface from './components/ChatInterface/ChatInterface';
import Header from './components/UI/Header';
import { useTheme } from './contexts/ThemeContext';
import './App.css';

function App() {
  const { darkMode } = useTheme();

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'
      }`}>
        <div className="container mx-auto max-w-4xl h-screen flex flex-col">
          <Header />
          <ChatInterface />
        </div>
      </div>
    </div>
  );
}

export default App;