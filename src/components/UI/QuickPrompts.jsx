import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useTheme } from '../../contexts/ThemeContext';

const QuickPrompts = () => {
  const { currentMode, setInput } = useChat();
  const { darkMode } = useTheme();

  // Get prompts from the current mode, or use general prompts
  const prompts = currentMode.quickPrompts || [
    "I'm feeling overwhelmed with work",
    "Help me set daily goals",
    "I need motivation to start exercising",
    "Teach me a breathing exercise",
    "I'm having trouble focusing",
    "Help me manage stress"
  ];

  const handlePromptClick = (prompt) => {
    setInput(prompt);
    // Optionally auto-submit or let user review before sending
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h3 className={`text-sm font-medium mb-2 ${
          darkMode ? 'text-gray-300' : 'text-gray-600'
        }`}>
          Try these conversation starters for {currentMode.title.toLowerCase()}:
        </h3>
      </div>

      {/* Prompt Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => handlePromptClick(prompt)}
            className={`text-left p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg group ${
              darkMode 
                ? 'bg-gray-800 hover:bg-gray-750 text-gray-300 border border-gray-700 hover:border-gray-600' 
                : 'bg-white hover:bg-gray-50 shadow-sm hover:shadow-md border border-gray-100 hover:border-gray-200'
            }`}
          >
            <div className="flex items-start justify-between">
              <span className={`text-sm leading-relaxed flex-1 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {prompt}
              </span>
              
              {/* Arrow indicator */}
              <div className={`ml-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
            
            {/* Subtle gradient overlay on hover */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none"></div>
          </button>
        ))}
      </div>

      {/* Additional helpful text */}
      <div className={`text-center text-xs ${
        darkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <p>Click any prompt to get started, or type your own message below</p>
      </div>
    </div>
  );
};

export default QuickPrompts;