import Reveal from "./Reveal";
import {
  CoffeeCupDoodle,
  HeartDoodle,
  LoopArrowDoodle,
  SmileyDoodle,
  SparkleDoodle,
  StarburstDoodle,
  UnderlineDoodle,
} from "./Doodles";
import "./Hero.css";

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="hero-input__arrow">
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

export default function Hero() {
  return (
    <section className="hero section" aria-labelledby="hero-title">
      <div className="container hero__inner">
        {/* ---------------- left column ---------------- */}
        <div className="hero__copy">
          <Reveal>
            <span className="hero-badge">
              <SparkleDoodle className="hero-badge__spark" />
              Your little campus food companion
            </span>
          </Reveal>

          <Reveal delay={90}>
            <h1 className="hero-title" id="hero-title">
              Feeling hungry? We&apos;ve
              <br />
              got you.{" "}
              <span className="hero-title__heart">
                <HeartDoodle filled className="hero-title__heart-svg pulse" />
              </span>
            </h1>
            <UnderlineDoodle className="hero-title__underline" />
          </Reveal>

          <Reveal delay={160}>
            <p className="hero-lead">
              College days get busy. Deciding what to eat shouldn&apos;t. Tell us what&apos;s on your
              mind, and let&apos;s figure out your next meal together.
            </p>
          </Reveal>

          <Reveal delay={230}>
            <form className="hero-input" onSubmit={(e) => e.preventDefault()} role="search">
              <label className="hero-input__label" htmlFor="hero-mood">
                Tell us what&apos;s on your mind
              </label>
              <div className="hero-input__row">
                <input
                  id="hero-mood"
                  className="hero-input__field"
                  type="text"
                  placeholder="Hey UniEats, I don't know what to eat today..."
                />
                <button type="submit" className="hero-input__btn" aria-label="Send your craving">
                  <ArrowUpRight />
                </button>
              </div>
            </form>
          </Reveal>

          <Reveal delay={300}>
            <p className="hero-note">
              Your cravings, your budget, your choices. No judgement!
            </p>
            <p className="hero-fineprint">
              A friendly, rule-based food guide with illustrative ideas.
            </p>
          </Reveal>
          {/* decorative doodle — sits in the whitespace right of the badge */}
          <span className="doodle hero-note-hand hand-note">pst... lunch is calling!</span>
        </div>

        {/* ---------------- right column ---------------- */}
        <div className="hero__visual">
          <Reveal delay={140}>
            <div className="hero-photo photo-float">
              <div className="hero-photo__ring">
                <img
                  src={`${import.meta.env.BASE_URL}images/hero-curry.jpg`}
                  alt="A comforting plate of curry with fresh naan bread"
                  loading="eager"
                  width={520}
                  height={520}
                />
              </div>
            </div>
          </Reveal>

          <CoffeeCupDoodle
            className="doodle doodle--charcoal hero-doodle-cup"
            style={{ "--dur": "5.2s", "--fdelay": "0.4s" } as React.CSSProperties}
          />

          <SmileyDoodle
            className="doodle doodle--charcoal hero-doodle-smile"
            style={{ "--dur": "5.8s", "--fdelay": "1.1s" } as React.CSSProperties}
          />

          <LoopArrowDoodle className="doodle hero-doodle-arrow" />

          <span className="doodle hero-mood-hand hand-note">
            made for your food mood <HeartDoodle className="hero-mood-hand__heart pulse" />
          </span>

          <StarburstDoodle
            className="doodle hero-doodle-burst"
            style={{ "--dur": "4.6s", "--fdelay": "0.8s" } as React.CSSProperties}
          />

          <SparkleDoodle
            className="doodle hero-doodle-spark"
            style={{ "--dur": "4.2s", "--fdelay": "1.6s" } as React.CSSProperties}
          />
        </div>
      </div>
    </section>
  );
}

