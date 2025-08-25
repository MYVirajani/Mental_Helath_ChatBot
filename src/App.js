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
      {/* Full viewport container - CRITICAL: Must be h-screen */}
      <div className={`h-screen w-full overflow-hidden transition-colors duration-300 ${
        darkMode 
          ? 'bg-gray-900 text-white' 
          : 'bg-gradient-to-br from-blue-50 to-indigo-100 text-gray-800'
      }`}>
        
        {/* Desktop Sidebar - Completely Fixed */}
        <div className="hidden lg:block fixed left-0 top-0 w-80 h-screen z-40">
          <Sidebar />
        </div>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div 
              className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
              onClick={() => setSidebarOpen(false)} 
            />
            <div className="absolute left-0 top-0 w-80 h-full max-w-[80vw]">
              <Sidebar 
                isMobile={true}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Main Content Area - CRITICAL: Must take full height */}
        <div className="h-screen flex flex-col lg:pl-80">
          
          {/* Mobile Header - Fixed height */}
          <div className="lg:hidden flex-shrink-0">
            <MobileHeader onOpenSidebar={() => setSidebarOpen(true)} />
          </div>

          {/* Chat Interface Container - CRITICAL: Must take remaining height */}
          <div className="flex-1 min-h-0">
            <ChatInterface />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;