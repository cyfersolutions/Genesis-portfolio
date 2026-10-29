"use client";

import { FormEvent, Fragment, useState } from "react";
import { CONTACT_EMAIL, INTERESTS } from "@/lib/data";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export default function EnquiryForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const f = new FormData(form);
    setStatus({ kind: "sending" });
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          interests: f.getAll("interest"),
          name: f.get("name"),
          company: f.get("company"),
          email: f.get("email"),
          phone: f.get("phone"),
          message: f.get("message"),
          website: f.get("website"), // honeypot
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      form.reset();
      setStatus({ kind: "sent" });
    } catch (err) {
      setStatus({
        kind: "error",
        message: `${err instanceof Error ? err.message : "Something went wrong."} You can also email us at ${CONTACT_EMAIL}.`,
      });
    }
  }

  return (
    <form className="glass rv" id="form" onSubmit={onSubmit}>
      <div className="full">
        <label style={{ marginBottom: 8 }}>I&apos;m interested in</label>
        <div className="interest" id="interest">
          {INTERESTS.map((t, i) => (
            <Fragment key={t}>
              <input type="checkbox" id={`in${i}`} name="interest" value={t} />
              <label htmlFor={`in${i}`}>{t}</label>
            </Fragment>
          ))}
        </div>
      </div>
      <label>Full name<input name="name" required /></label>
      <label>Company<input name="company" /></label>
      <label>Email<input type="email" name="email" required /></label>
      <label>Phone<input name="phone" /></label>
      <label className="full">
        Message
        <textarea name="message" placeholder="Aircraft type, destination, timeline, requirements…"></textarea>
      </label>
      {/* honeypot — hidden from people, bots tend to fill it */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
      <div className="full">
        <button className="btn primary" type="submit" disabled={status.kind === "sending"} style={status.kind === "sending" ? { opacity: 0.7, cursor: "wait" } : undefined}>
          {status.kind === "sending" ? "Sending…" : "Send enquiry →"}
        </button>
        {status.kind === "sent" && (
          <p role="status" style={{ margin: "14px 0 0", fontSize: 14, fontWeight: 600, color: "var(--sky)" }}>
            Thank you — your enquiry has been sent. We&apos;ll be in touch shortly.
          </p>
        )}
        {status.kind === "error" && (
          <p role="alert" style={{ margin: "14px 0 0", fontSize: 14, fontWeight: 500, color: "#b42318" }}>
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
