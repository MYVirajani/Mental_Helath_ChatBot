import React from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useTheme } from '../../contexts/ThemeContext';
import { chatModes, getAllModes } from '../../data/modes';

const ModeSelector = () => {
  const { selectedMode, setMode, currentMode } = useChat();
  const { darkMode } = useTheme();
  const allModes = getAllModes();

  return (
    <div className="space-y-3">
      {/* Current Mode Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Coaching Mode:
          </span>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {currentMode.title}
          </span>
        </div>
        
        <div className={`text-xs px-2 py-1 rounded-full ${
          darkMode ? 'bg-gray-700 text-gray-400' : 'bg-gray-100 text-gray-500'
        }`}>
          {currentMode.description}
        </div>
      </div>

      {/* Mode Selection Buttons */}
      <div className="flex flex-wrap gap-2 overflow-x-auto pb-2">
        {allModes.map(({ key, icon: IconComponent, title, color }) => (
          <button
            key={key}
            onClick={() => setMode(key)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-full whitespace-nowrap transition-all duration-200 hover:scale-105 ${
              selectedMode === key
                ? `bg-gradient-to-r ${color} text-white shadow-lg transform scale-105`
                : darkMode
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300 border border-gray-600'
                : 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 shadow-sm'
            }`}
            title={chatModes[key].description}
          >
            <IconComponent className="w-4 h-4" />
            <span className="text-sm font-medium">{title}</span>
          </button>
        ))}
      </div>

      {/* Mode Description */}
      <div className={`text-xs italic ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {currentMode.description}
      </div>
    </div>
  );
};

export default ModeSelector;