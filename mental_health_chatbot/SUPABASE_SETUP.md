# Supabase Vector Store Setup Guide

## 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Note down your project URL and anon key from Settings > API

## 2. Set up Environment Variables

Create a `.env` file in your project root with:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
VITE_OPENROUTER_API_KEY=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
```

## 3. Run Database Schema

1. Go to your Supabase dashboard > SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the SQL commands to create the tables

## 4. Features Enabled

✅ **Conversation Persistence**: All chat messages are stored in Supabase
✅ **Session Management**: Each conversation gets a unique session ID
✅ **Context Awareness**: AI can access previous conversation history
✅ **Vector Search**: Ready for embedding-based similarity search
✅ **User Management**: Support for multiple users (currently anonymous)

## 5. Database Tables Created

- `conversation_sessions`: Stores conversation session metadata
- `conversations`: Stores individual messages with embeddings
- `conversation_history_view`: View for easy querying
- `get_conversation_context()`: Function for AI context retrieval

## 6. Next Steps

- Replace the simple hash embedding with real OpenAI embeddings
- Add user authentication for personalized conversations
- Implement vector similarity search for better context retrieval
- Add conversation analytics and insights

## 7. Testing

The chatbot will now:
- Automatically create conversation sessions
- Store all messages in Supabase
- Load conversation history on page refresh
- Provide better context-aware responses

