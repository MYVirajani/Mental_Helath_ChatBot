import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { chatModes } from '../data/modes';

const ChatContext = createContext();

export const useChat = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
};

// Chat reducer to manage complex state
const chatReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.payload],
        lastMessageTime: Date.now()
      };

    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };

    case 'SET_MODE':
      return {
        ...state,
        selectedMode: action.payload,
        modeChangeCount: state.modeChangeCount + 1
      };

    case 'SET_INPUT':
      return {
        ...state,
        inputMessage: action.payload
      };

    case 'SET_API_KEY':
      return {
        ...state,
        userApiKey: action.payload
      };

    case 'TOGGLE_AI_MODE':
      return {
        ...state,
        useAI: !state.useAI
      };

    case 'CLEAR_CHAT':
      return {
        ...state,
        messages: [
          {
            id: 1,
            text: "Hello! I'm your personal mental health and productivity coach. I'm here to support you with stress management, motivation, goal-setting, and general well-being. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
          }
        ],
        inputMessage: '',
        sessionStartTime: Date.now()
      };

    case 'UPDATE_STATS':
      return {
        ...state,
        messageCount: state.messageCount + 1,
        totalCharacters: state.totalCharacters + (action.payload?.length || 0)
      };

    case 'SET_SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.payload
        }
      };

    default:
      return state;
  }
};

// Initial state
const initialState = {
  messages: [
    {
      id: 1,
      text: "Hello! I'm your personal mental health and productivity coach. I'm here to support you with stress management, motivation, goal-setting, and general well-being. How can I help you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ],
  inputMessage: '',
  isLoading: false,
  selectedMode: 'general',
  useAI: false,
  userApiKey: '',
  sessionStartTime: Date.now(),
  lastMessageTime: null,
  messageCount: 0,
  modeChangeCount: 0,
  totalCharacters: 0,
  settings: {
    autoScroll: true,
    soundEnabled: false,
    compactMode: false,
    showTimestamps: true
  }
};

export const ChatProvider = ({ children }) => {
  const [state, dispatch] = useReducer(chatReducer, initialState);

  // Load saved state from localStorage on mount
  useEffect(() => {
    try {
      const savedState = localStorage.getItem('chatState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        // Only restore certain parts of the state
        if (parsed.selectedMode) {
          dispatch({ type: 'SET_MODE', payload: parsed.selectedMode });
        }
        if (parsed.useAI !== undefined) {
          dispatch({ type: 'TOGGLE_AI_MODE' });
        }
        if (parsed.userApiKey) {
          dispatch({ type: 'SET_API_KEY', payload: parsed.userApiKey });
        }
        if (parsed.settings) {
          dispatch({ type: 'SET_SETTINGS', payload: parsed.settings });
        }
      }
    } catch (error) {
      console.warn('Failed to load saved chat state:', error);
    }
  }, []);

  // Save certain state to localStorage
  useEffect(() => {
    try {
      const stateToSave = {
        selectedMode: state.selectedMode,
        useAI: state.useAI,
        userApiKey: state.userApiKey,
        settings: state.settings
      };
      localStorage.setItem('chatState', JSON.stringify(stateToSave));
    } catch (error) {
      console.warn('Failed to save chat state:', error);
    }
  }, [state.selectedMode, state.useAI, state.userApiKey, state.settings]);

  // Helper functions
  const addMessage = (message) => {
    const messageWithId = {
      ...message,
      id: Date.now() + Math.random(),
      timestamp: new Date()
    };
    dispatch({ type: 'ADD_MESSAGE', payload: messageWithId });
    dispatch({ type: 'UPDATE_STATS', payload: message.text });
  };

  const setLoading = (loading) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setMode = (mode) => {
    if (chatModes[mode]) {
      dispatch({ type: 'SET_MODE', payload: mode });
    }
  };

  const setInput = (input) => {
    dispatch({ type: 'SET_INPUT', payload: input });
  };

  const setApiKey = (key) => {
    dispatch({ type: 'SET_API_KEY', payload: key });
  };

  const toggleAIMode = () => {
    dispatch({ type: 'TOGGLE_AI_MODE' });
  };

  const clearChat = () => {
    dispatch({ type: 'CLEAR_CHAT' });
  };

  const updateSettings = (newSettings) => {
    dispatch({ type: 'SET_SETTINGS', payload: newSettings });
  };

  // Derived state
  const currentMode = chatModes[state.selectedMode] || chatModes.general;
  const sessionDuration = Date.now() - state.sessionStartTime;
  const averageMessageLength = state.messageCount > 0 
    ? Math.round(state.totalCharacters / state.messageCount) 
    : 0;

  const value = {
    // State
    ...state,
    currentMode,
    sessionDuration,
    averageMessageLength,

    // Actions
    addMessage,
    setLoading,
    setMode,
    setInput,
    setApiKey,
    toggleAIMode,
    clearChat,
    updateSettings,
    dispatch
  };

  return (
    <ChatContext.Provider value={value}>
      {children}
    </ChatContext.Provider>
  );
};