import { onRequest } from 'firebase-functions/v2/https';
import { defineSecret } from 'firebase-functions/params';
import OpenAI from 'openai';
import { buildSystemPrompt } from './knowledge';

// ---------------------------------------------------------------------------
// Provider config
//
// Defaults target Groq's free, OpenAI-compatible API. To switch providers,
// change these three things (no other code change needed):
//   1. CHAT_BASE_URL  — e.g. https://openrouter.ai/api/v1, https://api.together.xyz/v1,
//                        http://localhost:11434/v1 (Ollama), etc.
//   2. CHAT_MODEL     — a model the provider serves.
//   3. the secret value (firebase functions:secrets:set GROQ_API_KEY).
//
// To move to Claude specifically, swap the `openai` client for `@anthropic-ai/sdk`
// (Anthropic is not OpenAI-compatible) — the system prompt and SSE shape here stay
// the same. Groq production models: llama-3.3-70b-versatile, llama-3.1-8b-instant,
// openai/gpt-oss-120b, openai/gpt-oss-20b.
// ---------------------------------------------------------------------------
const CHAT_API_KEY = defineSecret('GROQ_API_KEY');
const CHAT_BASE_URL = process.env.CHAT_BASE_URL || 'https://api.groq.com/openai/v1';
const CHAT_MODEL = process.env.CHAT_MODEL || 'llama-3.3-70b-versatile';

const MAX_MESSAGES = 16; // cap history sent upstream
const MAX_CHARS_PER_MESSAGE = 4000;
const MAX_OUTPUT_TOKENS = 700;

const SUPPORT_LINE =
  "I'm having trouble right now — please email contact@sugan.shop or call +91 6367677255 and we'll help you out.";

interface InboundMessage {
  role: 'user' | 'assistant';
  content: string;
}

function sanitizeMessages(raw: unknown): InboundMessage[] {
  if (!Array.isArray(raw)) return [];
  const cleaned: InboundMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== 'object') continue;
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if ((role !== 'user' && role !== 'assistant') || typeof content !== 'string') continue;
    const text = content.trim().slice(0, MAX_CHARS_PER_MESSAGE);
    if (!text) continue;
    cleaned.push({ role, content: text });
  }
  // Keep only the most recent slice, and ensure it starts with a user turn.
  let trimmed = cleaned.slice(-MAX_MESSAGES);
  while (trimmed.length && trimmed[0].role !== 'user') trimmed = trimmed.slice(1);
  return trimmed;
}

export const chat = onRequest(
  {
    region: 'us-central1',
    cors: true,
    secrets: [CHAT_API_KEY],
    timeoutSeconds: 120,
    memory: '256MiB',
    maxInstances: 10,
  },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const messages = sanitizeMessages(req.body?.messages);
    if (!messages.length) {
      res.status(400).json({ error: 'No messages provided' });
      return;
    }

    // Server-Sent Events. Each event is a JSON line: {delta} | {done:true} | {error}.
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('Connection', 'keep-alive');
    res.setHeader('X-Accel-Buffering', 'no');
    const send = (obj: Record<string, unknown>) => res.write(`data: ${JSON.stringify(obj)}\n\n`);

    try {
      const client = new OpenAI({
        apiKey: CHAT_API_KEY.value(),
        baseURL: CHAT_BASE_URL,
      });

      const stream = await client.chat.completions.create({
        model: CHAT_MODEL,
        temperature: 0.4,
        max_tokens: MAX_OUTPUT_TOKENS,
        stream: true,
        messages: [
          { role: 'system', content: buildSystemPrompt() },
          ...messages,
        ],
      });

      for await (const part of stream) {
        const delta = part.choices?.[0]?.delta?.content;
        if (delta) send({ delta });
      }
      send({ done: true });
    } catch (err) {
      console.error('chat: upstream error', err);
      // Headers already sent — surface a friendly message on the stream.
      send({ error: SUPPORT_LINE });
    } finally {
      res.end();
    }
  },
);
