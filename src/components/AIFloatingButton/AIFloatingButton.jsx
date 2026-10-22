import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Check,
  ChevronDown,
  MessageCircle,
  Minus,
  Plus,
  Send,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import "./AIFloatingButton.css";

const quickQuestions = [
  "Sports injury",
  "Pain management",
  "Book appointment",
];

const answers = {
  "sports injury":
    "Our sports physiotherapy service focuses on movement, strength, and a gradual return to activity. Tell me what you are experiencing, and I can help you explore the relevant service.",
  "pain management":
    "Pain can have different causes, so the right next step depends on your symptoms and history. Rehabics can help you explore pain management options. For severe, sudden, or worsening symptoms, seek appropriate medical care.",
  "book appointment":
    "You can continue to the appointment page to explore booking options. Please share your preferred day and whether you are looking for an in person or online consultation.",
  "injury rehabilitation":
    "Injury rehabilitation often combines guided movement, progressive strengthening, and a plan tailored to your goals. You can explore the Injury Rehabilitation service page for more information.",
  "strength and mobility":
    "Strength and mobility training can support everyday movement and physical confidence. Explore the Strength and Mobility service to learn more about the approach.",
  default:
    "Thanks for your message! I am a demo assistant, so I can guide you through Rehabics services but cannot assess symptoms or provide a diagnosis. Try one of the quick questions below.",
};

const getAnswer = (message) => {
  const text = message.toLowerCase();

  if (text.includes("sport") || text.includes("athlete")) return answers["sports injury"];
  if (text.includes("pain") || text.includes("ache")) return answers["pain management"];
  if (text.includes("book") || text.includes("appointment") || text.includes("consult")) {
    return answers["book appointment"];
  }
  if (text.includes("rehab") || text.includes("injury") || text.includes("recover")) {
    return answers["injury rehabilitation"];
  }
  if (text.includes("strength") || text.includes("mobility") || text.includes("movement")) {
    return answers["strength and mobility"];
  }

  return answers.default;
};

const initialMessages = [
  {
    id: 1,
    role: "assistant",
    text: "Hi there! 👋 Welcome to Rehabics. I can help you explore our physiotherapy services and find the right next step.",
    time: "Just now",
  },
];

