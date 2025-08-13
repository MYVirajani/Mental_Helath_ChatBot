import React from 'react';

const LoadingSpinner = ({ size = 'md', text = null }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const dotSizes = {
    sm: 'w-1 h-1',
    md: 'w-2 h-2', 
    lg: 'w-3 h-3'
  };

  return (
    <div className="flex items-center space-x-3">
      {/* Typing dots animation */}
      <div className="flex space-x-1 items-center">
        <div className={`${dotSizes[size]} bg-gray-400 rounded-full animate-bounce`} 
             style={{ animationDelay: '0ms' }}></div>
        <div className={`${dotSizes[size]} bg-gray-400 rounded-full animate-bounce`} 
             style={{ animationDelay: '150ms' }}></div>
        <div className={`${dotSizes[size]} bg-gray-400 rounded-full animate-bounce`} 
             style={{ animationDelay: '300ms' }}></div>
      </div>
      
      {/* Optional text */}
      {text && (
        <span className="text-sm text-gray-500 animate-pulse">
          {text}
        </span>
      )}
    </div>
  );
};

// Alternative spinner component for different use cases
export const CircularSpinner = ({ size = 'md', color = 'blue' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  const colorClasses = {
    blue: 'border-blue-500',
    purple: 'border-purple-500',
    green: 'border-green-500',
    gray: 'border-gray-500'
  };

  return (
    <div className={`${sizeClasses[size]} border-2 border-gray-200 ${colorClasses[color]} border-t-transparent rounded-full animate-spin`}></div>
  );
};

// Pulsing dots for thinking state
export const ThinkingDots = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="flex space-x-1">
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" 
             style={{ animationDelay: '0ms', animationDuration: '1s' }}></div>
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" 
             style={{ animationDelay: '200ms', animationDuration: '1s' }}></div>
        <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" 
             style={{ animationDelay: '400ms', animationDuration: '1s' }}></div>
      </div>
      <span className="text-xs text-gray-500 ml-2">Thinking...</span>
    </div>
  );
};

export default LoadingSpinner;