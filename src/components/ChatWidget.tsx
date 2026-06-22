import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

type Role = 'user' | 'assistant';
interface ChatMessage {
  role: Role;
  content: string;
}

const ENDPOINT = import.meta.env.VITE_CHAT_ENDPOINT || '/api/chat';
const STORAGE_KEY = 'sugan_chat_history';

const GREETING =
  "Hi! I'm the Sugan assistant. Ask me about our solid-wood pieces, what suits your space, or anything about shipping, returns, and care.";

const SUGGESTIONS = [
  'What wood are your products made from?',
  'Gift ideas under ₹1500',
  'Something for my kitchen',
  'Shipping & return policy?',
];

// Pages where the floating button would clutter the experience.
const HIDDEN_PREFIXES = ['/admin', '/checkout', '/login', '/signup'];

function loadHistory(): ChatMessage[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (m): m is ChatMessage =>
        m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string',
    );
  } catch {
    return [];
  }
}

/** Minimal, safe rich-text: markdown links, **bold**, bullets, line breaks. */
function renderInline(text: string, onNavigate: () => void): ReactNode[] {
  const nodes: ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1] !== undefined && match[2] !== undefined) {
      const label = match[1];
      const url = match[2];
      if (url.startsWith('/')) {
        nodes.push(
          <Link
            key={key++}
            to={url}
            onClick={onNavigate}
            className="text-sugan-gold underline underline-offset-2 hover:text-sugan-ink"
          >
            {label}
          </Link>,
        );
      } else {
        nodes.push(
          <a
            key={key++}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sugan-gold underline underline-offset-2 hover:text-sugan-ink"
          >
            {label}
          </a>,
        );
      }
    } else if (match[3] !== undefined) {
      nodes.push(
        <strong key={key++} className="font-semibold">
          {match[3]}
        </strong>,
      );
    }
    last = regex.lastIndex;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function RichText({ text, onNavigate }: { text: string; onNavigate: () => void }) {
  const lines = text.split('\n');
  return (
    <>
      {lines.map((line, i) => {
        const trimmed = line.trimStart();
        const isBullet = /^[-*]\s+/.test(trimmed);
        if (isBullet) {
          return (
            <span key={i} className="flex gap-2">
              <span className="text-sugan-gold mt-[2px]">•</span>
              <span>{renderInline(trimmed.replace(/^[-*]\s+/, ''), onNavigate)}</span>
            </span>
          );
        }
        if (trimmed === '') return <span key={i} className="block h-2" aria-hidden="true" />;
        return <span key={i} className="block">{renderInline(line, onNavigate)}</span>;
      })}
    </>
  );
}

