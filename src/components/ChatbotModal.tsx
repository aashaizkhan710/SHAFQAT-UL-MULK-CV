import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, User, Bot, Loader2, ArrowUpRight, RotateCcw } from 'lucide-react';
import { CV_DATA } from '../data/cvData';

interface ChatbotModalProps {
  darkMode: boolean;
  isOpen: boolean;
  onClose: () => void;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: number;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: 'msg-welcome-001',
  role: 'assistant',
  text: `Hello! I am the Executive AI Assistant for Professor Shafqat-ul-Mulk.

You can ask me any question about his 25+ years of distinguished experience, including his degrees from the University of Southampton and University of Peshawar, his 17.75 years teaching tri-services and international cadets at CAE NUST (PAF Academy), his institutional turnaround of Swabi Model College (BPS-20 Principal), or his current leadership managing the reform of 2,000 government schools under the Project Implementation Unit (PIU).`,
  timestamp: 1700000000000,
};

const SUGGESTED_PROMPTS = [
  'From where did he do his degree?',
  'What is his current job?',
  'What did he teach during 17.75 years at CAE NUST?',
  'What are his major achievements?',
  'What certifications does he hold?'
];

export const ChatbotModal: React.FC<ChatbotModalProps> = ({
  darkMode,
  isOpen,
  onClose,
}) => {
  // Initialize conversation safely from storage or fallback to single welcome message
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const raw = localStorage.getItem('shafqat_chat_messages_v2');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Strictly deduplicate by ID and consecutive identical text
          const deduplicated: ChatMessage[] = [];
          const seenIds = new Set<string>();
          for (const m of parsed) {
            if (m && m.role && m.text && !seenIds.has(m.id)) {
              const prev = deduplicated[deduplicated.length - 1];
              if (!prev || prev.text !== m.text || prev.role !== m.role) {
                seenIds.add(m.id);
                deduplicated.push({
                  id: String(m.id),
                  role: m.role,
                  text: String(m.text),
                  timestamp: Number(m.timestamp || Date.now())
                });
              }
            }
          }
          if (deduplicated.length > 0) {
            return deduplicated;
          }
        }
      }
    } catch {
      // Ignore storage read errors
    }
    return [WELCOME_MESSAGE];
  });

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const isLockedRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Sync deduplicated messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shafqat_chat_messages_v2', JSON.stringify(messages));
    } catch {
      // Ignore storage write errors
    }
  }, [messages]);

  // Clean up any legacy or corrupt storage keys from older versions
  useEffect(() => {
    try {
      const legacyKeys = ['chat_messages', 'chat_history', 'shafqat_chat_messages'];
      for (const k of legacyKeys) {
        localStorage.removeItem(k);
      }
    } catch {
      // Ignore
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages.length, isOpen, loading]);

  if (!isOpen) return null;

  const handleResetConversation = () => {
    if (loading) return;
    setMessages([WELCOME_MESSAGE]);
    try {
      localStorage.setItem('shafqat_chat_messages_v2', JSON.stringify([WELCOME_MESSAGE]));
    } catch {
      // Ignore
    }
  };

  const handleSendMessage = async (promptText?: string) => {
    // 1. Strict lock check: exactly one request at a time
    if (isLockedRef.current || loading) {
      return;
    }

    const textToSend = (typeof promptText === 'string' ? promptText : input).trim();
    if (!textToSend) {
      return;
    }

    isLockedRef.current = true;
    setLoading(true);
    setInput('');

    // 2. Generate unique ID for user message
    const userMessageId = `msg-usr-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const userMessage: ChatMessage = {
      id: userMessageId,
      role: 'user',
      text: textToSend,
      timestamp: Date.now()
    };

    // 3. Prepare clean conversation history (User -> Assistant -> User -> Assistant)
    // Filter out the welcome message from context payload
    const historyPayload = messages
      .filter(m => m.id !== 'msg-welcome-001')
      .map(m => ({
        role: m.role,
        text: m.text
      }));

    // 4. Update messages state with user message
    setMessages(prev => {
      if (prev.some(m => m.id === userMessageId)) {
        return prev;
      }
      return [...prev, userMessage];
    });

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: textToSend,
          history: historyPayload
        })
      });

      if (!res.ok) {
        throw new Error(`HTTP error ${res.status}`);
      }

      const data = await res.json();
      const replyText = typeof data?.reply === 'string' && data.reply.trim()
        ? data.reply.trim()
        : 'I don\'t have verified information about that in Professor Shafqat-ul-Mulk\'s professional profile.';

      // 5. Generate unique ID for assistant message
      const assistantMessageId = `msg-ast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const assistantMessage: ChatMessage = {
        id: assistantMessageId,
        role: 'assistant',
        text: replyText,
        timestamp: Date.now()
      };

      setMessages(prev => {
        // Prevent duplicate insertions
        if (prev.some(m => m.id === assistantMessageId)) {
          return prev;
        }
        const last = prev[prev.length - 1];
        if (last && last.role === 'assistant' && last.text === replyText) {
          return prev;
        }
        return [...prev, assistantMessage];
      });
    } catch {
      // 6. Handle failure with a single friendly error message (no loops or retries)
      const errorMsgId = `msg-err-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
      const errorMessage: ChatMessage = {
        id: errorMsgId,
        role: 'assistant',
        text: 'I was unable to complete the request at this moment. Please check your connection and feel free to ask again.',
        timestamp: Date.now()
      };

      setMessages(prev => {
        const last = prev[prev.length - 1];
        if (last && last.role === 'assistant' && last.text === errorMessage.text) {
          return prev;
        }
        return [...prev, errorMessage];
      });
    } finally {
      isLockedRef.current = false;
      setLoading(false);
    }
  };

  return (
    <div
      id="chat-widget"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] max-w-sm sm:max-w-md flex flex-col shadow-2xl rounded-2xl overflow-hidden border transition-all no-print"
      style={{ maxHeight: '82vh' }}
    >
      {/* Chat Header */}
      <div
        className={`px-4 py-3 border-b flex items-center justify-between ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-900 text-white border-slate-800'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-1.5">
              <span>Shafqat AI Assistant</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse" />
            </div>
            <div className="text-[11px] text-amber-400">Grounded with Verified CV Data</div>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Reset / Clear Chat Button */}
          <button
            onClick={handleResetConversation}
            disabled={loading}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors disabled:opacity-30"
            title="Reset Conversation"
            aria-label="Reset Conversation"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>

          {/* Close Chat Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close Chat"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div
        className={`flex-1 overflow-y-auto p-4 space-y-3.5 text-xs sm:text-sm ${
          darkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'
        }`}
        style={{ minHeight: '260px', maxHeight: '420px' }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5" />
              </div>
            )}

            <div
              className={`max-w-[82%] px-3.5 py-2.5 rounded-xl leading-relaxed whitespace-pre-line ${
                msg.role === 'user'
                  ? 'bg-amber-500 text-slate-950 font-medium rounded-br-none shadow-sm'
                  : darkMode
                  ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-bl-none'
                  : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}
            </div>

            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 flex items-center justify-center shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5" />
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-xs text-slate-400 pl-8">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-500" />
            <span>Consulting verified credentials...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Prompt Suggestions */}
      <div
        className={`p-2 border-t flex flex-wrap gap-1.5 overflow-x-auto ${
          darkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        {SUGGESTED_PROMPTS.map((prompt, i) => (
          <button
            key={i}
            type="button"
            disabled={loading}
            onClick={() => handleSendMessage(prompt)}
            className={`text-[11px] px-2.5 py-1 rounded-md border whitespace-nowrap transition-colors ${
              darkMode
                ? 'border-slate-700 bg-slate-800/60 text-slate-300 hover:text-amber-400 hover:border-amber-500/40 disabled:opacity-40'
                : 'border-slate-200 bg-slate-100 text-slate-700 hover:text-slate-950 hover:border-amber-400 disabled:opacity-40'
            }`}
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input Form with single onSubmit trigger */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className={`p-2.5 border-t flex items-center gap-2 ${
          darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          disabled={loading}
          placeholder={loading ? 'AI Assistant is answering...' : 'Ask anything about his career...'}
          className={`flex-1 px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-1 focus:ring-amber-500 disabled:opacity-60 ${
            darkMode
              ? 'bg-slate-950 border-slate-800 text-slate-100 placeholder-slate-500'
              : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
          }`}
        />
        <button
          type="submit"
          disabled={!input.trim() || loading}
          className="p-2 rounded-lg bg-amber-500 text-slate-950 hover:bg-amber-400 transition-colors disabled:opacity-40 disabled:pointer-events-none"
          aria-label="Send Message"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* WhatsApp Direct Footer inside chat */}
      <div className="bg-emerald-950/80 px-3 py-1.5 flex items-center justify-between text-[11px] text-emerald-300 border-t border-emerald-900/60">
        <span>Prefer direct dialogue?</span>
        <a
          href={CV_DATA.personal.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold underline flex items-center gap-0.5 hover:text-white"
        >
          <span>WhatsApp Him</span>
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
