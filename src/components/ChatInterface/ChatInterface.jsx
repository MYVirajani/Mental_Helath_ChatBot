import React from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import QuickPrompts from '../UI/QuickPrompts';
import { useChat } from '../../contexts/ChatContext';

const ChatInterface = () => {
  const { messages } = useChat();
  const isFirstSession = messages.length <= 1;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Messages Area */}
      <div className="flex-1 overflow-hidden">
        <MessageList />
      </div>

      {/* Quick Prompts (shown only at start) */}
      {isFirstSession && (
        <div className="px-6 pb-4">
          <QuickPrompts />
        </div>
      )}

      {/* Message Input */}
      <MessageInput />
    </div>
  );
};

export default ChatInterface;