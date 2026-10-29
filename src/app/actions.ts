"use server";

// Form submissions are emailed to CONTACT_TO over SMTP (SMTP_USER / SMTP_PASS, Gmail by default).
// Without SMTP settings they are forwarded as JSON to FORMS_WEBHOOK_URL (Zapier, Make, Formspree,
// a CRM inbox, etc). With neither, development logs them to the terminal.

import nodemailer from "nodemailer";

export type FormState = {
  status: "idle" | "success" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
  values?: Record<string, string>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SUBJECTS: Record<string, (p: Record<string, string>) => string> = {
  contact: (p) => `Website enquiry from ${p.name.slice(0, 80)}`,
  "subscribe:newsletter": () => "New newsletter subscriber",
  "subscribe:podcast": () => "New podcast waitlist sign-up",
};

async function email(kind: string, payload: Record<string, string>) {
  const { SMTP_USER: user, SMTP_PASS: pass, CONTACT_TO: to } = process.env;
  if (!user || !pass || !to) return null;
  const transport = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT ?? 465),
    secure: (process.env.SMTP_PORT ?? "465") === "465",
    auth: { user, pass },
  });
  const lines = Object.entries(payload)
    .filter(([, v]) => v)
    .map(([k, v]) => `${k[0].toUpperCase()}${k.slice(1)}: ${v}`);
  try {
    await transport.sendMail({
      from: { name: "Website", address: user },
      to,
      // Reply goes straight to the visitor. Passed as an object so their input is never parsed as an address list.
      replyTo: payload.email ? { name: payload.name ?? "", address: payload.email } : undefined,
      subject: (SUBJECTS[kind] ?? (() => `Website form: ${kind}`))(payload),
      text: `${lines.join("\n\n")}\n\nSent ${new Date().toUTCString()}`,
    });
    return true;
  } catch (err) {
    console.error("[forms] email failed", err);
    return false;
  }
}

async function forward(kind: string, payload: Record<string, string>) {
  const emailed = await email(kind, payload);
  if (emailed !== null) return emailed;

  const url = process.env.FORMS_WEBHOOK_URL;
  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info(`[forms] ${kind}`, payload);
      return true;
    }
    return false;
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ kind, ...payload, submittedAt: new Date().toISOString() }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

// Sign-ups go to MailerLite when MAILERLITE_API_KEY is set, into the group for that list.
// Confirmation emails come from MailerLite ("Double opt-in for API and integrations" in its settings).
async function addSubscriber(list: string, email: string) {
  const key = process.env.MAILERLITE_API_KEY;
  if (!key) return null;
  const group =
    list === "podcast" ? process.env.MAILERLITE_GROUP_PODCAST : process.env.MAILERLITE_GROUP_NEWSLETTER;
  try {
    const res = await fetch("https://connect.mailerlite.com/api/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ email, groups: group ? [group] : [] }),
    });
    if (!res.ok) console.error("[forms] MailerLite", res.status, await res.text());
    return res.ok;
  } catch (err) {
    console.error("[forms] MailerLite failed", err);
    return false;
  }
}

const read = (data: FormData, key: string) => String(data.get(key) ?? "").trim();

export async function subscribe(_prev: FormState, data: FormData): Promise<FormState> {
  const email = read(data, "email");
  const list = read(data, "list") === "podcast" ? "podcast" : "newsletter";
  if (!EMAIL_RE.test(email)) {
    return {
      status: "error",
      fieldErrors: { email: "Enter a valid email address." },
      values: { email },
    };
  }
  const added = await addSubscriber(list, email);
  // With MailerLite connected, the inbox notification is a courtesy and cannot fail the sign-up.
  const ok = added === null ? await forward(`subscribe:${list}`, { email }) : added;
  if (added) await forward(`subscribe:${list}`, { email });
  return ok
    ? { status: "success" }
    : {
        status: "error",
        message: "Something went wrong on our side. Please try again in a moment.",
        values: { email },
      };
}

export async function sendMessage(_prev: FormState, data: FormData): Promise<FormState> {
  const values = {
    name: read(data, "name"),
    email: read(data, "email"),
    organisation: read(data, "organisation"),
    topic: read(data, "topic"),
    message: read(data, "message"),
  };
  const fieldErrors: Record<string, string> = {};
  if (!values.name) fieldErrors.name = "Please tell Nicholas your name.";
  if (!EMAIL_RE.test(values.email)) fieldErrors.email = "Enter a valid email address.";
  if (values.message.length < 10) fieldErrors.message = "A sentence or two of context helps.";
  if (Object.keys(fieldErrors).length) return { status: "error", fieldErrors, values };

  const ok = await forward("contact", values);
  return ok
    ? { status: "success" }
    : {
        status: "error",
        message: "The message could not be sent. Please email directly instead.",
        values,
      };
}
