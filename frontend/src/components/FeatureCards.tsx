import Reveal from "./Reveal";
import { HeartDoodle, SparkleDoodle } from "./Doodles";
import "./FeatureCards.css";

function MoodIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className="feature-card__icon">
      <circle cx="14" cy="14" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10 12v1.4M18 12v1.4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M9.8 17c1.7 2.2 3.5 3.3 4.2 3.3s2.5-1.1 4.2-3.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BudgetIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className="feature-card__icon">
      <rect
        x="4.5"
        y="4.5"
        width="19"
        height="19"
        rx="4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <path
        d="M14 9.5v9M9.5 14h9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 28 28" aria-hidden="true" className="feature-card__icon">
      <path
        d="M14 24.5s-8-7.4-8-13a8 8 0 1 1 16 0c0 5.6-8 13-8 13Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <circle cx="14" cy="11.3" r="3" fill="none" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

interface Feature {
  icon: () => React.JSX.Element;
  title: string;
  body: string;
  tone: "plain" | "peach" | "sage";
}

const FEATURES: Feature[] = [
  {
    icon: MoodIcon,
    title: "Understands your cravings.",
    body: "Start with your mood, your comfort food or the thing you can't stop thinking about.",
    tone: "plain",
  },
  {
    icon: BudgetIcon,
    title: "Respects your budget.",
    body: "Mention what you'd like to spend and explore ideas without the pressure.",
    tone: "peach",
  },
  {
    icon: PinIcon,
    title: "Knows your campus food scene.",
    body: "Made with LPU student life in mind, without pretending to know today's menus.",
    tone: "sage",
  },
];

export default function FeatureCards() {
  return (
    <section className="features section" id="about" aria-labelledby="features-title">
      <div className="container">
        <Reveal>
          <p className="eyebrow features__eyebrow">Why UniEats?</p>
          <h2 className="section-title features__title" id="features-title">
            A little more you in every bite.
          </h2>
        </Reveal>

        <div className="features__grid">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            return (
              <Reveal key={feature.title} delay={i * 120}>
                <article className={`feature-card feature-card--${feature.tone}`}>
                  <span className="feature-card__icon-wrap" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3 className="feature-card__title">{feature.title}</h3>
                  <p className="feature-card__body">{feature.body}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>

      {/* whitespace doodles */}
      <SparkleDoodle
        className="doodle features__spark"
        style={{ "--dur": "4.6s", "--tdelay": "0.4s" } as React.CSSProperties}
      />
      <HeartDoodle
        className="doodle features__heart pulse"
        style={{ "--dur": "5.2s", "--fdelay": "1s" } as React.CSSProperties}
      />
    </section>
  );
}
