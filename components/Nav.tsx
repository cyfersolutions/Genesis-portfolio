"use client";

import { useEffect, useState } from "react";

const LINKS = [
  { href: "#divisions", label: "Services" },
  { href: "#founder", label: "Founder" },
  { href: "#roles", label: "Affiliations" },
  { href: "#why", label: "Why Genesis" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav id="nav" className={`glass${open ? " open" : ""}`}>
      <a className="logo" href="#top" aria-label="Genesis AS — home" onClick={() => setOpen(false)}>
        <img src="/assets/logos/genesis.png" alt="Genesis AS" />
      </a>
      <div className="links" id="navLinks">
        {LINKS.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
        ))}
      </div>
      <a className="cta" href="#enquire" onClick={() => setOpen(false)}>Enquire</a>
      <button
        type="button"
        className="burger"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="navLinks"
        onClick={() => setOpen((o) => !o)}
      >
        <span></span><span></span><span></span>
      </button>
    </nav>
  );
}
