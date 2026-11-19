import { useEffect, useRef, useState } from "react";
import { NoodleMascot, SparkleDoodle } from "./Doodles";
import "./ChatbotCard.css";

type Sender = "user" | "bot";

interface Message {
  id: number;
  sender: Sender;
  text: string;
}

const SEED_MESSAGES: Message[] = [
  { id: 1, sender: "user", text: "I need something comforting after class 😊" },
  {
    id: 2,
    sender: "bot",
    text: "A warm plate of veg momos could be just the thing. Want to tell me your budget? ♡",
  },
];

function SendArrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="chat-send__arrow">
      <path
        d="M4 12 12 4M5.5 4H12v6.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Decorative chatbot preview — frontend only, no AI/API calls.
 * Messages animate in on scroll; the typing indicator plays between them.
 */
export default function ChatbotCard() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [started, setStarted] = useState(false);
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);

  /* start the choreography once the card scrolls into view */
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setVisibleCount(SEED_MESSAGES.length);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            setStarted(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  /* reveal messages one by one, with a typing pause before the bot reply */
  useEffect(() => {
    if (!started || visibleCount >= SEED_MESSAGES.length) return;

    const next = SEED_MESSAGES[visibleCount];
    const pauseMs = next.sender === "bot" ? 1500 : 750;

    setTyping(next.sender === "bot");
    const timer = window.setTimeout(() => {
      setTyping(false);
      setVisibleCount((c) => c + 1);
    }, pauseMs);

    return () => {
      window.clearTimeout(timer);
      setTyping(false);
    };
  }, [started, visibleCount]);

  return (
    <div
      className="chat-card"
      ref={rootRef}
      aria-label="Preview of a conversation with the UniEats buddy"
    >
      {/* ---------- identity ---------- */}
      <header className="chat-head">
        <span className="chat-head__avatar" aria-hidden="true">
          <NoodleMascot className="chat-head__mascot" />
        </span>
        <span className="chat-head__text">
          <span className="chat-head__name">
            UniEats buddy
            <SparkleDoodle className="chat-head__spark" />
          </span>
          <span className="chat-head__status">
            <i className="chat-head__dot" aria-hidden="true" />
            Here for your food mood ✦
          </span>
        </span>
      </header>

      <div className="chat-divider" />

      {/* ---------- messages ---------- */}
      <div className="chat-thread" role="list">
        {SEED_MESSAGES.slice(0, visibleCount).map((msg) => (
          <div
            key={msg.id}
            className={`chat-bubble chat-bubble--${msg.sender} chat-seq`}
            role="listitem"
          >
            {msg.text}
          </div>
        ))}

        {typing && (
          <div className="chat-bubble chat-bubble--bot chat-typing" aria-label="UniEats buddy is typing">
            <span className="chat-dot" />
            <span className="chat-dot" />
            <span className="chat-dot" />
          </div>
        )}
      </div>

      {/* ---------- composer ---------- */}
      <form className="chat-composer" onSubmit={(e) => e.preventDefault()}>
        <input
          className="chat-composer__input"
          type="text"
          placeholder="Tell me what you're craving..."
          aria-label="Tell UniEats what you're craving"
        />
        <button type="submit" className="chat-send" aria-label="Send message">
          <SendArrow />
        </button>
      </form>

      <p className="chat-fineprint">
        This is an illustrative, rule-based conversation. Check ingredients, prices and availability
        with campus counters.
      </p>
    </div>
  );
}
