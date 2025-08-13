import React, { useState } from 'react';
import { Settings, X, Brain, Key, Palette, Bell, Download, Trash2 } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { useTheme } from '../../contexts/ThemeContext';

const SettingsModal = ({ isOpen, onClose }) => {
  const { 
    useAI, 
    userApiKey, 
    setApiKey, 
    toggleAIMode, 
    settings, 
    updateSettings,
    messages,
    clearChat
  } = useChat();
  const { darkMode } = useTheme();
  
  const [apiKeyInput, setApiKeyInput] = useState(userApiKey || '');
  const [showApiKey, setShowApiKey] = useState(false);

  if (!isOpen) return null;

  const handleSaveApiKey = () => {
    setApiKey(apiKeyInput.trim());
  };

  const handleSettingChange = (key, value) => {
    updateSettings({ [key]: value });
  };

  const exportChatHistory = () => {
    const chatData = {
      exportDate: new Date().toISOString(),
      messages: messages.map(msg => ({
        sender: msg.sender,
        text: msg.text,
        timestamp: msg.timestamp
      }))
    };
    
    const blob = new Blob([JSON.stringify(chatData, null, 2)], { 
      type: 'application/json' 
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mental-health-chat-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className={`max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl ${
        darkMode ? 'bg-gray-800' : 'bg-white'
      } shadow-2xl`}>
        
        {/* Header */}
        <div className="sticky top-0 bg-inherit rounded-t-2xl border-b border-gray-200 dark:border-gray-700 p-6 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Settings className="w-6 h-6 text-blue-500" />
              <h2 className="text-xl font-bold">Settings</h2>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode 
                  ? 'hover:bg-gray-700 text-gray-400' 
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          
          {/* AI Configuration */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="w-5 h-5 text-purple-500" />
              <h3 className="text-lg font-semibold">AI Configuration</h3>
            </div>

            {/* AI Toggle */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">AI Responses</div>
                <div className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Use Gemini AI for intelligent responses
                </div>
              </div>
              <button
                onClick={toggleAIMode}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  useAI ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                  useAI ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* API Key Input */}
            {useAI && (
              <div className="space-y-2">
                <label className="block text-sm font-medium">
                  Gemini API Key (Optional)
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <input
                      type={showApiKey ? 'text' : 'password'}
                      placeholder="Enter your Gemini API key..."
                      value={apiKeyInput}
                      onChange={(e) => setApiKeyInput(e.target.value)}
                      className={`w-full p-3 pr-10 rounded-lg border transition-colors ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                          : 'bg-gray-50 border-gray-200 placeholder-gray-500'
                      } focus:border-blue-500 focus:outline-none`}
                    />
                    <button
                      onClick={() => setShowApiKey(!showApiKey)}
                      className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`}
                    >
                      <Key className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    onClick={handleSaveApiKey}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                  >
                    Save
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Without an API key, intelligent fallback responses will be used. 
                  Get your key from <a 
                    href="https://makersuite.google.com/app/apikey" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >Google AI Studio</a>.
                </p>
              </div>
            )}
          </div>

          {/* Interface Settings */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Palette className="w-5 h-5 text-green-500" />
              <h3 className="text-lg font-semibold">Interface</h3>
            </div>

            {/* Auto Scroll */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Auto Scroll</div>
                <div className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Automatically scroll to new messages
                </div>
              </div>
              <button
                onClick={() => handleSettingChange('autoScroll', !settings.autoScroll)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.autoScroll ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                  settings.autoScroll ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Show Timestamps */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Show Timestamps</div>
                <div className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Display message timestamps
                </div>
              </div>
              <button
                onClick={() => handleSettingChange('showTimestamps', !settings.showTimestamps)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.showTimestamps ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                  settings.showTimestamps ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>

            {/* Compact Mode */}
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Compact Mode</div>
                <div className={`text-sm ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Reduce message spacing for more content
                </div>
              </div>
              <button
                onClick={() => handleSettingChange('compactMode', !settings.compactMode)}
                className={`relative w-12 h-6 rounded-full transition-colors ${
                  settings.compactMode ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              >
                <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-transform ${
                  settings.compactMode ? 'translate-x-6' : 'translate-x-0.5'
                }`} />
              </button>
            </div>
          </div>

          {/* Data Management */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Download className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-semibold">Data Management</h3>
            </div>

            {/* Export Chat */}
            <button
              onClick={exportChatHistory}
              disabled={messages.length <= 1}
              className={`w-full flex items-center justify-center space-x-2 p-3 rounded-lg border transition-colors ${
                messages.length <= 1
                  ? 'opacity-50 cursor-not-allowed'
                  : darkMode
                  ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                  : 'border-gray-300 hover:bg-gray-50 text-gray-700'
              }`}
            >
              <Download className="w-4 h-4" />
              <span>Export Chat History</span>
            </button>

            {/* Clear Data */}
            <button
              onClick={() => {
                clearChat();
                onClose();
              }}
              className="w-full flex items-center justify-center space-x-2 p-3 rounded-lg bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear All Chat Data</span>
            </button>
          </div>

          {/* App Info */}
          <div className={`pt-4 border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <div className={`text-xs text-center ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Mental Health Chatbot v1.0.0<br />
              Your privacy is protected - all data stays local
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;