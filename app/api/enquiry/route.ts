import nodemailer from "nodemailer";

const clip = (v: unknown, max: number) => String(v ?? "").trim().slice(0, max);
const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field, bots usually do.
  if (clip(body.website, 200)) return Response.json({ ok: true });

  const name = clip(body.name, 120);
  const company = clip(body.company, 120);
  const email = clip(body.email, 200);
  const phone = clip(body.phone, 60);
  const message = clip(body.message, 5000);
  const interests = Array.isArray(body.interests)
    ? body.interests.map((i) => clip(i, 80)).filter(Boolean).slice(0, 12)
    : [];

  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ ok: false, error: "Please enter your name and a valid email." }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Enquiry form: SMTP_HOST / SMTP_USER / SMTP_PASS are not configured.");
    return Response.json({ ok: false, error: "Email is not configured yet." }, { status: 500 });
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const picks = interests.join(", ") || "—";
  const text = `Interest: ${picks}\nName: ${name}\nCompany: ${company || "—"}\nEmail: ${email}\nPhone: ${phone || "—"}\n\n${message || "(no message)"}`;
  const html = `<p><b>Interest:</b> ${esc(picks)}</p><p><b>Name:</b> ${esc(name)}<br><b>Company:</b> ${esc(company || "—")}<br><b>Email:</b> ${esc(email)}<br><b>Phone:</b> ${esc(phone || "—")}</p><p>${esc(message || "(no message)")}</p>`;

  try {
    await transporter.sendMail({
      from: `"Genesis AS Website" <${SMTP_USER}>`,
      to: MAIL_TO || SMTP_USER,
      replyTo: `"${name.replace(/"/g, "")}" <${email}>`,
      subject: `Genesis AS enquiry — ${picks}`,
      text,
      html,
    });
    return Response.json({ ok: true });
  } catch (err) {
    console.error("Enquiry form: sending failed", err);
    return Response.json({ ok: false, error: "Could not send your enquiry. Please try again or email us directly." }, { status: 502 });
  }
}
