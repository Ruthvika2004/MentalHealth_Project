// Chat service for OpenRouter API integration with Supabase vector store
import { conversationStore } from './supabaseService';

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY || "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";

// System prompt for the mental health chatbot
const SYSTEM_PROMPT = `You are an empathetic and clinically informed mental health support chatbot designed to promote emotional well-being through warm, reflective, and safe conversations.

Your role is to support, not replace, human mental health care. Always maintain empathy, respect, and safety in all responses.

Tone and Communication Style:
- Always communicate with kindness, validation, and emotional understanding.
- Use gentle phrasing and avoid judgment or advice-giving.
- Encourage users to express their emotions freely.
- Offer soothing reflections and helpful grounding suggestions when appropriate.

Context Awareness:
- Be aware of emotional patterns or distress signals in user messages.
- Personalize your responses to their situation and emotional tone.

Crisis Sensitivity:
If the user expresses severe sadness, suicidal thoughts, or self-harm intentions, immediately respond with empathy and safety guidance.
Say something like: "I'm really sorry you're feeling this way. You're not alone in this, and help is available. Please consider reaching out for immediate support."
Then mention: "You can call 988 (in the U.S.) or your local mental health helpline."
Do not attempt to give therapy or crisis intervention advice yourself.

Ethical & Privacy Rules:
- Never make medical or diagnostic claims.
- Always remind users that you are an AI mental health support assistant, not a licensed therapist.
- Maintain neutrality, cultural sensitivity, and confidentiality.

Objective:
Create a calm, emotionally safe space. Encourage emotional expression, reflection, and small steps toward self-care.
If signs of crisis appear, trigger a gentle crisis message and let the frontend handle emergency options like the call button.`;

// Conversation memory - stores the conversation history
let conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
let currentConversationId = null;

