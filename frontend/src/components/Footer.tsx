import Reveal from "./Reveal";
import { HeartDoodle, SmileyDoodle } from "./Doodles";
import "./Footer.css";

const EXPLORE = [
  { label: "Home", href: "#top" },
  { label: "Chat with UniEats", href: "#chat" },
  { label: "Campus Food Guide", href: "#guide" },
  { label: "About Us", href: "#about" },
];

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social__icon">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="17" cy="7" r="1.2" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="footer-social__icon">
      <path
        d="M14.8 21v-7.3h2.5l.4-2.9h-2.9V8.9c0-.8.2-1.4 1.4-1.4h1.6V4.9c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H9.1v2.9h2.5V21"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="footer section">
      <div className="container">
        <Reveal>
          <div className="footer__grid">
            {/* brand */}
            <div className="footer__brand">
              <h2 className="footer__wordmark">UniEats</h2>
              <p className="footer__tagline">Good Food, Good Mood.</p>
              <p className="footer__blurb">
                A little food companionship for big campus days at LPU.
              </p>
            </div>

            {/* explore */}
            <nav className="footer__col" aria-label="Explore">
              <h3 className="footer__heading">Explore</h3>
              <ul className="footer__links">
                {EXPLORE.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="footer__link">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* socials */}
            <div className="footer__col">
              <h3 className="footer__heading">Find us soon</h3>
              <p className="footer__social-copy">
                Social pages are coming soon. For now, come say hello in the chat.
              </p>
              <div className="footer-social">
                <a
                  href="#top"
                  className="footer-social__btn"
                  aria-label="Instagram (coming soon)"
                  title="Coming soon"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#top"
                  className="footer-social__btn"
                  aria-label="Facebook (coming soon)"
                  title="Coming soon"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="footer__rule" />

        <Reveal delay={80}>
          <p className="footer__legal">
            © 2026 UniEats. Made with <HeartDoodle className="footer__legal-heart pulse" /> for
            campus cravings.
          </p>
        </Reveal>
      </div>

      {/* subtle doodle on the dark canvas */}
      <SmileyDoodle
        className="doodle footer__smile"
        style={{ "--dur": "5.6s", "--fdelay": "0.6s" } as React.CSSProperties}
      />
    </footer>
  );
}
