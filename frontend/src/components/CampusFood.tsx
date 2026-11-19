import Reveal from "./Reveal";
import { HeartDoodle, NoodleBowlDoodle, SparkleDoodle } from "./Doodles";
import "./CampusFood.css";

interface Card {
  img: string;
  alt: string;
  title: string;
  body: string;
}

const CARDS: Card[] = [
  {
    img: "/images/food-courts.jpg",
    alt: "A hearty plate of campus food court rice dish",
    title: "Campus Food Courts",
    body: "When everyone wants something different.",
  },
  {
    img: "/images/cafes.jpg",
    alt: "Barista pouring latte art into a coffee cup",
    title: "Campus Cafés",
    body: "A pause between lectures, one sip at a time.",
  },
  {
    img: "/images/quick-bites.jpg",
    alt: "A freshly packed sandwich for a quick bite",
    title: "Quick Bites",
    body: "Good ideas for the five-minute break.",
  },
  {
    img: "/images/beverages.jpg",
    alt: "Fresh oranges beside a glass of juice",
    title: "Snacks and Beverages",
    body: "Little pick-me-ups for long campus days.",
  },
];

export default function CampusFood() {
  return (
    <section className="notebook section" id="guide" aria-labelledby="notebook-title">
      <div className="container">
        <div className="notebook__head">
          <Reveal>
            <p className="eyebrow">A campus food notebook</p>
            <h2 className="section-title notebook__title" id="notebook-title">
              A little taste of campus life
              <span className="notebook__title-bowl" aria-hidden="true">
                <NoodleBowlDoodle />
              </span>
            </h2>
          </Reveal>

          <Reveal delay={120}>
            <p className="notebook__aside">
              Places and bites to explore around campus—ask at the counter for today&apos;s options.
            </p>
          </Reveal>
        </div>

        <div className="notebook__grid">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 110}>
              <article className="food-card">
                <div className="food-card__media">
                  <img src={card.img} alt={card.alt} loading="lazy" width={420} height={300} />
                </div>
                <div className="food-card__body">
                  <h3 className="food-card__title">{card.title}</h3>
                  <p className="food-card__text">{card.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={140}>
          <p className="notebook__fineprint">
            Images illustrate food categories; they do not identify or verify specific LPU outlets.
          </p>
        </Reveal>
      </div>

      {/* whitespace doodles */}
      <SparkleDoodle
        className="doodle notebook__spark"
        style={{ "--dur": "4.4s", "--tdelay": "0.3s" } as React.CSSProperties}
      />
      <HeartDoodle
        className="doodle notebook__heart pulse"
        style={{ "--dur": "5s", "--fdelay": "0.9s" } as React.CSSProperties}
      />
    </section>
  );
}
