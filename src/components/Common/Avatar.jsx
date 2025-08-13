import React from 'react';
import { User, Bot, Heart, Brain } from 'lucide-react';

const Avatar = ({ type, isCompact = false }) => {
  const size = isCompact ? 'w-6 h-6' : 'w-8 h-8';
  const iconSize = isCompact ? 'w-3 h-3' : 'w-4 h-4';
  
  if (type === 'user') {
    return (
      <div className={`${size} rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 shadow-sm`}>
        <User className={`${iconSize} text-white`} />
      </div>
    );
  }

  // Bot avatar with gradient and animation
  return (
    <div className={`${size} rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-sm relative overflow-hidden`}>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      
      {/* Bot icon */}
      <div className="relative z-10">
        <Bot className={`${iconSize} text-white`} />
      </div>
      
      {/* Pulse animation for active state */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse opacity-20"></div>
    </div>
  );
};

export default Avatar;