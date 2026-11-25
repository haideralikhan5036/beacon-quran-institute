// Beacon chat assistant — CLIENT-SIDE ONLY. Keyword matching against the
// knowledge base in src/data/faqData.ts: no backend, no AI/LLM API, no
// running cost. The bot answers ONLY from the knowledge base, word for
// word; anything unmatched gets an honest "I don't know" + the WhatsApp
// fallback. Nothing is invented here.
//
// Owner-approved floating buttons (2026-11-25): two small floating
// buttons, stacked bottom-right on every page — chatbot on top, WhatsApp
// below — plus a periodic pop-up bubble above the chatbot button. This is
// the ONLY floating UI on the site; the no-floating-widgets rule still
// stands for everything else (e.g. testimonial popups).
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { MessageCircle, Send, X } from 'lucide-react';
import {
  COMMON_QUESTION_IDS,
  FALLBACK_TEXT,
  KB_ENTRIES,
  findAnswer,
  type KbEntry,
} from '../data/faqData';

const WHATSAPP_URL = 'https://wa.me/923461573771';
const WHATSAPP_NUMBER = '+92 346 1573771';

interface ChatMessage {
  from: 'bot' | 'user';
  text: string;
  links?: { label: string; href: string }[];
  fallback?: boolean;
}

const WELCOME_MESSAGE: ChatMessage = {
  from: 'bot',
  text: 'Hello! I\u2019m Beacon\u2019s assistant. Ask me anything about our Quran classes \u2014 the free trial, fees, teachers, make-up classes, holidays, certificates and more \u2014 or tap a question below to start.',
};

/* ── Chat thread + chips + input (shared by the overlay and the /faq page) ── */

