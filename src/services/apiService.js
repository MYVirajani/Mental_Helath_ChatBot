// src/services/apiService.js
import { fallbackResponses } from '../data/fallbackResponses';

class APIService {
  constructor() {
    this.apiKey = process.env.REACT_APP_GEMINI_API_KEY || '';
    this.apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  }

  setUserApiKey(key) {
    this.userApiKey = key;
  }

  async callGeminiAPI(message, mode = 'general', systemPrompt = '') {
    const apiKey = this.userApiKey || this.apiKey;
    
    // If no API key available, use fallback responses
    if (!apiKey) {
      return this.getFallbackResponse(message, mode);
    }

    try {
      const fullPrompt = systemPrompt + " Keep responses conversational, supportive, and under 200 words. Always remind users to seek professional help for serious mental health concerns.";
      
      const response = await fetch(`${this.apiEndpoint}?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${fullPrompt}\n\nUser: ${message}`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0] && data.candidates[0].content) {
        return data.candidates[0].content.parts[0].text;
      } else {
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.warn('Gemini API Error, using fallback:', error);
      return this.getFallbackResponse(message, mode);
    }
  }

  getKeywords(text) {
    const lower = text.toLowerCase();
    
    // Stress and anxiety keywords
    if (lower.match(/(stress|anxious|worried|panic|fear|nervous|tension)/)) return 'stress';
    
    // Overwhelm keywords
    if (lower.match(/(overwhelm|too much|can't handle|exhausted|burned out)/)) return 'overwhelmed';
    
    // Motivation keywords
    if (lower.match(/(motivation|motivated|lazy|procrastinat|energy|drive)/)) return 'motivation';
    
    // Goal-related keywords
    if (lower.match(/(goal|goals|achieve|accomplish|plan|target)/)) return 'goals';
    
    // Focus and concentration
    if (lower.match(/(focus|distract|concentrate|attention|mind wander)/)) return 'focus';
    
    // Breathing and relaxation
    if (lower.match(/(breath|breathing|relax|calm|peace)/)) return 'breathing';
    
    // Mindfulness and meditation
    if (lower.match(/(mindful|present|meditation|awareness|ground)/)) return 'mindfulness';
    
    // Confidence and self-esteem
    if (lower.match(/(confidence|doubt|believe|worth|capable|self-esteem)/)) return 'confidence';
    
    // Exercise and movement
    if (lower.match(/(exercise|workout|fitness|movement|active|gym)/)) return 'exercise';
    
    // Sleep issues
    if (lower.match(/(sleep|insomnia|tired|rest|wake up)/)) return 'sleep';
    
    // Relationship issues
    if (lower.match(/(relationship|friend|family|social|lonely|isolated)/)) return 'relationships';
    
    return 'general';
  }

  getFallbackResponse(message, mode = 'general') {
    const keyword = this.getKeywords(message);
    const modeResponses = fallbackResponses[mode] || fallbackResponses.general;
    const responses = modeResponses[keyword] || modeResponses.stress || fallbackResponses.general.stress;
    
    // Add some randomization to make responses feel more natural
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    // Add empathy prefix occasionally
    const empathyPrefixes = [
      "I hear you. ",
      "That sounds challenging. ",
      "I understand. ",
      "Thank you for sharing that with me. ",
      ""
    ];
    
    const prefix = Math.random() < 0.3 ? empathyPrefixes[Math.floor(Math.random() * empathyPrefixes.length)] : "";
    
    return prefix + randomResponse;
  }

  // Rate limiting for API calls
  async callWithRateLimit(message, mode, systemPrompt) {
    // Simple rate limiting - store last call time
    const now = Date.now();
    const lastCall = localStorage.getItem('lastAPICall');
    const minInterval = 1000; // 1 second minimum between calls
    
    if (lastCall && (now - parseInt(lastCall)) < minInterval) {
      await new Promise(resolve => setTimeout(resolve, minInterval - (now - parseInt(lastCall))));
    }
    
    localStorage.setItem('lastAPICall', Date.now().toString());
    return this.callGeminiAPI(message, mode, systemPrompt);
  }
}

export default new APIService();