export default function AIFloatingAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const reducedMotion = useReducedMotion();
  const listRef = useRef(null);
  const inputRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setShowWelcome(false);
      const focusTimer = window.setTimeout(() => inputRef.current?.focus(), 180);
      return () => window.clearTimeout(focusTimer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTo({
        top: listRef.current.scrollHeight,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    }
  }, [messages, isTyping, isOpen, reducedMotion]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const sendMessage = (value = input) => {
    const text = value.trim();
    if (!text || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      text,
      time: "Just now",
    };

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setIsTyping(true);

    timerRef.current = window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          text: getAnswer(text),
          time: "Just now",
        },
      ]);
      setIsTyping(false);
    }, reducedMotion ? 250 : 850);
  };

  const resetChat = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setMessages(initialMessages);
    setInput("");
    setIsTyping(false);
  };

  return (
    <div className="rehabics-ai">
      <AnimatePresence>
        {isOpen && (
          <motion.section
            className="rehabics-ai__panel"
            role="dialog"
            aria-label="Rehabics AI assistant"
            aria-modal="false"
            initial={reducedMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <header className="rehabics-ai__header">
              <div className="rehabics-ai__identity">
                <div className="rehabics-ai__avatar">
                  <Sparkles size={20} strokeWidth={2.1} />
                  <span className="rehabics-ai__avatar-dot" />
                </div>
                <div className="rehabics-ai__heading">
                  <div className="rehabics-ai__title-line">
                    <h2>Rehabics AI</h2>
                    <span className="rehabics-ai__beta">BETA</span>
                  </div>
                  <p><span className="rehabics-ai__online-dot" /> Here to help you move better</p>
                </div>
              </div>

              <div className="rehabics-ai__header-actions">
                <button
                  className="rehabics-ai__icon-button"
                  type="button"
                  onClick={resetChat}
                  aria-label="Start a new conversation"
                  title="New conversation"
                >
                  <Plus size={18} />
                </button>
                <button
                  className="rehabics-ai__icon-button"
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Minimize chat"
                  title="Minimize"
                >
                  <Minus size={18} />
                </button>
                <button
                  className="rehabics-ai__icon-button rehabics-ai__close"
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                  title="Close"
                >
                  <X size={18} />
                </button>
              </div>
            </header>

            <div className="rehabics-ai__trust-strip">
              <ShieldCheck size={14} />
              <span>Support for your movement journey</span>
            </div>

            <div className="rehabics-ai__messages" ref={listRef} aria-live="polite">
              <div className="rehabics-ai__day-label"><span /> TODAY <span /></div>

              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  className={`rehabics-ai__message-row rehabics-ai__message-row--${message.role}`}
                  initial={reducedMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {message.role === "assistant" && (
                    <div className="rehabics-ai__mini-avatar"><Sparkles size={13} /></div>
                  )}
                  <div className="rehabics-ai__message-content">
                    <div className="rehabics-ai__bubble">{message.text}</div>
                    <span className="rehabics-ai__time">
                      {message.role === "user" && <Check size={12} />} {message.time}
                    </span>
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="rehabics-ai__message-row rehabics-ai__message-row--assistant">
                  <div className="rehabics-ai__mini-avatar"><Sparkles size={13} /></div>
                  <div className="rehabics-ai__typing" aria-label="Assistant is typing">
                    <span /><span /><span />
                  </div>
                </div>
              )}

              {messages.length === 1 && (
                <div className="rehabics-ai__quick-section">
                  <p className="rehabics-ai__quick-title">WHAT CAN I HELP WITH?</p>
                  <div className="rehabics-ai__quick-list">
                    {quickQuestions.map((question) => (
                      <button
                        type="button"
                        className="rehabics-ai__quick-button"
                        key={question}
                        onClick={() => sendMessage(question)}
                        disabled={isTyping}
                      >
                        <span>{question}</span>
                        <ArrowUpRight size={15} />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <form
              className="rehabics-ai__composer"
              onSubmit={(event) => {
                event.preventDefault();
                sendMessage();
              }}
            >
              <label className="rehabics-ai__sr-only" htmlFor="rehabics-ai-input">
                Write your message
              </label>
              <input
                id="rehabics-ai-input"
                ref={inputRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask us anything..."
                maxLength={500}
                autoComplete="off"
              />
              <button
                type="submit"
                className="rehabics-ai__send"
                disabled={!input.trim() || isTyping}
                aria-label="Send message"
              >
                <Send size={17} />
              </button>
            </form>

            <footer className="rehabics-ai__footer">
              <span>Powered by <strong>Rehabics</strong></span>
              <span className="rehabics-ai__footer-dot">•</span>
              <span>Demo assistant</span>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && showWelcome && (
          <motion.div
            className="rehabics-ai__tooltip"
            initial={reducedMotion ? false : { opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 8 }}
            transition={{ duration: 0.2 }}
          >
            Need help finding the right care?
            <button
              type="button"
              onClick={() => setShowWelcome(false)}
              aria-label="Dismiss welcome message"
            >
              <X size={13} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        className={`rehabics-ai__launcher ${isOpen ? "rehabics-ai__launcher--open" : ""}`}
        onClick={() => setIsOpen((open) => !open)}
        whileHover={reducedMotion ? undefined : { scale: 1.045 }}
        whileTap={reducedMotion ? undefined : { scale: 0.96 }}
        aria-label={isOpen ? "Close Rehabics AI chat" : "Open Rehabics AI chat"}
        aria-expanded={isOpen}
      >
        <span className="rehabics-ai__launcher-glow" />
        <AnimatePresence mode="wait" initial={false}>
          {isOpen ? (
            <motion.span
              key="close"
              className="rehabics-ai__launcher-icon"
              initial={reducedMotion ? false : { rotate: -45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 45, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <ChevronDown size={25} />
            </motion.span>
          ) : (
            <motion.span
              key="chat"
              className="rehabics-ai__launcher-icon"
              initial={reducedMotion ? false : { rotate: 45, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -45, opacity: 0 }}
              transition={{ duration: 0.16 }}
            >
              <MessageCircle size={25} />
            </motion.span>
          )}
        </AnimatePresence>
        {!isOpen && <span className="rehabics-ai__launcher-spark"><Sparkles size={13} /></span>}
        <span className="rehabics-ai__sr-only">{isOpen ? "Close assistant" : "Chat with Rehabics AI"}</span>
      </motion.button>
    </div>
  );
}