export function ChatPanel({
  onNavigate,
  autoFocusInput = false,
}: {
  /** Called when a link inside a bot answer is clicked (closes the overlay). */
  onNavigate?: () => void;
  autoFocusInput?: boolean;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) window.clearTimeout(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const el = threadRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, typing]);

  useEffect(() => {
    // Focus the input on open — desktop only: on a phone it would pop
    // the keyboard over the panel.
    if (autoFocusInput && window.innerWidth >= 1280) inputRef.current?.focus();
  }, [autoFocusInput]);

  const ask = (text: string) => {
    const question = text.trim();
    if (!question || typing) return;
    setMessages((prev) => [...prev, { from: 'user', text: question }]);
    setInput('');
    setTyping(true);
    const entry: KbEntry | null = findAnswer(question);
    timerRef.current = window.setTimeout(() => {
      setTyping(false);
      if (entry) {
        setMessages((prev) => [...prev, { from: 'bot', text: entry.a, links: entry.links }]);
      } else {
        setMessages((prev) => [...prev, { from: 'bot', text: FALLBACK_TEXT, fallback: true }]);
      }
    }, 350);
  };

  const chips = COMMON_QUESTION_IDS.map((id) => KB_ENTRIES.find((e) => e.id === id)!).filter(Boolean);

  return (
    <div className="flex flex-col min-h-0 flex-1">
      {/* Message thread */}
      <div
        ref={threadRef}
        data-testid="chat-thread"
        className="flex-1 min-h-[280px] max-h-[420px] overflow-y-auto px-5 py-5 space-y-4"
      >
        {messages.map((m, i) => (
          <div key={i} data-testid="chat-message" data-from={m.from} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] px-4 py-3 rounded-2xl text-[15px] leading-relaxed ${
                m.from === 'user'
                  ? 'bg-[#004050] text-white rounded-tr-sm'
                  : 'bg-[#F2F6F9] text-[#0B2E3A] rounded-tl-sm border border-[#D7E3EE]'
              }`}
            >
              <p>{m.text}</p>
              {m.links && m.links.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {m.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      {...(l.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      onClick={onNavigate}
                      className="inline-flex items-center gap-1 text-[13px] font-bold text-[#004050] bg-white border border-[#C9D9E8] hover:border-[#7A7A50] px-3 py-1.5 rounded-full transition-colors"
                    >
                      {l.label} &rarr;
                    </a>
                  ))}
                </div>
              )}
              {m.fallback && (
                <div className="mt-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[13px] font-bold text-white bg-[#7A7A50] hover:bg-[#686844] px-4 py-2 rounded-full transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span dir="ltr">WhatsApp: {WHATSAPP_NUMBER}</span>
                  </a>
                </div>
              )}
            </div>
          </div>
        ))}
        {typing && (
          <div className="flex justify-start">
            <div className="bg-[#F2F6F9] border border-[#D7E3EE] px-4 py-3 rounded-2xl rounded-tl-sm flex items-center gap-1.5" aria-label="Beacon is typing">
              <span className="w-2 h-2 rounded-full bg-[#004050] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-[#004050] animate-pulse" />
              <span className="w-2 h-2 rounded-full bg-[#004050] animate-pulse" />
            </div>
          </div>
        )}
      </div>

      {/* Common-question chips */}
      <div className="px-5 pb-3 flex gap-2 overflow-x-auto" data-testid="chat-chips">
        {chips.map((entry) => (
          <button
            key={entry.id}
            type="button"
            data-testid="chat-chip"
            data-question={entry.id}
            onClick={() => ask(entry.q)}
            className="shrink-0 text-[13px] font-semibold text-[#004050] bg-white border border-[#C9D9E8] hover:border-[#7A7A50] hover:bg-[#F2F6F9] px-3.5 py-2 rounded-full transition-colors cursor-pointer whitespace-nowrap"
          >
            {entry.q}
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        className="px-5 pb-5 pt-1 flex items-center gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <label htmlFor="chat-input" className="sr-only">
          Type your question
        </label>
        <input
          ref={inputRef}
          id="chat-input"
          data-testid="chat-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question…"
          autoComplete="off"
          className="flex-1 min-w-0 h-12 px-4 rounded-full border border-[#C9D9E8] bg-white text-[15px] text-[#0B2E3A] placeholder:text-[#7A9BB0] focus:outline-none focus:border-[#004050] focus:ring-2 focus:ring-[#004050]/15"
        />
        <button
          type="submit"
          data-testid="chat-send"
          aria-label="Send message"
          className="w-12 h-12 shrink-0 flex items-center justify-center rounded-full bg-[#7A7A50] hover:bg-[#004050] text-white transition-colors cursor-pointer"
        >
          <Send className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
}

/* ── Overlay panel (opens from the floating button, header, menu, footer) ── */

export function ChatOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const reduceMotion = useReducedMotion();

  // ESC closes; body scroll locked while open (same pattern as the mobile menu).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
            onClick={onClose}
            data-testid="chat-overlay-backdrop"
            className="fixed inset-0 z-[120] bg-[#0B2E3A]/40 backdrop-blur-sm"
            aria-hidden="true"
          />
          <motion.div
            role="dialog"
            aria-label="Chat with Beacon's assistant"
            aria-modal="true"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
            data-testid="chat-panel"
            className="fixed z-[121] bottom-[132px] sm:bottom-[140px] right-4 sm:right-6 w-[calc(100vw-2rem)] max-w-[400px] h-[min(600px,calc(100dvh-11rem))] bg-white border border-[#C9D9E8] rounded-3xl shadow-[0_20px_60px_rgba(11,46,58,0.25)] flex flex-col overflow-hidden"
          >
            <div className="bg-[#004050] text-white px-5 py-4 flex items-start justify-between gap-3 shrink-0">
              <div>
                <p className="font-display text-xl font-bold leading-tight">Ask Beacon</p>
                <p className="text-[13px] text-white/80 mt-0.5">Answers from Beacon’s published pages</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close chat"
                data-testid="chat-panel-close"
                className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ChatPanel onNavigate={onClose} autoFocusInput />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── Floating buttons + periodic pop-up bubble ── */

const BUBBLE_FIRST_DELAY_MS = 10000;
const BUBBLE_REAPPEAR_DELAY_MS = 60000;

export function FloatingButtons({
  chatOpen,
  onOpenChat,
}: {
  chatOpen: boolean;
  onOpenChat: () => void;
}) {
  const reduceMotion = useReducedMotion();
  const [bubbleVisible, setBubbleVisible] = useState(false);
  const [bubbleStopped, setBubbleStopped] = useState(false);
  const dismissCount = useRef(0);
  const timer = useRef<number | null>(null);

  const clearTimer = () => {
    if (timer.current !== null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  };

  // First appearance ~10s after page load. Stops for good once the user
  // opens the chat or dismisses the bubble twice.
  useEffect(() => {
    if (chatOpen || bubbleStopped) {
      setBubbleVisible(false);
      clearTimer();
      return;
    }
    timer.current = window.setTimeout(() => setBubbleVisible(true), BUBBLE_FIRST_DELAY_MS);
    return clearTimer;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatOpen, bubbleStopped]);

  const dismissBubble = () => {
    setBubbleVisible(false);
    clearTimer();
    dismissCount.current += 1;
    if (dismissCount.current >= 2) {
      setBubbleStopped(true);
      return;
    }
    timer.current = window.setTimeout(() => setBubbleVisible(true), BUBBLE_REAPPEAR_DELAY_MS);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[90] flex flex-col items-end gap-3">
      {/* Periodic pop-up bubble, above the chatbot button. Tapping it
          opens the chat; the X dismisses it. */}
      <AnimatePresence>
        {bubbleVisible && !chatOpen && (
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.25 }}
            data-testid="chat-bubble"
            role="button"
            tabIndex={0}
            aria-label="Have a question? Ask me! Open the chat."
            onClick={onOpenChat}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onOpenChat();
              }
            }}
            className="relative w-[240px] bg-white border border-[#C9D9E8] rounded-2xl rounded-br-sm shadow-[0_12px_35px_rgba(11,46,58,0.20)] px-4 py-3 pr-9 cursor-pointer"
          >
            <p className="text-[14px] font-semibold text-[#004050] leading-snug">Have a question? Ask me!</p>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                dismissBubble();
              }}
              aria-label="Dismiss"
              data-testid="chat-bubble-dismiss"
              className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center rounded-full text-[#3D5563] hover:text-[#004050] hover:bg-[#F2F6F9] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chatbot button (top) — hidden while the panel is open. */}
      {!chatOpen && (
        <button
          type="button"
          onClick={onOpenChat}
          aria-label="Ask Beacon — open the chat"
          data-testid="floating-chat-button"
          className="flex items-center gap-2 h-12 px-4 rounded-full bg-[#004050] hover:bg-[#0B2E3A] text-white shadow-[0_10px_30px_rgba(11,46,58,0.30)] transition-colors cursor-pointer"
        >
          <MessageCircle className="w-5 h-5 shrink-0" />
          <span className="text-sm font-semibold">Ask</span>
        </button>
      )}

      {/* WhatsApp button (below) — always visible, goes straight to WhatsApp. */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat with Beacon Quran Institute on WhatsApp: ${WHATSAPP_NUMBER}`}
        data-testid="floating-whatsapp-button"
        className="flex items-center gap-2 h-12 px-4 rounded-full bg-[#7A7A50] hover:bg-[#686844] text-white shadow-[0_10px_30px_rgba(11,46,58,0.30)] transition-colors cursor-pointer"
      >
        <MessageCircle className="w-5 h-5 shrink-0" />
        <span className="text-sm font-semibold">WhatsApp</span>
      </a>
    </div>
  );
}
