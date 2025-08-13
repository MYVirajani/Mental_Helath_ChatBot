import { CHAT_CONFIG, STORAGE_KEYS, ERROR_MESSAGES } from './constants';

/**
 * Format timestamp for display
 * @param {Date|string} timestamp 
 * @param {boolean} includeDate 
 * @returns {string}
 */
export const formatTimestamp = (timestamp, includeDate = false) => {
  if (!timestamp) return '';
  
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  
  const timeOptions = { hour: '2-digit', minute: '2-digit' };
  const timeString = date.toLocaleTimeString([], timeOptions);
  
  if (includeDate && !isToday) {
    const dateString = date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    return `${dateString} at ${timeString}`;
  }
  
  return timeString;
};

/**
 * Format duration from milliseconds
 * @param {number} ms 
 * @returns {string}
 */
export const formatDuration = (ms) => {
  if (!ms || ms < 1000) return 'Just started';
  
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  
  if (hours > 0) {
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  }
  
  if (minutes > 0) {
    return `${minutes}m`;
  }
  
  return `${seconds}s`;
};

/**
 * Truncate text to specified length
 * @param {string} text 
 * @param {number} maxLength 
 * @returns {string}
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
};

/**
 * Validate message content
 * @param {string} message 
 * @returns {Object}
 */
export const validateMessage = (message) => {
  const errors = [];
  
  if (!message || !message.trim()) {
    errors.push('Message cannot be empty');
  }
  
  if (message && message.length > CHAT_CONFIG.maxMessageLength) {
    errors.push(ERROR_MESSAGES.messageToLong);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Sanitize user input
 * @param {string} input 
 * @returns {string}
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  
  return input
    .trim()
    .replace(/\s+/g, ' ') // Replace multiple spaces with single space
    .substring(0, CHAT_CONFIG.maxMessageLength);
};

/**
 * Generate unique ID
 * @returns {string}
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Safe localStorage operations
 */
export const storage = {
  get: (key) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (error) {
      console.warn(`Failed to get item from localStorage: ${key}`, error);
      return null;
    }
  },
  
  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.warn(`Failed to set item in localStorage: ${key}`, error);
      return false;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.warn(`Failed to remove item from localStorage: ${key}`, error);
      return false;
    }
  },
  
  clear: () => {
    try {
      // Only clear app-specific keys
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      return true;
    } catch (error) {
      console.warn('Failed to clear localStorage', error);
      return false;
    }
  }
};

/**
 * Debounce function
 * @param {Function} func 
 * @param {number} wait 
 * @returns {Function}
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Throttle function
 * @param {Function} func 
 * @param {number} limit 
 * @returns {Function}
 */
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

/**
 * Check if device is mobile
 * @returns {boolean}
 */
export const isMobile = () => {
  return window.innerWidth < 768;
};

/**
 * Check if device is tablet
 * @returns {boolean}
 */
export const isTablet = () => {
  return window.innerWidth >= 768 && window.innerWidth < 1024;
};

/**
 * Check if device is desktop
 * @returns {boolean}
 */
export const isDesktop = () => {
  return window.innerWidth >= 1024;
};

/**
 * Get device type
 * @returns {string}
 */
export const getDeviceType = () => {
  if (isMobile()) return 'mobile';
  if (isTablet()) return 'tablet';
  return 'desktop';
};

/**
 * Copy text to clipboard
 * @param {string} text 
 * @returns {Promise<boolean>}
 */
export const copyToClipboard = async (text) => {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const success = document.execCommand('copy');
      textArea.remove();
      return success;
    }
  } catch (error) {
    console.error('Failed to copy text:', error);
    return false;
  }
};

/**
 * Download data as JSON file
 * @param {Object} data 
 * @param {string} filename 
 */
export const downloadJSON = (data, filename = 'data.json') => {
  try {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    return true;
  } catch (error) {
    console.error('Failed to download JSON:', error);
    return false;
  }
};

/**
 * Get random item from array
 * @param {Array} array 
 * @returns {*}
 */
export const getRandomItem = (array) => {
  if (!Array.isArray(array) || array.length === 0) return null;
  return array[Math.floor(Math.random() * array.length)];
};

/**
 * Sleep function for async operations
 * @param {number} ms 
 * @returns {Promise}
 */
export const sleep = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Check if string contains profanity (basic filter)
 * @param {string} text 
 * @returns {boolean}
 */
export const containsProfanity = (text) => {
  // Basic profanity filter - you might want to use a more sophisticated library
  const profanityWords = ['badword1', 'badword2']; // Add actual words as needed
  const lowerText = text.toLowerCase();
  return profanityWords.some(word => lowerText.includes(word));
};

/**
 * Extract URLs from text
 * @param {string} text 
 * @returns {Array}
 */
export const extractUrls = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.match(urlRegex) || [];
};

/**
 * Count words in text
 * @param {string} text 
 * @returns {number}
 */
export const countWords = (text) => {
  if (!text) return 0;
  return text.trim().split(/\s+/).filter(word => word.length > 0).length;
};

/**
 * Estimate reading time
 * @param {string} text 
 * @param {number} wpm - words per minute (default: 200)
 * @returns {number} - time in minutes
 */
export const estimateReadingTime = (text, wpm = 200) => {
  const words = countWords(text);
  return Math.ceil(words / wpm);
};

/**
 * Check if user prefers reduced motion
 * @returns {boolean}
 */
export const prefersReducedMotion = () => {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Get system theme preference
 * @returns {string}
 */
export const getSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

/**
 * Format file size
 * @param {number} bytes 
 * @returns {string}
 */
export const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export default {
  formatTimestamp,
  formatDuration,
  truncateText,
  validateMessage,
  sanitizeInput,
  generateId,
  storage,
  debounce,
  throttle,
  isMobile,
  isTablet,
  isDesktop,
  getDeviceType,
  copyToClipboard,
  downloadJSON,
  getRandomItem,
  sleep,
  containsProfanity,
  extractUrls,
  countWords,
  estimateReadingTime,
  prefersReducedMotion,
  getSystemTheme,
  formatFileSize
};