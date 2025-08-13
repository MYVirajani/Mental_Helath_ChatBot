import React, { useState } from 'react';
import { User, Bot, Copy, Check, ThumbsUp, ThumbsDown } from 'lucide-react';
import Avatar from './Avatar';
import { useTheme } from '../../contexts/ThemeContext';

const Message = ({ message, isCompact = false, showTimestamp = true, isLastMessage = false }) => {
  const { darkMode } = useTheme();
  const [copied, setCopied] = useState(false);
  const [reaction, setReaction] = useState(null);
  
  const isUser = message.sender === 'user';
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy message:', err);
    }
  };

  const handleReaction = (type) => {
    setReaction(reaction === type ? null : type);
    // Here you could send feedback to analytics or improvement systems
    console.log(`Message reaction: ${type}`, { messageId: message.id });
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} group`}>
      <div className={`flex items-start max-w-xs md:max-w-md lg:max-w-lg ${
        isUser ? 'flex-row-reverse space-x-reverse' : ''
      } space-x-3`}>
        
        {/* Avatar */}
        <Avatar 
          type={message.sender} 
          isCompact={isCompact}
        />

        {/* Message Content */}
        <div className={`relative ${isCompact ? 'space-y-1' : 'space-y-2'}`}>
          {/* Message Bubble */}
          <div
            className={`p-4 rounded-2xl relative ${
              isUser
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'bg-gray-800 border border-gray-700 text-gray-100'
                : 'bg-white shadow-md border border-gray-100 text-gray-800'
            } ${
              isCompact ? 'p-3' : 'p-4'
            }`}
          >
            {/* Message Text */}
            <div className={`whitespace-pre-wrap break-words ${
              isCompact ? 'text-sm leading-relaxed' : 'text-base leading-relaxed'
            }`}>
              {message.text}
            </div>

            {/* Message Actions (appears on hover for bot messages) */}
            {!isUser && (
              <div className={`absolute -right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col space-y-1`}>
                {/* Copy Button */}
                <button
                  onClick={handleCopy}
                  className={`p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                    copied 
                      ? 'bg-green-500 text-white' 
                      : darkMode 
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                      : 'bg-white hover:bg-gray-100 text-gray-600 border'
                  }`}
                  title={copied ? 'Copied!' : 'Copy message'}
                >
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                </button>

                {/* Reaction Buttons */}
                <button
                  onClick={() => handleReaction('like')}
                  className={`p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                    reaction === 'like'
                      ? 'bg-green-500 text-white'
                      : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-white hover:bg-gray-100 text-gray-600 border'
                  }`}
                  title="Helpful response"
                >
                  <ThumbsUp className="w-3 h-3" />
                </button>

                <button
                  onClick={() => handleReaction('dislike')}
                  className={`p-1.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110 ${
                    reaction === 'dislike'
                      ? 'bg-red-500 text-white'
                      : darkMode
                      ? 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                      : 'bg-white hover:bg-gray-100 text-gray-600 border'
                  }`}
                  title="Not helpful"
                >
                  <ThumbsDown className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Timestamp */}
          {showTimestamp && message.timestamp && (
            <div className={`text-xs px-2 ${
              isUser 
                ? 'text-right text-blue-200' 
                : darkMode 
                ? 'text-gray-500' 
                : 'text-gray-400'
            }`}>
              {formatTime(message.timestamp)}
            </div>
          )}

          {/* Message Status Indicators */}
          {isLastMessage && !isUser && (
            <div className={`flex items-center space-x-1 px-2 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}>
              <div className="w-1 h-1 bg-current rounded-full opacity-60"></div>
              <span className="text-xs">Latest response</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;