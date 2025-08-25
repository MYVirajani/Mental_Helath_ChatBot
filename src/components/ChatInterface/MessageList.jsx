// import React, { useRef, useEffect } from 'react';
// import Message from '../Common/Message';
// import LoadingSpinner from '../UI/LoadingSpinner';
// import { useChat } from '../../contexts/ChatContext';
// import { useTheme } from '../../contexts/ThemeContext';

// const MessageList = () => {
//   const { messages, isLoading, settings } = useChat();
//   const { darkMode } = useTheme();
//   const messagesEndRef = useRef(null);
//   const containerRef = useRef(null);

//   const scrollToBottom = (smooth = true) => {
//     if (settings.autoScroll && messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ 
//         behavior: smooth ? 'smooth' : 'auto' 
//       });
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages, settings.autoScroll]);

//   useEffect(() => {
//     // Scroll to bottom when loading starts/stops
//     if (isLoading) {
//       setTimeout(() => scrollToBottom(), 100);
//     }
//   }, [isLoading]);

//   return (
//     <div 
//       ref={containerRef}
//       className={`flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin ${
//         settings.compactMode ? 'space-y-2' : 'space-y-4'
//       }`}
//       style={{ scrollBehavior: 'smooth' }}
//     >
//       {messages.map((message, index) => (
//         <div key={message.id} className="message-enter">
//           <Message 
//             message={message} 
//             isCompact={settings.compactMode}
//             showTimestamp={settings.showTimestamps}
//             isLastMessage={index === messages.length - 1}
//           />
//         </div>
//       ))}

//       {/* Loading Indicator */}
//       {isLoading && (
//         <div className="flex justify-start">
//           <div className={`p-4 rounded-2xl max-w-xs md:max-w-md lg:max-w-lg ${
//             darkMode 
//               ? 'bg-gray-800 border border-gray-700' 
//               : 'bg-white shadow-md border border-gray-100'
//           }`}>
//             <LoadingSpinner />
//           </div>
//         </div>
//       )}

//       {/* Scroll anchor */}
//       <div ref={messagesEndRef} />
      
//       {/* Empty state message for long conversations */}
//       {messages.length > 20 && (
//         <div className={`text-center py-4 ${
//           darkMode ? 'text-gray-500' : 'text-gray-400'
//         }`}>
//           <p className="text-xs">
//             Scroll up to see earlier messages in your session
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MessageList;

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
      className="h-full overflow-y-auto overflow-x-hidden scrollbar-thin"
      style={{ scrollBehavior: 'smooth' }}
    >
      {/* Messages container with proper spacing */}
      <div className={`p-6 space-y-4 min-h-full flex flex-col ${
        settings.compactMode ? 'space-y-2' : 'space-y-4'
      }`}>
        
        {/* Spacer to push messages to bottom initially */}
        <div className="flex-1 min-h-0"></div>
        
        {/* Messages */}
        {messages.map((message, index) => (
          <div key={message.id} className="message-enter flex-shrink-0">
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
          <div className="flex justify-start flex-shrink-0">
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
        <div ref={messagesEndRef} className="flex-shrink-0" />
        
        {/* Helpful scroll indicator for long conversations */}
        {messages.length > 10 && (
          <div className={`text-center py-2 text-xs flex-shrink-0 ${
            darkMode ? 'text-gray-500' : 'text-gray-400'
          }`}>
            <p>↑ Scroll up to see earlier messages</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageList;