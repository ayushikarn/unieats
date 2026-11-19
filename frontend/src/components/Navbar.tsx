import { useState } from "react";
import "./Navbar.css";

const LINKS = [
  { label: "Home", href: "#top" },
  { label: "Chat with UniEats", href: "#chat" },
  { label: "Campus Food Guide", href: "#guide" },
  { label: "About Us", href: "#about" },
];

function LogoMark() {
  return (
    <svg viewBox="0 0 36 36" aria-hidden="true" className="nav-logo__mark">
      <rect width="36" height="36" rx="10" fill="#D94343" />
      <path
        d="M9 19h18a9 9 0 0 1-9 8 9 9 0 0 1-9-8Z"
        fill="none"
        stroke="#fff"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M14.5 19c.8-2.6 2.4-4 4.4-3.6 1.7.4 2.5 2 2.2 3.6"
        fill="none"
        stroke="#fff"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13 12.5c0-1.6 1.4-1.9 1.4-3.5M18 12c0-1.6 1.4-1.9 1.4-3.5M23 12.5c0-1.6 1.4-1.9 1.4-3.5"
        fill="none"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ArrowUpRight() {
  return (
    <svg viewBox="0 0 14 14" aria-hidden="true" className="nav-cta__arrow">
      <path
        d="M3.5 10.5 10.5 3.5M5 3.5h5.5V9"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav" id="top">
      <div className="container nav__inner">
        <a href="#top" className="nav-logo" aria-label="UniEats home">
          <LogoMark />
          <span className="nav-logo__text">UniEats</span>
        </a>

        <nav className={`nav-links ${open ? "is-open" : ""}`} aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="nav-links__item"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#chat" className="nav-cta">
          Chat with UniEats
          <ArrowUpRight />
        </a>

        <button
          type="button"
          className={`nav-burger ${open ? "is-open" : ""}`}
          aria-label="Toggle navigation menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
