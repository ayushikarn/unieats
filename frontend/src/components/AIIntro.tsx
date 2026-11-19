import Reveal from "./Reveal";
import ChatbotCard from "./ChatbotCard";
import { CurvedArrowDoodle, SparkleDoodle, StarDoodle } from "./Doodles";
import "./AIIntro.css";

export default function AIIntro() {
  return (
    <section className="ai section" id="chat" aria-labelledby="ai-title">
      <div className="container ai__inner">
        {/* ---------------- left copy ---------------- */}
        <div className="ai__copy">
          <Reveal>
            <p className="eyebrow">Say hello to your food buddy</p>
            <h2 className="section-title ai__title" id="ai-title">
              More than just a food suggestion.
            </h2>
          </Reveal>

          <Reveal delay={110}>
            <p className="ai__lead">
              UniEats is the friend who asks what you&apos;re feeling before suggesting what to eat.
              Tell us about a craving, a tight budget or a long day—we&apos;ll think it through with
              you.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <a href="#top" className="ai__cta">
              Have a chat with us
            </a>
          </Reveal>

          <Reveal delay={280}>
            <div className="ai__listening">
              <CurvedArrowDoodle className="ai__arrow" />
              <span className="hand-note ai__listening-note">we&apos;re listening!</span>
            </div>
          </Reveal>
        </div>

        {/* ---------------- right preview ---------------- */}
        <Reveal delay={160} className="ai__preview">
          <ChatbotCard />
        </Reveal>
      </div>

      {/* whitespace doodles */}
      <SparkleDoodle
        className="doodle ai__spark"
        style={{ "--dur": "4.8s", "--tdelay": "0.5s" } as React.CSSProperties}
      />
      <StarDoodle
        className="doodle ai__star"
        style={{ "--dur": "5.4s", "--fdelay": "1.3s" } as React.CSSProperties}
      />
    </section>
  );
}
