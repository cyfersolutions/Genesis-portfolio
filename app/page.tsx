import Nav from "@/components/Nav";
import FlightHero from "@/components/FlightHero";
import RevealOnScroll from "@/components/RevealOnScroll";
import EnquiryForm from "@/components/EnquiryForm";
import {
  AVIATION,
  BUSINESS,
  CONSULTING_CHIPS,
  CONTACT_EMAIL,
  DIVISIONS,
  INSTAGRAM_URL,
  WHATSAPP_URL,
  FOUNDER_HIGHLIGHTS,
  FOUNDER_STATS,
  ROLES,
  WHY,
} from "@/lib/data";

export default function Home() {
  return (
    <>
      <Nav />
      <FlightHero />

      <section id="divisions" className="sec pad" data-screen-label="02 Divisions">
        <div className="wrap">
          <div className="head rv">
            <span className="eyebrow kicker">What we do</span>
            <h2>One platform. <span>Six ways we help.</span></h2>
            <p>Aviation is our core and our strongest capability. From it, Genesis AS extends into strategic business, international trade, industrial investment and human capital.</p>
          </div>
          <div className="divgrid">
            {DIVISIONS.map((d) => (
              <a key={d.n} href={d.href} className={`div glass${d.lead ? " lead" : ""} rv`}>
                <span className="n">{d.n}</span>
                <h3>{d.title}</h3>
                <p>{d.text}</p>
                <span className="go">{d.go}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section id="aviation" className="sec pad" data-screen-label="03 Aviation Services">
        <div className="wrap">
          <div className="head rv">
            <span className="eyebrow kicker">01 · Aviation Services</span>
            <h2>Practical aviation expertise, <span>not theory.</span></h2>
            <p>Our aviation work is based on first-hand industry experience — ferry flights, maintenance visits and aircraft transactions with service centres and OEMs across the USA, Europe and the Gulf.</p>
          </div>
          <div className="avgrid">
            {AVIATION.map((s) => (
              <div key={s.ic} className="svc rv">
                <div className="ic">{s.ic}</div>
                <h3>{s.title}</h3>
                <ul>{s.items.map((t) => <li key={t}>{t}</li>)}</ul>
                {s.hubs && <div className="hubs">{s.hubs.map((h) => <span key={h}>{h}</span>)}</div>}
                {s.note && <div className="note">{s.note}</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="consulting" className="sec pad" data-screen-label="04 Aviation Consulting">
        <div className="wrap two">
          <div className="head rv" style={{ marginBottom: 0 }}>
            <span className="eyebrow kicker">02 · Aviation Consulting &amp; Advisory</span>
            <h2>Advice from the <span>flight deck to the boardroom.</span></h2>
            <p>Strategic counsel that bridges the technical and commercial sides of aviation — backed by experience, knowledge, relationships and practical execution.</p>
          </div>
          <div className="chiplist rv">
            {CONSULTING_CHIPS.map((c) => <span key={c}>{c}</span>)}
          </div>
        </div>
      </section>

      <section id="business" className="sec pad" data-screen-label="05 Business Divisions">
        <div className="wrap">
          <div className="head rv">
            <span className="eyebrow kicker">03 – 07 · Business divisions</span>
            <h2>Natural extensions of <span>the same network.</span></h2>
            <p>The relationships built across aviation open doors in business, trade, industry and talent.</p>
          </div>
          <div className="bizgrid">
            {BUSINESS.map((b) => (
              <div key={b.n} className="biz glass rv">
                <span className="n">{b.n}</span>
                <h3>{b.title}</h3>
                <ul>{b.items.map((t) => <li key={t}>{t}</li>)}</ul>
                {b.note && <p>{b.note}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="founder" className="sec pad" data-screen-label="06 Founder">
        <div className="glow"></div>
        <div className="wrap fgrid">
          <div className="portrait rv">
            <img src="/assets/about-section.jpg" alt="Colonel (R) Syed Haider Ali in the cockpit" />
            <div className="badge glass"><b>Colonel (R) Syed Haider Ali</b><small>Founder &amp; Chairman, Genesis AS</small></div>
          </div>
          <div className="rv">
            <div className="head" style={{ marginBottom: 24 }}>
              <span className="eyebrow kicker">About Genesis AS · Founder</span>
              <h2>Leadership earned <span style={{ color: "var(--sky-2)" }}>in the air.</span></h2>
              <p>A strategic aviation leader with more than 36 years of experience across military aviation, national institutions, commercial airlines and chairman-level advisory. Former Chief Pilot and PIA Captain, he played a direct role in executing the Air Arabia–Lakson Group joint venture that created Fly Jinnah. Genesis AS brings together the technical and commercial sides of aviation.</p>
            </div>
            <div className="fstats">
              {FOUNDER_STATS.map((s) => <div key={s.span}><b>{s.b}</b><span>{s.span}</span></div>)}
            </div>
            <ul className="hl">
              {FOUNDER_HIGHLIGHTS.map((h) => <li key={h}>{h}</li>)}
            </ul>
            <div style={{ marginTop: 28 }}><a className="btn ghost" href="#enquire">Request detailed CV</a></div>
          </div>
        </div>
      </section>

      <section id="roles" className="sec pad" data-screen-label="07 Affiliations">
        <div className="wrap">
          <div className="head rv">
            <span className="eyebrow kicker">Current Professional Roles &amp; Affiliations</span>
            <h2>An active <span>professional ecosystem.</span></h2>
            <p>Our perspective is shaped by active leadership and advisory roles across aviation, technology, engineering, industrial solutions and business development.</p>
          </div>
          <div className="rolegrid">
            {ROLES.map((r) => (
              <div key={r.org} className="role rv">
                <div className="logo">{r.logo}</div>
                <span className="org">{r.org}</span>
                <h3>{r.title}</h3>
                <p>{r.text}</p>
                <div className="acts">
                  {r.links.map((l) =>
                    "href" in l ? (
                      <a key={l.label} href={l.href} target="_blank" rel="noopener">{l.label}</a>
                    ) : (
                      <a key={l.label} href="#" aria-disabled="true">{l.label}</a>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>
          <p className="disclaim">These are the Founder&apos;s external professional roles. The organisations listed are not subsidiaries, divisions or owned companies of Genesis AS.</p>
        </div>
      </section>

      <section id="why" className="sec pad" data-screen-label="08 Why Genesis">
        <div className="wrap">
          <div className="head rv">
            <span className="eyebrow kicker">Why Genesis AS</span>
            <h2>We connect people, companies, <span>opportunities and solutions.</span></h2>
          </div>
          <div className="whygrid">
            {WHY.map((w) => (
              <div key={w.n} className="why glass rv"><b>{w.n}</b><h3>{w.title}</h3><p>{w.text}</p></div>
            ))}
          </div>
          <div className="formula glass rv">
            <span>Experience</span><i>+</i><span>Expertise</span><i>+</i><span>International Network</span><i>+</i><span>Business Connections</span><i>=</i><span style={{ color: "var(--sky)" }}>Practical Solutions &amp; Opportunities</span>
          </div>
        </div>
      </section>

      <section id="enquire" className="sec pad" data-screen-label="09 Enquire">
        <div className="orb" style={{ width: 440, height: 440, right: -140, top: -160, opacity: 0.5 }}></div>
        <div className="orb" style={{ width: 260, height: 260, left: -90, bottom: 80, opacity: 0.35 }}></div>
        <div className="wrap">
          <div className="head rv">
            <span className="eyebrow kicker">Make an enquiry</span>
            <h2>How can we help?</h2>
            <p>Tell us what you&apos;re interested in and we&apos;ll be in touch — in confidence.</p>
          </div>
          <div className="egrid">
            <EnquiryForm />
            <div className="contactCard glass rv">
              <a className="row" href="tel:+923335104077"><small>Telephone</small><strong>+92 333 5104077</strong></a>
              <a className="row" href={`mailto:${CONTACT_EMAIL}`}><small>Email</small><strong>{CONTACT_EMAIL}</strong></a>
              <a className="row" href={WHATSAPP_URL} target="_blank" rel="noopener"><small>WhatsApp</small><strong>Chat with us ↗</strong></a>
              <a className="row" href={INSTAGRAM_URL} target="_blank" rel="noopener"><small>Instagram</small><strong>@genesisair ↗</strong></a>
              <div className="row" style={{ display: "flex", flexDirection: "column", padding: "16px 18px", borderRadius: 18, background: "rgba(255,255,255,.65)", border: "1px solid rgba(255,255,255,.9)" }}>
                <small>Office</small><strong>Islamabad, Pakistan</strong>
              </div>
              <p>We source, facilitate, coordinate and connect clients with qualified operators, owners, MROs, investors, businesses and service providers.</p>
            </div>
          </div>
          <footer>
            <span>© 2026 Genesis AS · Aviation | Business Solutions | International Opportunities</span>
            <span className="social">
              <a href={WHATSAPP_URL} target="_blank" rel="noopener" aria-label="WhatsApp" title="WhatsApp">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9l-5.05.9" /><path d="M9 10a.5.5 0 0 0 1 0v-1a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1" /></svg>
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noopener" aria-label="Instagram" title="Instagram">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 8a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z" /><path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0-6 0" /><path d="M16.5 7.5v.01" /></svg>
              </a>
            </span>
          </footer>
        </div>
      </section>

      <RevealOnScroll />
    </>
  );
}
