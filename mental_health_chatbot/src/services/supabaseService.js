import { createClient } from '@supabase/supabase-js';

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseKey);

// Vector store service for conversations
export class ConversationVectorStore {
  constructor() {
    this.tableName = 'conversations';
    this.embeddingsTableName = 'conversation_embeddings';
  }

  // Generate embeddings for text (you'll need to implement this with OpenAI or similar)
  async generateEmbedding(text) {
    // For now, we'll use a simple hash as placeholder
    // In production, you'd call OpenAI's embedding API
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  // Store a conversation message
  async storeMessage(conversationId, message, sender, metadata = {}) {
    try {
      const embedding = await this.generateEmbedding(message);
      
      const { data, error } = await supabase
        .from(this.tableName)
        .insert({
          conversation_id: conversationId,
          message: message,
          sender: sender, // 'user' or 'bot'
          embedding: embedding,
          metadata: metadata,
          created_at: new Date().toISOString()
        })
        .select();

      if (error) {
        console.error('Error storing message:', error);
        return null;
      }

      return data[0];
    } catch (error) {
      console.error('Error in storeMessage:', error);
      return null;
    }
  }

  // Retrieve conversation history
  async getConversationHistory(conversationId, limit = 50) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .eq('conversation_id', conversationId)
        .order('created_at', { ascending: true })
        .limit(limit);

      if (error) {
        console.error('Error retrieving conversation:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in getConversationHistory:', error);
      return [];
    }
  }

  // Search for similar conversations
  async searchSimilarConversations(query, limit = 10) {
    try {
      const queryEmbedding = await this.generateEmbedding(query);
      
      // This is a simplified search - in production you'd use vector similarity search
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .ilike('message', `%${query}%`)
        .limit(limit);

      if (error) {
        console.error('Error searching conversations:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error in searchSimilarConversations:', error);
      return [];
    }
  }

  // Create a new conversation session
  async createConversationSession(userId = 'anonymous') {
    try {
      const conversationId = `conv_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      
      const { data, error } = await supabase
        .from('conversation_sessions')
        .insert({
          id: conversationId,
          user_id: userId,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .select();

      if (error) {
        console.error('Error creating conversation session:', error);
        return null;
      }

      return conversationId;
    } catch (error) {
      console.error('Error in createConversationSession:', error);
      return null;
    }
  }

  // Update conversation session
  async updateConversationSession(conversationId, updates = {}) {
    try {
      const { data, error } = await supabase
        .from('conversation_sessions')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', conversationId)
        .select();

      if (error) {
        console.error('Error updating conversation session:', error);
        return null;
      }

      return data[0];
    } catch (error) {
      console.error('Error in updateConversationSession:', error);
      return null;
    }
  }

  // Get conversation context for AI
  async getConversationContext(conversationId, maxMessages = 10) {
    try {
      const history = await this.getConversationHistory(conversationId, maxMessages);
      
      // Format for AI context
      const context = history.map(msg => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.message,
        timestamp: msg.created_at
      }));

      return context;
    } catch (error) {
      console.error('Error in getConversationContext:', error);
      return [];
    }
  }

  // Delete conversation
  async deleteConversation(conversationId) {
    try {
      // Delete messages
      const { error: messagesError } = await supabase
        .from(this.tableName)
        .delete()
        .eq('conversation_id', conversationId);

      if (messagesError) {
        console.error('Error deleting messages:', messagesError);
      }

      // Delete session
      const { error: sessionError } = await supabase
        .from('conversation_sessions')
        .delete()
        .eq('id', conversationId);

      if (sessionError) {
        console.error('Error deleting session:', sessionError);
      }

      return !messagesError && !sessionError;
    } catch (error) {
      console.error('Error in deleteConversation:', error);
      return false;
    }
  }
}

// Export singleton instance
export const conversationStore = new ConversationVectorStore();

// Function to get all conversations for behavior analysis
export const getConversationsFromSupabase = async () => {
  try {
    const { data, error } = await supabase
      .from('conversations')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) {
      console.error('Error fetching conversations:', error);
      return [];
    }

    // Group messages by conversation_id
    const conversationsMap = new Map();
    
    data.forEach(message => {
      const convId = message.conversation_id;
      if (!conversationsMap.has(convId)) {
        conversationsMap.set(convId, {
          id: convId,
          messages: []
        });
      }
      
      conversationsMap.get(convId).messages.push({
        id: message.id,
        sender: message.sender,
        content: message.message,
        timestamp: new Date(message.created_at),
        type: 'text',
        metadata: message.metadata
      });
    });

    return Array.from(conversationsMap.values());
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return [];
  }
};