export default function ChatWidget() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(loadHistory);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  // Persist conversation across navigation / reloads within the session.
  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
    } catch {
      /* storage full or unavailable — ignore */
    }
  }, [messages]);

  // Auto-scroll to the latest content.
  useEffect(() => {
    if (open && scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, open, streaming]);

  // Focus the input when opened; close on Escape.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 120);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      clearTimeout(t);
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || streaming) return;

    const history = [...messages, { role: 'user' as const, content: trimmed }];
    setMessages([...history, { role: 'assistant', content: '' }]);
    setInput('');
    setStreaming(true);

    const controller = new AbortController();
    abortRef.current = controller;

    const setAssistant = (content: string) =>
      setMessages((prev) => {
        const copy = [...prev];
        copy[copy.length - 1] = { role: 'assistant', content };
        return copy;
      });

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok || !res.body) {
        setAssistant(
          "Sorry, I couldn't reach the assistant. Please email contact@sugan.shop or call +91 6367677255.",
        );
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      let acc = '';

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        let idx: number;
        while ((idx = buffer.indexOf('\n\n')) >= 0) {
          const raw = buffer.slice(0, idx).trim();
          buffer = buffer.slice(idx + 2);
          if (!raw.startsWith('data:')) continue;
          const payload = raw.slice(5).trim();
          if (!payload) continue;
          let evt: { delta?: string; error?: string; done?: boolean };
          try {
            evt = JSON.parse(payload);
          } catch {
            continue;
          }
          if (evt.delta) {
            acc += evt.delta;
            setAssistant(acc);
          } else if (evt.error) {
            setAssistant(acc ? acc + '\n\n' + evt.error : evt.error);
          }
        }
      }

      if (!acc) {
        setAssistant(
          "Sorry, I didn't catch that. Please try rephrasing, or reach us at contact@sugan.shop.",
        );
      }
    } catch (err) {
      if ((err as Error)?.name !== 'AbortError') {
        setAssistant(
          "Sorry, something went wrong. Please email contact@sugan.shop or call +91 6367677255.",
        );
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendMessage(input);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void sendMessage(input);
    }
  }

  if (HIDDEN_PREFIXES.some((p) => location.pathname.startsWith(p))) return null;

  return (
    <>
      {/* Floating launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Chat with the Sugan assistant"
          className="fixed right-4 bottom-24 lg:right-6 lg:bottom-6 z-40 flex items-center justify-center w-14 h-14 rounded-full bg-sugan-ink text-sugan-bone shadow-lift transition-transform duration-300 ease-apple hover:bg-sugan-gold active:scale-95"
        >
          <MessageCircle className="w-6 h-6" strokeWidth={1.5} />
          <span
            aria-hidden="true"
            className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full bg-sugan-gold ring-2 ring-sugan-bone"
          />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          className="fixed inset-0 z-50 lg:inset-auto lg:right-6 lg:bottom-6 lg:w-[400px] lg:h-[640px] lg:max-h-[calc(100vh-3rem)] flex flex-col bg-sugan-bone lg:rounded-sm lg:shadow-lift lg:border lg:border-sugan-ink/10 animate-fade-in"
          role="dialog"
          aria-label="Sugan assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-sugan-ink/10 bg-sugan-ink text-sugan-bone lg:rounded-t-sm">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-sugan-gold" strokeWidth={1.5} />
              <div className="leading-tight">
                <p className="font-display text-lg">Sugan Assistant</p>
                <p className="text-[11px] uppercase tracking-[0.18em] text-sugan-bone/60">
                  Handcrafted help
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="p-1.5 -mr-1.5 text-sugan-bone/70 hover:text-sugan-bone transition-colors"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5 space-y-4">
            {/* Greeting + suggestions (shown until the user starts) */}
            {messages.length === 0 && (
              <div className="space-y-4">
                <div className="max-w-[85%] bg-white border border-sugan-ink/10 rounded-sm px-4 py-3 font-body text-body-sm text-sugan-ink-soft">
                  {GREETING}
                </div>
                <div className="flex flex-wrap gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => void sendMessage(s)}
                      className="text-left font-body text-body-sm text-sugan-ink border border-sugan-ink/20 rounded-pill px-3.5 py-1.5 transition-colors hover:border-sugan-ink hover:bg-sugan-ink hover:text-sugan-bone"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) => {
              const isUser = m.role === 'user';
              const isStreamingLast =
                streaming && i === messages.length - 1 && m.role === 'assistant';
              return (
                <div key={i} className={cn('flex', isUser ? 'justify-end' : 'justify-start')}>
                  <div
                    className={cn(
                      'max-w-[85%] rounded-sm px-4 py-3 font-body text-body-sm leading-relaxed',
                      isUser
                        ? 'bg-sugan-ink text-sugan-bone'
                        : 'bg-white border border-sugan-ink/10 text-sugan-ink',
                    )}
                  >
                    {m.content ? (
                      <RichText text={m.content} onNavigate={() => setOpen(false)} />
                    ) : isStreamingLast ? (
                      <span className="inline-flex gap-1 py-0.5" aria-label="Assistant is typing">
                        <span className="w-1.5 h-1.5 rounded-full bg-sugan-ink/40 animate-pulse" />
                        <span className="w-1.5 h-1.5 rounded-full bg-sugan-ink/40 animate-pulse [animation-delay:150ms]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-sugan-ink/40 animate-pulse [animation-delay:300ms]" />
                      </span>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Composer */}
          <form
            onSubmit={handleSubmit}
            className="border-t border-sugan-ink/10 p-3 bg-sugan-bone lg:rounded-b-sm"
          >
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about a product, sizing, shipping…"
                className="flex-1 resize-none max-h-28 bg-white border border-sugan-ink/15 rounded-sm px-3 py-2.5 font-body text-body-sm text-sugan-ink placeholder:text-sugan-ink/40 focus:outline-none focus:border-sugan-ink/40"
              />
              <button
                type="submit"
                disabled={!input.trim() || streaming}
                aria-label="Send message"
                className="flex items-center justify-center w-10 h-10 shrink-0 rounded-pill bg-sugan-ink text-sugan-bone transition-colors duration-300 hover:bg-sugan-gold disabled:opacity-40 disabled:hover:bg-sugan-ink"
              >
                <Send className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] uppercase tracking-[0.18em] text-sugan-ink/35">
              AI assistant · may occasionally be wrong
            </p>
          </form>
        </div>
      )}
    </>
  );
}
