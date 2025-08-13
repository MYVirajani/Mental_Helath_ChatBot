import React, { useState } from 'react';
import ChatInterface from './components/ChatInterface/ChatInterface';
import Sidebar, { MobileHeader } from './components/UI/Sidebar';
import { useTheme } from './contexts/ThemeContext';
import './App.css';

function App() {
  const { darkMode } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className={`min-h-screen transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'
      }`}>
        <div className="flex h-screen">
          
          {/* Desktop Sidebar - Fixed */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <Sidebar />
          </div>

          {/* Mobile Sidebar Overlay */}
          {sidebarOpen && (
            <div className="lg:hidden fixed inset-0 z-50 flex">
              <div 
                className="fixed inset-0 bg-black opacity-50" 
                onClick={() => setSidebarOpen(false)} 
              />
              <div className="relative w-80 max-w-xs">
                <Sidebar 
                  isMobile={true}
                  isOpen={sidebarOpen}
                  onClose={() => setSidebarOpen(false)}
                />
              </div>
            </div>
          )}

          {/* Main Content Area - Scrollable */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
            
            {/* Mobile Header */}
            <MobileHeader onOpenSidebar={() => setSidebarOpen(true)} />

            {/* Chat Interface - Scrollable */}
            <div className="flex-1 overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;