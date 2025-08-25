import React, { useRef, useEffect } from 'react';
import { Send, Mic, Paperclip, Smile } from 'lucide-react';
import { useChat } from '../../contexts/ChatContext';
import { useTheme } from '../../contexts/ThemeContext';
import { chatService } from '../../services/chatService';

const MessageInput = () => {
  const { 
    inputMessage, 
    setInput, 
    isLoading, 
    addMessage, 
    setLoading,
    currentMode,
    useAI,
    userApiKey 
  } = useChat();
  const { darkMode } = useTheme();
  const textareaRef = useRef(null);

  // Auto-resize textarea
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
    }
  }, [inputMessage]);

  // Focus textarea on component mount
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      text: inputMessage.trim(),
      sender: 'user'
    };

    // Add user message immediately
    addMessage(userMessage);
    setInput('');
    setLoading(true);

    try {
      // Get bot response
      const botResponse = await chatService.getResponse(
        inputMessage.trim(),
        currentMode,
        useAI,
        userApiKey
      );
      
      const botMessage = {
        text: botResponse,
        sender: 'bot'
      };

      addMessage(botMessage);
    } catch (error) {
      console.error('Error getting response:', error);
      
      const errorMessage = {
        text: "I apologize, but I'm having trouble responding right now. Let me offer some general support: Remember that whatever you're going through, it's okay to take things one step at a time. You're stronger than you know. 💙",
        sender: 'bot'
      };
      
      addMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Calculate character count and suggest when to send
  const charCount = inputMessage.length;
  const isLongMessage = charCount > 500;
  const canSend = inputMessage.trim().length > 0 && !isLoading;

  return (
    <div className={`p-6 border-t ${
      darkMode 
        ? 'border-gray-700 bg-gray-800/90' 
        : 'border-gray-200 bg-white/90'
    } backdrop-blur-sm`}>
      
      {/* Input Container */}
      <div className="relative">
        {/* Main Input Area */}
        <div className={`flex space-x-3 p-4 rounded-2xl border-2 transition-all duration-200 ${
          darkMode 
            ? 'bg-gray-900 border-gray-600 ' 
            : 'bg-gray-50 border-gray-200 focus-within:bg-white'
        } ${isLoading ? 'opacity-75' : ''}`}>
          
          {/* Text Input */}
          <textarea
            ref={textareaRef}
            value={inputMessage}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            placeholder={`Share what's on your mind with your ${currentMode.title.toLowerCase()}...`}
            className={`flex-1 resize-none outline-none focus:outline-none bg-transparent ${
              darkMode 
                ? 'text-white placeholder-gray-400' 
                : 'text-gray-800 placeholder-gray-500'
            } min-h-[24px] max-h-[120px]`}
            disabled={isLoading}
            rows={1}
          />

          {/* Action Buttons */}
          <div className="flex items-end space-x-2">
            {/* Future: Voice input button */}
            {/* <button
              disabled
              className={`p-2 rounded-lg transition-colors opacity-50 cursor-not-allowed ${
                darkMode 
                  ? 'bg-gray-700 text-gray-400' 
                  : 'bg-gray-200 text-gray-500'
              }`}
              title="Voice input (coming soon)"
            >
              <Mic className="w-4 h-4" />
            </button> */}

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!canSend}
              className={`p-2 rounded-lg transition-all duration-200 ${
                canSend
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:shadow-lg hover:scale-105 active:scale-95'
                  : 'bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed'
              }`}
              title={canSend ? 'Send message' : 'Type a message to send'}
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Input Meta Information */}
        <div className="flex items-center justify-between mt-3 px-2">
          {/* Left side - Status and tips */}
          <div className="flex items-center space-x-4">
            {/* Character count (only show if approaching limit) */}
            {charCount > 300 && (
              <span className={`text-xs ${
                isLongMessage 
                  ? 'text-orange-500' 
                  : darkMode 
                  ? 'text-gray-500' 
                  : 'text-gray-400'
              }`}>
                {charCount}/1000
              </span>
            )}

            {/* AI Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                useAI && (userApiKey || process.env.REACT_APP_GEMINI_API_KEY)
                  ? 'bg-green-500 animate-pulse' 
                  : 'bg-gray-400'
              }`}></div>
              <span className="text-xs text-gray-500">
                {useAI && (userApiKey || process.env.REACT_APP_GEMINI_API_KEY) 
                  ? 'AI Enhanced' 
                  : 'Offline Mode'
                }
              </span>
            </div>
          </div>

          {/* Right side - Keyboard shortcut hint */}
          {/* <div className={`text-xs ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            Press Enter to send • Shift+Enter for new line
          </div> */}
        </div>

        {/* Disclaimer */}
        <div className={`text-xs text-center mt-4 ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <p>
            Remember: This is supportive guidance, not professional therapy. 
            <span className="font-medium"> Seek professional help for serious concerns.</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default MessageInput;