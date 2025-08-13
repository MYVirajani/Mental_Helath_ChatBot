// Application constants

export const APP_CONFIG = {
  name: 'Mental Health & Productivity Coach',
  version: '1.0.0',
  description: 'Your compassionate AI companion for wellness and growth',
  author: 'Mental Health Chatbot Team',
  supportEmail: 'support@mentalhealthchatbot.com',
  privacyUrl: '/privacy',
  termsUrl: '/terms'
};

export const API_CONFIG = {
  geminiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
  timeout: 30000, // 30 seconds
  maxRetries: 3,
  rateLimitPerMinute: 30,
  maxTokens: 200,
  temperature: 0.7
};

export const CHAT_CONFIG = {
  maxMessageLength: 1000,
  maxHistoryLength: 100,
  typingDelay: 1000,
  autoScrollDelay: 100,
  maxContextLength: 10, // Number of previous messages to include as context
  fallbackDelay: 500 // Delay before showing fallback response
};

export const STORAGE_KEYS = {
  theme: 'mentalHealthBot_theme',
  chatHistory: 'mentalHealthBot_chatHistory',
  settings: 'mentalHealthBot_settings',
  apiKey: 'mentalHealthBot_apiKey',
  lastSession: 'mentalHealthBot_lastSession',
  userPreferences: 'mentalHealthBot_preferences'
};

export const THEME_OPTIONS = {
  light: {
    name: 'Light',
    value: 'light',
    primary: '#3b82f6',
    background: '#ffffff'
  },
  dark: {
    name: 'Dark', 
    value: 'dark',
    primary: '#60a5fa',
    background: '#111827'
  },
  auto: {
    name: 'Auto',
    value: 'auto',
    primary: '#3b82f6',
    background: 'system'
  }
};

export const MESSAGE_TYPES = {
  USER: 'user',
  BOT: 'bot',
  SYSTEM: 'system',
  ERROR: 'error'
};

export const COACHING_MODES = {
  GENERAL: 'general',
  PRODUCTIVITY: 'productivity',
  MINDFULNESS: 'mindfulness',
  MOTIVATION: 'motivation',
  ANXIETY: 'anxiety',
  ENERGY: 'energy'
};

export const RESPONSE_CATEGORIES = {
  stress: ['stress', 'anxious', 'worried', 'panic', 'fear', 'nervous', 'tension'],
  overwhelmed: ['overwhelm', 'too much', 'can\'t handle', 'exhausted', 'burned out'],
  motivation: ['motivation', 'motivated', 'lazy', 'procrastinating', 'energy', 'drive'],
  goals: ['goal', 'goals', 'achieve', 'accomplish', 'plan', 'target'],
  focus: ['focus', 'distract', 'concentrate', 'attention', 'mind wander'],
  breathing: ['breath', 'breathing', 'relax', 'calm', 'peace'],
  mindfulness: ['mindful', 'present', 'meditation', 'awareness', 'ground'],
  confidence: ['confidence', 'doubt', 'believe', 'worth', 'capable', 'self-esteem'],
  exercise: ['exercise', 'workout', 'fitness', 'movement', 'active', 'gym'],
  sleep: ['sleep', 'insomnia', 'tired', 'rest', 'wake up'],
  relationships: ['relationship', 'friend', 'family', 'social', 'lonely', 'isolated']
};

export const URGENCY_KEYWORDS = [
  'urgent', 'emergency', 'crisis', 'help me', 'desperate', 
  'can\'t cope', 'suicidal', 'self-harm', 'hurt myself'
];

export const PROFESSIONAL_HELP_RESOURCES = {
  crisis: {
    us: {
      name: 'National Suicide Prevention Lifeline',
      phone: '988',
      website: 'https://suicidepreventionlifeline.org/'
    },
    uk: {
      name: 'Samaritans',
      phone: '116 123',
      website: 'https://www.samaritans.org/'
    },
    international: {
      name: 'International Crisis Helplines',
      website: 'https://findahelpline.com/'
    }
  },
  therapy: {
    name: 'Psychology Today Therapist Directory',
    website: 'https://www.psychologytoday.com/us/therapists'
  }
};

export const ANIMATION_DURATIONS = {
  fast: 150,
  normal: 300,
  slow: 500,
  message: 400,
  typing: 1400
};

export const BREAKPOINTS = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px'
};

export const ERROR_MESSAGES = {
  networkError: 'Network connection error. Please check your internet connection.',
  apiError: 'Unable to get AI response. Using offline mode.',
  rateLimitError: 'Too many requests. Please wait a moment before sending another message.',
  invalidApiKey: 'Invalid API key. Please check your settings.',
  messageToLong: 'Message is too long. Please keep it under 1000 characters.',
  generalError: 'Something went wrong. Please try again.'
};

export const SUCCESS_MESSAGES = {
  settingsSaved: 'Settings saved successfully!',
  chatCleared: 'Chat history cleared.',
  dataExported: 'Data exported successfully.',
  apiKeyUpdated: 'API key updated successfully.'
};

export const FEATURE_FLAGS = {
  voiceInput: process.env.REACT_APP_ENABLE_VOICE_INPUT === 'true',
  dataExport: process.env.REACT_APP_ENABLE_EXPORT !== 'false',
  themes: process.env.REACT_APP_ENABLE_THEMES !== 'false',
  analytics: process.env.REACT_APP_ANALYTICS_ENABLED === 'true',
  debugMode: process.env.REACT_APP_DEV_MODE === 'true'
};

export default {
  APP_CONFIG,
  API_CONFIG,
  CHAT_CONFIG,
  STORAGE_KEYS,
  THEME_OPTIONS,
  MESSAGE_TYPES,
  COACHING_MODES,
  RESPONSE_CATEGORIES,
  URGENCY_KEYWORDS,
  PROFESSIONAL_HELP_RESOURCES,
  ANIMATION_DURATIONS,
  BREAKPOINTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  FEATURE_FLAGS
};