// Function to call OpenRouter API with streaming and Supabase integration
export async function callOpenRouterStream(userMessage, onChunk, onComplete, onError, conversationId = null) {
  try {
    // Initialize conversation session if needed
    if (!currentConversationId && !conversationId) {
      currentConversationId = await conversationStore.createConversationSession();
    } else if (conversationId) {
      currentConversationId = conversationId;
    }

    // Store user message in Supabase
    if (currentConversationId) {
      await conversationStore.storeMessage(currentConversationId, userMessage, 'user');
    }

    // Add user message to conversation history
    conversationHistory.push({ role: "user", content: userMessage });

    // Get conversation context from Supabase for better context
    let contextMessages = conversationHistory;
    if (currentConversationId) {
      const context = await conversationStore.getConversationContext(currentConversationId, 10);
      if (context.length > 0) {
        contextMessages = [{ role: "system", content: SYSTEM_PROMPT }, ...context];
      }
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-nano-9b-v2:free',
        messages: contextMessages,
        stream: true,
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenRouter error: ${response.status} - ${errorText}`);
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let assistantReply = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || ''; // keep incomplete line

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data: ')) continue;

        const data = trimmed.slice(6);
        if (data === '[DONE]') {
          // Store assistant response in Supabase
          if (currentConversationId) {
            await conversationStore.storeMessage(currentConversationId, assistantReply.trim(), 'bot');
          }
          
          // Add assistant response to conversation history
          conversationHistory.push({ role: "assistant", content: assistantReply.trim() });
          onComplete(assistantReply.trim());
          return;
        }

        try {
          const parsed = JSON.parse(data);
          const content = parsed.choices?.[0]?.delta?.content;
          if (content) {
            assistantReply += content;
            onChunk(content);
          }
        } catch (e) {
          console.error('Parse error:', e.message, '\nData:', data);
        }
      }
    }
  } catch (error) {
    console.error('Error calling OpenRouter API:', error);
    onError(error);
  }
}

// Function to clear conversation history
export function clearConversationHistory() {
  conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
  currentConversationId = null;
}

// Function to clear conversation from Supabase
export async function clearConversationFromSupabase() {
  if (currentConversationId) {
    await conversationStore.deleteConversation(currentConversationId);
    currentConversationId = null;
  }
  clearConversationHistory();
}

// Function to get current conversation ID
export function getCurrentConversationId() {
  return currentConversationId;
}

// Function to load conversation from Supabase
export async function loadConversationFromSupabase(conversationId) {
  try {
    const history = await conversationStore.getConversationHistory(conversationId);
    if (history.length > 0) {
      currentConversationId = conversationId;
      conversationHistory = [{ role: "system", content: SYSTEM_PROMPT }];
      
      // Convert Supabase messages to conversation format
      history.forEach(msg => {
        conversationHistory.push({
          role: msg.sender === 'user' ? 'user' : 'assistant',
          content: msg.message
        });
      });
      
      return history;
    }
    return [];
  } catch (error) {
    console.error('Error loading conversation:', error);
    return [];
  }
}

// Function to get conversation history from Supabase
export async function getConversationHistoryFromSupabase(conversationId) {
  try {
    return await conversationStore.getConversationHistory(conversationId);
  } catch (error) {
    console.error('Error getting conversation history:', error);
    return [];
  }
}

// Function to get conversation history (for debugging)
export function getConversationHistory() {
  return conversationHistory;
}

// Function to check for emergency keywords
export function checkForEmergencyKeywords(message) {
  const emergencyKeywords = [
    "suicide", "kill myself", "end my life", "want to die", "harm myself",
    "hurt myself", "not worth living", "better off dead", "end it all",
    "suicidal", "want to die", "don't want to live", "can't go on",
    "extreme sadness", "hopeless", "no point", "give up", "self harm",
    "wanna kill myself", "want to kill myself", "kill myself", "end myself",
    "take my life", "end it all", "not worth it", "better off dead",
    "will kill myself", "i will kill myself", "i wanna kill myself",
    "ill kill myself", "i'll kill myself", "kill me", "kill me again",
    "going to kill myself", "gonna kill myself", "planning to kill myself",
    "thinking of killing myself", "considering suicide", "suicidal thoughts"
  ];
  
  const messageLower = message.toLowerCase();
  const result = emergencyKeywords.some(keyword => 
    messageLower.includes(keyword.toLowerCase())
  );
  
  console.log('Emergency keyword check:', { message, messageLower, result });
  return result;
}

// Function to check for extreme sadness or crisis indicators
export function checkForCrisisIndicators(message) {
  const crisisIndicators = [
    "extremely sad", "devastated", "broken", "can't cope", "overwhelmed",
    "hopeless", "worthless", "alone", "nobody cares", "crying constantly",
    "can't stop crying", "feel like dying", "want to disappear",
    "extreme depression", "severe anxiety", "panic attack", "can't breathe"
  ];
  
  const messageLower = message.toLowerCase();
  return crisisIndicators.some(indicator => 
    messageLower.includes(indicator.toLowerCase())
  );
}

// Function to get crisis response message
export function getCrisisResponseMessage() {
  return "I'm really concerned about your safety and well-being. Your feelings are valid, and it's important that you know you're not alone. Please click on the buttons below to call a crisis support service right now. These are trained professionals who can help you through this difficult time.";
}

// Function to check for meditation suggestions
export function checkForMeditationSuggestions(message) {
  const meditationKeywords = [
    "meditation", "mindfulness", "breathing exercise", "breathing technique",
    "guided meditation", "relaxation", "calm down", "stress relief",
    "anxiety relief", "meditation practice", "mindful breathing"
  ];
  
  const messageLower = message.toLowerCase();
  return meditationKeywords.some(keyword => 
    messageLower.includes(keyword.toLowerCase())
  );
}

// Function to create meditation message
export function createMeditationMessage(content, meditationTitle = "Meditation Exercise") {
  return {
    type: "meditation",
    content: content,
    meditationTitle: meditationTitle,
    timestamp: new Date()
  };
}

// Function to analyze behavior patterns using OpenRouter API
export async function analyzeBehaviorPatterns(conversations, timeRange = 30) {
  try {
    // Prepare conversation data for analysis
    const conversationText = conversations.map(conv => {
      const messages = conv.messages || [];
      return messages.map(msg => `${msg.sender}: ${msg.content}`).join('\n');
    }).join('\n\n---\n\n');

    // Create analysis prompt
    const analysisPrompt = `Please analyze the following conversation data and provide a comprehensive behavior analysis report for a mental health professional. Focus on identifying patterns, mood trends, and areas of concern that would be valuable for therapy sessions.

CONVERSATION DATA:
${conversationText}

Please provide a detailed analysis in the following JSON format. CRITICAL: All text content must be written in natural, professional language that a therapist can read directly - NOT in JSON format or technical language.

{
  "summary": {
    "overview": "Write a clear, professional summary paragraph describing the user's mental health patterns and key observations that a therapist should know. Use natural language, not technical terms.",
    "detailedInsights": "Write a comprehensive 500 wordparagraph about behavioral patterns, emotional states, and communication style. Use professional but accessible language that flows naturally when read aloud."
  },
  "moodPatterns": {
    "primaryMood": "Describe the most frequently expressed mood in natural language (e.g., 'The user primarily experiences anxiety with periods of depression')",
    "stability": "Describe mood stability in natural language (e.g., 'Mood shows significant variability with frequent fluctuations between anxious and calm states')",
    "commonMoods": ["List emotions in natural language", "Not technical terms", "But readable descriptions"],
    "trends": "Describe mood trends over time in natural language (e.g., 'Mood appears to be declining over the analysis period with increased anxiety levels')"
  },
  "crisisIndicators": {
    "level": "Low/Medium/High",
    "riskFactors": ["Write specific risk factors in natural language", "Not technical terms", "But clear descriptions"],
    "protectiveFactors": ["Write protective factors in natural language", "Not technical terms", "But clear descriptions"],
    "recommendations": ["Write specific clinical recommendations in natural language", "Not technical terms", "But actionable advice"]
  },
  "topicAnalysis": {
    "primaryConcerns": ["Write main concerns in natural language", "Not technical terms", "But clear descriptions"],
    "frequentTopics": ["Write frequently discussed topics in natural language", "Not technical terms", "But clear descriptions"],
    "evolution": "Describe how concerns have evolved over time in natural language (e.g., 'The user's initial focus on work stress has expanded to include relationship and sleep concerns')"
  },
  "communicationPatterns": {
    "responseTime": "Describe response patterns in natural language (e.g., 'The user engages quickly and frequently with the chatbot')",
    "messageLength": "Describe message characteristics in natural language (e.g., 'The user provides detailed responses with good self-reflection')",
    "engagementLevel": "Describe engagement level in natural language (e.g., 'The user shows high engagement with consistent interaction')",
    "communicationStyle": "Describe communication style in natural language (e.g., 'The user is open and honest, willing to share personal details')"
  },
  "recommendations": [
    "Write therapy focus areas in natural language",
    "Write coping strategies in natural language", 
    "Write monitoring areas in natural language",
    "Write treatment approaches in natural language"
  ]
}

CRITICAL INSTRUCTIONS:
1. Write ALL content as natural, flowing paragraphs that a therapist can read directly
2. Do NOT use JSON formatting, technical terms, or structured data language
3. Use professional but accessible medical language
4. Make each field a complete, readable sentence or paragraph
5. Focus on actionable insights and clinical observations
6. Write as if speaking to a colleague in a clinical setting`;

    // Call OpenRouter API
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': window.location.origin,
        'X-Title': 'Mental Health Chatbot'
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are a mental health analysis expert. Analyze conversation patterns and provide detailed behavioral insights. CRITICAL: Write all content in natural, flowing language that therapists can read directly. Do NOT use JSON formatting, technical terms, or structured data language. Write as if speaking to a colleague in a clinical setting. Use professional but accessible medical language.'
          },
          {
            role: 'user',
            content: analysisPrompt
          }
        ],
        temperature: 0.3,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      throw new Error(`OpenRouter API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      throw new Error('Invalid response from OpenRouter API');
    }

    const analysisText = data.choices[0].message.content;
    
    // Try to parse the JSON response
    try {
      const analysis = JSON.parse(analysisText);
      
      // Clean up any remaining JSON formatting in text fields
      const cleanText = (text) => {
        if (typeof text === 'string') {
          return text
            .replace(/```json\s*/g, '')
            .replace(/```\s*/g, '')
            .replace(/^\s*{\s*"summary":\s*{\s*"overview":\s*"/, '')
            .replace(/"\s*}\s*}\s*$/, '')
            .replace(/\\"/g, '"')
            .replace(/\\n/g, '\n')
            .trim();
        }
        return text;
      };

      // Clean all text fields
      if (analysis.summary) {
        analysis.summary.overview = cleanText(analysis.summary.overview);
        analysis.summary.detailedInsights = cleanText(analysis.summary.detailedInsights);
      }
      
      if (analysis.moodPatterns) {
        analysis.moodPatterns.primaryMood = cleanText(analysis.moodPatterns.primaryMood);
        analysis.moodPatterns.stability = cleanText(analysis.moodPatterns.stability);
        analysis.moodPatterns.trends = cleanText(analysis.moodPatterns.trends);
        if (Array.isArray(analysis.moodPatterns.commonMoods)) {
          analysis.moodPatterns.commonMoods = analysis.moodPatterns.commonMoods.map(cleanText);
        }
      }
      
      if (analysis.crisisIndicators) {
        if (Array.isArray(analysis.crisisIndicators.riskFactors)) {
          analysis.crisisIndicators.riskFactors = analysis.crisisIndicators.riskFactors.map(cleanText);
        }
        if (Array.isArray(analysis.crisisIndicators.protectiveFactors)) {
          analysis.crisisIndicators.protectiveFactors = analysis.crisisIndicators.protectiveFactors.map(cleanText);
        }
        if (Array.isArray(analysis.crisisIndicators.recommendations)) {
          analysis.crisisIndicators.recommendations = analysis.crisisIndicators.recommendations.map(cleanText);
        }
      }
      
      if (analysis.topicAnalysis) {
        if (Array.isArray(analysis.topicAnalysis.primaryConcerns)) {
          analysis.topicAnalysis.primaryConcerns = analysis.topicAnalysis.primaryConcerns.map(cleanText);
        }
        if (Array.isArray(analysis.topicAnalysis.frequentTopics)) {
          analysis.topicAnalysis.frequentTopics = analysis.topicAnalysis.frequentTopics.map(cleanText);
        }
        analysis.topicAnalysis.evolution = cleanText(analysis.topicAnalysis.evolution);
      }
      
      if (analysis.communicationPatterns) {
        analysis.communicationPatterns.responseTime = cleanText(analysis.communicationPatterns.responseTime);
        analysis.communicationPatterns.messageLength = cleanText(analysis.communicationPatterns.messageLength);
        analysis.communicationPatterns.engagementLevel = cleanText(analysis.communicationPatterns.engagementLevel);
        analysis.communicationPatterns.communicationStyle = cleanText(analysis.communicationPatterns.communicationStyle);
      }
      
      if (Array.isArray(analysis.recommendations)) {
        analysis.recommendations = analysis.recommendations.map(cleanText);
      }
      
      // Add metadata
      analysis.metadata = {
        totalMessages: conversations.reduce((total, conv) => total + (conv.messages?.length || 0), 0),
        timeRange: timeRange,
        analysisDate: new Date().toISOString(),
        userMessages: conversations.reduce((total, conv) => 
          total + (conv.messages?.filter(msg => msg.sender === 'user').length || 0), 0),
        botMessages: conversations.reduce((total, conv) => 
          total + (conv.messages?.filter(msg => msg.sender === 'bot').length || 0), 0)
      };

      return analysis;
    } catch (parseError) {
      console.error('Error parsing analysis JSON:', parseError);
      console.log('Raw response:', analysisText);
      
      // Fallback: create a basic analysis structure
      return {
        summary: {
          overview: "Analysis completed but response format was unexpected. Please review the raw analysis data.",
          detailedInsights: analysisText
        },
        moodPatterns: {
          primaryMood: "Unable to determine",
          stability: "Unable to assess",
          commonMoods: [],
          trends: "Unable to assess"
        },
        crisisIndicators: {
          level: "Unable to assess",
          riskFactors: [],
          protectiveFactors: [],
          recommendations: ["Please review conversation data manually"]
        },
        topicAnalysis: {
          primaryConcerns: [],
          frequentTopics: [],
          evolution: "Unable to assess"
        },
        communicationPatterns: {
          responseTime: "Unable to assess",
          messageLength: "Unable to assess",
          engagementLevel: "Unable to assess",
          communicationStyle: "Unable to assess"
        },
        recommendations: ["Manual review recommended"],
        metadata: {
          totalMessages: conversations.reduce((total, conv) => total + (conv.messages?.length || 0), 0),
          timeRange: timeRange,
          analysisDate: new Date().toISOString(),
          userMessages: conversations.reduce((total, conv) => 
            total + (conv.messages?.filter(msg => msg.sender === 'user').length || 0), 0),
          botMessages: conversations.reduce((total, conv) => 
            total + (conv.messages?.filter(msg => msg.sender === 'bot').length || 0), 0)
        }
      };
    }

  } catch (error) {
    console.error('Error in behavior analysis:', error);
    throw new Error(`Failed to analyze behavior patterns: ${error.message}`);
  }
}
