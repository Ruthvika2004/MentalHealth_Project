// Simple local server to mint AssemblyAI realtime tokens (avoids CORS in browser)
// Usage: set AAI_API_KEY (or VITE_ASSEMBLYAI_API_KEY) in your env, then: node server.js

const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5174;

app.use(cors());
app.use(express.json());

app.get('/api/assemblyai-token', async (req, res) => {
  const apiKey = process.env.AAI_API_KEY || process.env.VITE_ASSEMBLYAI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'Missing AAI_API_KEY environment variable' });
  }
  try {
    const r = await fetch('https://api.assemblyai.com/v2/realtime/token', {
      method: 'POST',
      headers: {
        Authorization: apiKey,
        'Content-Type': 'application/json',
      },
    });
    if (!r.ok) {
      const t = await r.text();
      return res.status(r.status).send(t);
    }
    const j = await r.json();
    return res.json(j);
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Token request failed' });
  }
});

app.listen(PORT, () => {
  console.log(`AssemblyAI token server running on http://localhost:${PORT}`);
});



