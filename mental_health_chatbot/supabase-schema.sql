-- Supabase SQL Schema for Mental Health Chatbot Vector Store
-- Run these commands in your Supabase SQL editor

-- Create conversation_sessions table
CREATE TABLE IF NOT EXISTS conversation_sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT DEFAULT 'anonymous',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  metadata JSONB DEFAULT '{}'::jsonb
);

-- Create conversations table for storing messages
CREATE TABLE IF NOT EXISTS conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id TEXT REFERENCES conversation_sessions(id) ON DELETE CASCADE,
  message TEXT NOT NULL,
  sender TEXT NOT NULL CHECK (sender IN ('user', 'bot')),
  embedding TEXT, -- Store embedding as text for now
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_conversations_conversation_id ON conversations(conversation_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_sender ON conversations(sender);
CREATE INDEX IF NOT EXISTS idx_conversation_sessions_user_id ON conversation_sessions(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE conversation_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (adjust as needed for your security requirements)
CREATE POLICY "Allow anonymous access to conversation_sessions" ON conversation_sessions
  FOR ALL USING (true);

CREATE POLICY "Allow anonymous access to conversations" ON conversations
  FOR ALL USING (true);

-- Create a function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_conversation_sessions_updated_at 
  BEFORE UPDATE ON conversation_sessions 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Optional: Create a view for easy querying of conversation history
CREATE OR REPLACE VIEW conversation_history_view AS
SELECT 
  c.id,
  c.conversation_id,
  c.message,
  c.sender,
  c.metadata,
  c.created_at,
  cs.user_id,
  cs.created_at as session_created_at
FROM conversations c
JOIN conversation_sessions cs ON c.conversation_id = cs.id
ORDER BY c.created_at ASC;

-- Optional: Create a function to get conversation context for AI
CREATE OR REPLACE FUNCTION get_conversation_context(
  p_conversation_id TEXT,
  p_limit INTEGER DEFAULT 10
)
RETURNS TABLE (
  role TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    CASE 
      WHEN c.sender = 'user' THEN 'user'::TEXT
      ELSE 'assistant'::TEXT
    END as role,
    c.message as content,
    c.created_at
  FROM conversations c
  WHERE c.conversation_id = p_conversation_id
  ORDER BY c.created_at ASC
  LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;
