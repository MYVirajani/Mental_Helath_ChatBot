import React, { useRef, useEffect } from 'react';
import Message from '../Common/Message';
import LoadingSpinner from '../UI/LoadingSpinner';
import { useChat } from '../../contexts/ChatContext';
import { useTheme } from '../../contexts/ThemeContext';

const MessageList = () => {
  const { messages, isLoading, settings } = useChat();
  const { darkMode } = useTheme();
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);

  const scrollToBottom = (smooth = true) => {
    if (settings.autoScroll && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'auto' 
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, settings.autoScroll]);

  useEffect(() => {
    // Scroll to bottom when loading starts/stops
    if (isLoading) {
      setTimeout(() => scrollToBottom(), 100);
    }
  }, [isLoading]);

  return (
    <div 
      ref={containerRef}
      className={`flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin ${
        settings.compactMode ? 'space-y-2' : 'space-y-4'
      }`}
      style={{ scrollBehavior: 'smooth' }}
    >
      {messages.map((message, index) => (
        <div key={message.id} className="message-enter">
          <Message 
            message={message} 
            isCompact={settings.compactMode}
            showTimestamp={settings.showTimestamps}
            isLastMessage={index === messages.length - 1}
          />
        </div>
      ))}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-start">
          <div className={`p-4 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg ${
            darkMode 
              ? 'bg-gray-800 border border-gray-700' 
              : 'bg-white shadow-md border border-gray-100'
          }`}>
            <LoadingSpinner />
          </div>
        </div>
      )}

      {/* Scroll anchor */}
      <div ref={messagesEndRef} />
      
      {/* Empty state message for long conversations */}
      {messages.length > 20 && (
        <div className={`text-center py-4 ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          <p className="text-xs">
            Scroll up to see earlier messages in your session
          </p>
        </div>
      )}
    </div>
  );
};

export default MessageList;