import React, { useState } from 'react';
import { Heart, Settings, Sun, Moon, RotateCcw } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useChat } from '../../contexts/ChatContext';
import ModeSelector from '../CoachingModes/ModeSelector';
import SettingsModal from './SettingsModal';

const Header = () => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { clearChat, sessionDuration, messageCount } = useChat();
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    if (minutes < 1) return 'Just started';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const handleClearChat = () => {
    clearChat();
    setShowConfirmClear(false);
  };

  return (
    <>
      <div className={`p-6 border-b transition-colors ${
        darkMode 
          ? 'border-gray-700 bg-gray-800/90' 
          : 'border-gray-200 bg-white/90'
      } backdrop-blur-sm sticky top-0 z-10`}>
        
        {/* Main Header Content */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Mental Health & Productivity Coach
              </h1>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Your supportive AI companion for wellness and growth
              </p>
            </div>
          </div>

          {/* Header Controls */}
          <div className="flex items-center space-x-2">
            {/* Session Stats */}
            <div className={`hidden md:flex items-center space-x-4 px-3 py-1 rounded-lg text-xs ${
              darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600'
            }`}>
              <span>Session: {formatDuration(sessionDuration)}</span>
              <span>Messages: {messageCount}</span>
            </div>

            {/* Clear Chat Button */}
            <button
              onClick={() => setShowConfirmClear(true)}
              className={`p-2 rounded-lg transition-colors hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
              title="Clear chat"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 rounded-lg transition-colors hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Settings Button */}
            <button
              onClick={() => setShowSettings(true)}
              className={`p-2 rounded-lg transition-colors hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
              title="Settings"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mode Selector */}
        <ModeSelector />
      </div>

      {/* Settings Modal */}
      {showSettings && (
        <SettingsModal 
          isOpen={showSettings} 
          onClose={() => setShowSettings(false)} 
        />
      )}

      {/* Clear Chat Confirmation */}
      {showConfirmClear && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className={`max-w-sm w-full rounded-2xl p-6 ${
            darkMode ? 'bg-gray-800' : 'bg-white'
          } shadow-2xl`}>
            <div className="text-center">
              <RotateCcw className="w-12 h-12 mx-auto mb-4 text-orange-500" />
              <h3 className="text-lg font-semibold mb-2">Clear Chat History?</h3>
              <p className={`text-sm mb-6 ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                This will permanently delete all messages from your current session. This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowConfirmClear(false)}
                  className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
                    darkMode 
                      ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                      : 'border-gray-300 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleClearChat}
                  className="flex-1 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                  Clear Chat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;