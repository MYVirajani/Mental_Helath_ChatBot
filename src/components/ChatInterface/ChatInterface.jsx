import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import QuickPrompts from '../UI/QuickPrompts';
import { useChat } from '../../contexts/ChatContext';

const ChatInterface = () => {
  const { messages } = useChat();
  const isFirstSession = messages.length <= 1;

  return (
    <div className="h-full flex flex-col bg-transparent">
      {/* Messages Area - Takes all available space */}
      <div className="flex-1 min-h-0">
        <MessageList />
      </div>

      {/* Quick Prompts (shown only at start) - Fixed at bottom */}
      {isFirstSession && (
        <div className="flex-shrink-0 px-6 pb-4">
          <QuickPrompts />
        </div>
      )}

      {/* Message Input - Fixed at bottom */}
      <div className="flex-shrink-0">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatInterface;