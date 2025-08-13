import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage with React state
 * @param {string} key - localStorage key
 * @param {*} initialValue - initial value if not found in localStorage
 * @returns {[*, function]} - [storedValue, setValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // setValue function that updates both state and localStorage
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Save state
      setStoredValue(valueToStore);
      
      // Save to localStorage
      if (valueToStore === undefined || valueToStore === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
};

/**
 * Hook for managing multiple localStorage keys as an object
 * @param {Object} initialValues - object with key-value pairs
 * @returns {[Object, function]} - [values, updateValues]
 */
export const useMultipleLocalStorage = (initialValues) => {
  const [values, setValues] = useState(() => {
    const stored = {};
    
    Object.keys(initialValues).forEach(key => {
      try {
        const item = window.localStorage.getItem(key);
        stored[key] = item ? JSON.parse(item) : initialValues[key];
      } catch (error) {
        console.warn(`Error reading localStorage key "${key}":`, error);
        stored[key] = initialValues[key];
      }
    });
    
    return stored;
  });

  const updateValues = (updates) => {
    setValues(prevValues => {
      const newValues = { ...prevValues, ...updates };
      
      // Update localStorage for changed values
      Object.keys(updates).forEach(key => {
        try {
          if (updates[key] === undefined || updates[key] === null) {
            window.localStorage.removeItem(key);
          } else {
            window.localStorage.setItem(key, JSON.stringify(updates[key]));
          }
        } catch (error) {
          console.error(`Error setting localStorage key "${key}":`, error);
        }
      });
      
      return newValues;
    });
  };

  return [values, updateValues];
};

/**
 * Hook for localStorage with expiration
 * @param {string} key - localStorage key
 * @param {*} initialValue - initial value
 * @param {number} ttl - time to live in milliseconds
 * @returns {[*, function, function]} - [storedValue, setValue, clearValue]
 */
export const useLocalStorageWithExpiry = (key, initialValue, ttl = null) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;

      const data = JSON.parse(item);
      
      // Check if item has expired
      if (ttl && data.timestamp && Date.now() - data.timestamp > ttl) {
        window.localStorage.removeItem(key);
        return initialValue;
      }
      
      return data.value || initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);

      const dataToStore = {
        value: valueToStore,
        timestamp: Date.now()
      };

      if (valueToStore === undefined || valueToStore === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(dataToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  const clearValue = () => {
    try {
      window.localStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error(`Error clearing localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue, clearValue];
};

/**
 * Hook for detecting localStorage changes across tabs
 * @param {string} key - localStorage key to watch
 * @param {function} callback - callback function when key changes
 */
export const useLocalStorageListener = (key, callback) => {
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key) {
        try {
          const newValue = e.newValue ? JSON.parse(e.newValue) : null;
          const oldValue = e.oldValue ? JSON.parse(e.oldValue) : null;
          callback(newValue, oldValue);
        } catch (error) {
          console.warn(`Error parsing localStorage change for key "${key}":`, error);
          callback(e.newValue, e.oldValue);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [key, callback]);
};

export default useLocalStorage;