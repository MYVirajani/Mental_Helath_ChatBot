import React, { useState } from 'react';
import { useChat } from '../../contexts/ChatContext';
import { useTheme } from '../../contexts/ThemeContext';
import { chatModes, getAllModes } from '../../data/modes';
import { CheckCircle, Star, Sparkles, ArrowRight, Zap } from 'lucide-react';

const ModeSelector = () => {
  const { selectedMode, setMode, currentMode } = useChat();
  const { darkMode } = useTheme();
  const allModes = getAllModes();
  const [hoveredMode, setHoveredMode] = useState(null);

  return (
    <div className="space-y-6">
      {/* Current Mode Highlight Card */}
      <div className={`relative p-5 rounded-2xl border-2  overflow-hidden ${
        darkMode 
          ? 'bg-gradient-to-br from-blue-900/30 via-purple-900/20 to-pink-900/30 border-blue-500/40' 
          : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 border-blue-300/50'
      }`}>
        {/* Floating decoration */}
        {/* <div className="absolute top-2 right-2">
          <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
        </div> */}
        
        <div className="flex items-center space-x-4 mb-3">
          <div className={`p-3 rounded-2xl shadow-lg ${
            selectedMode === 'general' && 'bg-gradient-to-r from-blue-500 to-indigo-600' ||
            selectedMode === 'productivity' && 'bg-gradient-to-r from-green-500 to-emerald-600' ||
            selectedMode === 'mindfulness' && 'bg-gradient-to-r from-purple-500 to-violet-600' ||
            selectedMode === 'motivation' && 'bg-gradient-to-r from-orange-500 to-red-600' ||
            selectedMode === 'anxiety' && 'bg-gradient-to-r from-pink-500 to-rose-600' ||
            selectedMode === 'energy' && 'bg-gradient-to-r from-yellow-500 to-amber-600' ||
            'bg-gradient-to-r from-blue-500 to-purple-600'
          }`}>
            {React.createElement(currentMode.icon || 'div', { 
              className: "w-6 h-6 text-white" 
            })}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Active Mode
              </span>
              <CheckCircle className="w-4 h-4 text-green-500" />
            </div>
            <h3 className={`font-bold text-lg ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {currentMode.title}
            </h3>
          </div>
        </div>
        
        <p className={`text-sm leading-relaxed ${
          darkMode ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {currentMode.description}
        </p>
      </div>

      {/* Mode Grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className={`font-semibold flex items-center space-x-2 ${
            darkMode ? 'text-gray-200' : 'text-gray-800'
          }`}>
            <Sparkles className="w-4 h-4 text-purple-500" />
            <span>Choose Your Coach</span>
          </h4>
          {/* <div className={`text-xs px-3 py-1 rounded-full font-medium ${
            darkMode ? 'bg-purple-900/30 text-purple-300' : 'bg-purple-100 text-purple-700'
          }`}>
            {allModes.length} Available
          </div> */}
        </div>

        <div className="grid grid-cols-1 gap-3">
          {allModes.map(({ key, icon: IconComponent, title, color }) => {
            const isSelected = selectedMode === key;
            const isHovered = hoveredMode === key;
            
            return (
              <button
                key={key}
                onClick={() => setMode(key)}
                onMouseEnter={() => setHoveredMode(key)}
                onMouseLeave={() => setHoveredMode(null)}
                className={`group relative p-4 rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-r ${color} text-white border-transparent shadow-xl transform scale-105`
                    : darkMode
                    ? 'bg-gray-800/50 hover:bg-gray-700/60 border-gray-700/50 hover:border-gray-600 text-gray-300 hover:text-white'
                    : 'bg-white/80 hover:bg-white border-gray-200 hover:border-gray-300 text-gray-700 hover:text-gray-900 shadow-sm hover:shadow-lg'
                } hover:scale-105 hover:shadow-2xl`}
                title={chatModes[key]?.description}
              >
                {/* Background pattern for selected item */}
                {isSelected && (
                  <div className="absolute inset-0 bg-white/10 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent)]"></div>
                )}
                
                {/* Content */}
                <div className="relative flex items-center space-x-4">
                  {/* Icon with special effects */}
                  <div className={`relative p-3 rounded-xl transition-all duration-300 ${
                    isSelected 
                      ? 'bg-white/20 shadow-lg' 
                      : darkMode 
                      ? 'bg-gray-700/50 group-hover:bg-gray-600/60' 
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  } ${isHovered ? 'scale-110' : ''}`}>
                    <IconComponent className={`w-5 h-5 transition-colors ${
                      isSelected ? 'text-white' : 'text-gray-600 group-hover:text-gray-800'
                    }`} />
                    
                    {/* Pulse effect for selected */}
                    {isSelected && (
                      <div className="absolute inset-0 bg-white/20 rounded-xl animate-ping"></div>
                    )}
                  </div>
                  
                  {/* Text content */}
                  <div className="flex-1 text-left">
                    <div className="flex items-center space-x-2">
                      <h5 className="font-semibold text-base">{title}</h5>
                      {isSelected && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="w-4 h-4 text-white" />
                          <span className="text-xs font-medium bg-white/20 px-2 py-0.5 rounded-full">
                            Active
                          </span>
                        </div>
                      )}
                    </div>
                    <p className={`text-xs mt-1 ${
                      isSelected 
                        ? 'text-white/80' 
                        : darkMode 
                        ? 'text-gray-400' 
                        : 'text-gray-500'
                    }`}>
                      {chatModes[key]?.shortDescription || 'Specialized coaching mode'}
                    </p>
                  </div>
                  
                  {/* Arrow indicator */}
                  {/* <div className={`transition-all duration-300 ${
                    isHovered || isSelected ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'
                  }`}>
                    {isSelected ? (
                      <Zap className="w-5 h-5 text-white animate-pulse" />
                    ) : (
                      <ArrowRight className={`w-4 h-4 ${
                        darkMode ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    )}
                  </div> */}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quick Stats */}
      {/* <div className={`p-4 rounded-2xl ${
        darkMode ? 'bg-gray-800/30' : 'bg-gray-50/80'
      } border ${darkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
              Ready to coach
            </span>
          </div>
          <span className={`font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-500'
          }`}>
            Switch anytime
          </span>
        </div>
      </div> */}
    </div>
  );
};

export default ModeSelector;