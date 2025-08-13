import apiService from './apiService';
import { fallbackResponses } from '../data/fallbackResponses';

class ChatService {
  constructor() {
    this.conversationHistory = [];
    this.maxHistoryLength = 10; // Keep last 10 exchanges for context
  }

  async getResponse(userMessage, mode, useAI = false, apiKey = '') {
    // Add user message to history
    this.addToHistory('user', userMessage);

    let response;
    
    if (useAI && (apiKey || process.env.REACT_APP_GEMINI_API_KEY)) {
      try {
        // Try to get AI response
        response = await this.getAIResponse(userMessage, mode, apiKey);
      } catch (error) {
        console.warn('AI response failed, falling back to offline mode:', error);
        response = this.getFallbackResponse(userMessage, mode.key);
      }
    } else {
      // Use fallback responses
      response = this.getFallbackResponse(userMessage, mode.key);
    }

    // Add bot response to history
    this.addToHistory('bot', response);

    return response;
  }

  async getAIResponse(userMessage, mode, apiKey = '') {
    // Set user API key if provided
    if (apiKey) {
      apiService.setUserApiKey(apiKey);
    }

    // Build context from conversation history
    const context = this.buildContext();
    const fullPrompt = mode.prompt + (context ? `\n\nConversation context:\n${context}` : '');

    // Call AI service
    return await apiService.callWithRateLimit(userMessage, mode.key, fullPrompt);
  }

  getFallbackResponse(userMessage, modeKey) {
    return apiService.getFallbackResponse(userMessage, modeKey);
  }

  buildContext() {
    if (this.conversationHistory.length === 0) return '';

    // Build a brief context from recent conversation
    const recentHistory = this.conversationHistory.slice(-6); // Last 3 exchanges
    return recentHistory
      .map(entry => `${entry.sender}: ${entry.message}`)
      .join('\n');
  }

  addToHistory(sender, message) {
    this.conversationHistory.push({
      sender,
      message: message.substring(0, 200), // Truncate very long messages for context
      timestamp: Date.now()
    });

    // Keep only recent history to avoid token limits
    if (this.conversationHistory.length > this.maxHistoryLength) {
      this.conversationHistory = this.conversationHistory.slice(-this.maxHistoryLength);
    }
  }

  clearHistory() {
    this.conversationHistory = [];
  }

  // Analyze user message for better response matching
  analyzeUserIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // Urgency indicators
    const urgencyKeywords = ['urgent', 'emergency', 'crisis', 'help me', 'desperate', 'can\'t cope'];
    const isUrgent = urgencyKeywords.some(keyword => lowerMessage.includes(keyword));
    
    // Emotion indicators
    const emotions = {
      anxiety: ['anxious', 'worried', 'nervous', 'panic', 'fear'],
      depression: ['sad', 'depressed', 'down', 'hopeless', 'empty'],
      stress: ['stressed', 'overwhelmed', 'pressure', 'tension'],
      anger: ['angry', 'frustrated', 'mad', 'irritated', 'furious'],
      joy: ['happy', 'excited', 'great', 'amazing', 'wonderful']
    };

    const detectedEmotion = Object.keys(emotions).find(emotion =>
      emotions[emotion].some(keyword => lowerMessage.includes(keyword))
    );

    // Question types
    const isQuestion = lowerMessage.includes('?') || 
                     lowerMessage.startsWith('how') || 
                     lowerMessage.startsWith('what') || 
                     lowerMessage.startsWith('why') || 
                     lowerMessage.startsWith('when') || 
                     lowerMessage.startsWith('where');

    return {
      isUrgent,
      detectedEmotion,
      isQuestion,
      messageLength: message.length,
      wordCount: message.split(' ').length
    };
  }

  // Get response suggestions based on conversation flow
  getFollowUpSuggestions(lastBotResponse, userMessage) {
    const suggestions = [];
    
    if (lastBotResponse.includes('breathing')) {
      suggestions.push("That helped, what's next?", "I'd like to try another technique");
    }
    
    if (lastBotResponse.includes('goal')) {
      suggestions.push("Help me break this down further", "How do I stay motivated?");
    }
    
    if (lastBotResponse.includes('stress')) {
      suggestions.push("I need more coping strategies", "Tell me about mindfulness");
    }

    return suggestions;
  }

  // Export conversation for user
  exportConversation() {
    return {
      timestamp: new Date().toISOString(),
      history: this.conversationHistory,
      totalExchanges: Math.floor(this.conversationHistory.length / 2),
      duration: this.conversationHistory.length > 0 
        ? Date.now() - this.conversationHistory[0].timestamp 
        : 0
    };
  }
}

export const chatService = new ChatService();
export default chatService;