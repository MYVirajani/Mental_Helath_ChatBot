import React, { useState } from 'react';
import { 
  Heart, Settings, Sun, Moon, RotateCcw, Menu, X,
  Brain, Zap, TreePine, Target, HeartHandshake, Smile, 
  MessageCircle, Clock
} from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useChat } from '../../contexts/ChatContext';
import ModeSelector from '../CoachingModes/ModeSelector';
import SettingsModal from './SettingsModal';

const Sidebar = ({ isMobile = false, isOpen = false, onClose = () => {} }) => {
  const { darkMode, toggleDarkMode } = useTheme();
  const { clearChat, sessionDuration, messageCount } = useChat();
  const [showSettings, setShowSettings] = useState(false);
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const modes = {
    general: { 
      id: 'general', 
      title: 'General Support', 
      icon: HeartHandshake, 
      description: 'General mental health support and guidance',
      color: 'from-blue-500 to-indigo-600'
    },
    productivity: { 
      id: 'productivity', 
      title: 'Productivity Coach', 
      icon: Target, 
      description: 'Goal-setting, time management, and peak performance',
      color: 'from-green-500 to-emerald-600'
    },
    mindfulness: { 
      id: 'mindfulness', 
      title: 'Mindfulness Guide', 
      icon: TreePine, 
      description: 'Meditation, mindfulness, and inner peace',
      color: 'from-purple-500 to-violet-600'
    },
    motivation: { 
      id: 'motivation', 
      title: 'Motivation Coach', 
      icon: Zap, 
      description: 'Inspiration, confidence building, and motivation',
      color: 'from-orange-500 to-red-600'
    },
    anxiety: { 
      id: 'anxiety', 
      title: 'Anxiety Support', 
      icon: Heart, 
      description: 'Anxiety management and coping strategies',
      color: 'from-pink-500 to-rose-600'
    },
    energy: { 
      id: 'energy', 
      title: 'Energy & Vitality', 
      icon: Smile, 
      description: 'Boost energy levels and overall vitality',
      color: 'from-yellow-500 to-amber-600'
    }
  };

  const formatDuration = (ms) => {
    const minutes = Math.floor(ms / 60000);
    if (minutes < 1) return 'Just started';
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  // Use the same functions as Header.jsx
  const handleClearChat = () => {
    clearChat();
    setShowConfirmClear(false);
  };

  const handleThemeToggle = () => {
    toggleDarkMode();
  };

  const handleSettingsClick = () => {
    setShowSettings(true);
  };

  const handleClearChatClick = () => {
    setShowConfirmClear(true);
  };

  const sidebarContent = (
    <div className={`h-full flex flex-col ${
      darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
    } ${!isMobile ? 'border-r' : ''}`}>
      
      {/* Mobile Close Button */}
      {isMobile && (
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className={`p-2 rounded-lg ${
              darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-500'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* App Header */}
      <div className="p-6 border-b border-inherit">
        <div className="flex items-center space-x-3 mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-lg">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Mental Health Coach
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              AI Wellness Companion
            </p>
          </div>
        </div>

        {/* Session Stats */}
        <div className={`p-3 rounded-lg ${
          darkMode ? 'bg-gray-700' : 'bg-gray-100'
        }`}>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Session: {formatDuration(sessionDuration)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MessageCircle className="w-4 h-4" />
              <span>{messageCount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Current Mode Display - Remove since we're using ModeSelector now */}

      {/* Mode Selector - Use the same component as Header.jsx */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h3 className={`text-sm font-medium mb-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Coaching Modes
        </h3>
        
        {/* Use ModeSelector component like in Header.jsx */}
        <ModeSelector />
      </div>

      {/* Bottom Controls - Updated with functional handlers */}
      <div className="p-6 border-t border-inherit">
        <div className="flex items-center justify-between">
          {/* Settings and Theme */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handleThemeToggle}
              className={`p-2 rounded-lg transition-colors hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
              title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={handleSettingsClick}
              className={`p-2 rounded-lg transition-colors hover:scale-105 ${
                darkMode 
                  ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
              }`}
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>

          {/* Clear Chat */}
          <button
            onClick={handleClearChatClick}
            className={`p-2 rounded-lg transition-colors hover:scale-105 ${
              darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
            }`}
            title="Clear chat"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
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
    </div>
  );

  if (isMobile) {
    return sidebarContent;
  }

  return (
    <div className="w-80 h-full">
      {sidebarContent}
    </div>
  );
};

// Mobile Header Component
export const MobileHeader = ({ onOpenSidebar }) => {
  const { darkMode } = useTheme();
  
  return (
    <div className={`lg:hidden flex items-center justify-between p-4 border-b ${
      darkMode ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'
    }`}>
      <button
        onClick={onOpenSidebar}
        className={`p-2 rounded-lg ${
          darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
        }`}
      >
        <Menu className="w-6 h-6" />
      </button>
      
      <div className="flex items-center space-x-2">
        <Heart className="w-5 h-5 text-blue-500" />
        <span className="font-medium">Mental Health Coach</span>
      </div>
      
      <div className="w-10" /> {/* Spacer for balance */}
    </div>
  );
};

export default Sidebar;