"use client";

import { useActionState } from "react";
import { CheckCircle, CircleNotch } from "@phosphor-icons/react";
import { sendMessage, subscribe, type FormState } from "@/app/actions";
import { site } from "@/lib/site";

const initial: FormState = { status: "idle" };

const inputCls =
  "h-12 w-full rounded-full border border-line bg-bg px-5 text-[15px] text-ink placeholder:text-muted transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-red-400";

function FieldError({ id, msg }: { id: string; msg?: string }) {
  if (!msg) return null;
  return (
    <p id={id} className="text-[13px] text-red-400">
      {msg}
    </p>
  );
}

function Submit({ pending, children }: { pending: boolean; children: React.ReactNode }) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex h-12 shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-full bg-accent px-6 text-[15px] font-medium text-accent-ink transition-[transform,background-color,color] duration-300 hover:bg-ink hover:text-bg active:scale-[0.98] disabled:opacity-70"
    >
      {pending && <CircleNotch size={16} className="animate-spin motion-reduce:animate-none" />}
      {children}
    </button>
  );
}

function Success({ title, body }: { title: string; body: string }) {
  return (
    <div role="status" className="flex items-start gap-3 rounded-2xl bg-accent-soft p-5">
      <CheckCircle size={22} weight="fill" className="mt-0.5 shrink-0 text-highlight" />
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-[15px] text-muted">{body}</p>
      </div>
    </div>
  );
}

export function SubscribeForm({
  list = "newsletter",
  cta = "Subscribe",
  successTitle = "Almost there.",
}: {
  list?: "newsletter" | "podcast";
  cta?: string;
  successTitle?: string;
}) {
  const [state, action, pending] = useActionState(subscribe, initial);
  const id = `sub-${list}`;

  if (state.status === "success") {
    return <Success title={successTitle} body="Check your inbox and confirm your email to complete the sign-up." />;
  }

  const err = state.fieldErrors?.email;
  return (
    <form action={action} noValidate className="grid gap-2">
      <input type="hidden" name="list" value={list} />
      <label htmlFor={`${id}-email`} className="text-[14px] font-medium">
        Email address
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          id={`${id}-email`}
          name="email"
          type="email"
          autoComplete="email"
          required
          defaultValue={state.values?.email}
          aria-invalid={err ? true : undefined}
          aria-describedby={`${id}-help ${id}-err`}
          className={inputCls}
        />
        <Submit pending={pending}>{cta}</Submit>
      </div>
      <p id={`${id}-help`} className="text-[13px] text-muted">
        No spam. Unsubscribe in one click.
      </p>
      <FieldError id={`${id}-err`} msg={err ?? state.message} />
    </form>
  );
}

export function ContactForm() {
  const [state, action, pending] = useActionState(sendMessage, initial);
  const v = state.values ?? {};
  const e = state.fieldErrors ?? {};

  if (state.status === "success") {
    return (
      <Success
        title="Thank you. Your message is with Nicholas."
        body="Expect a reply within two working days."
      />
    );
  }

  const field = (name: string, label: string, props: React.InputHTMLAttributes<HTMLInputElement>) => (
    <div className="grid gap-2">
      <label htmlFor={`c-${name}`} className="text-[14px] font-medium">
        {label}
      </label>
      <input
        id={`c-${name}`}
        name={name}
        defaultValue={v[name]}
        aria-invalid={e[name] ? true : undefined}
        aria-describedby={`c-${name}-err`}
        className={inputCls}
        {...props}
      />
      <FieldError id={`c-${name}-err`} msg={e[name]} />
    </div>
  );

  return (
    <form action={action} noValidate className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        {field("name", "Name", { autoComplete: "name", required: true })}
        {field("email", "Email", { type: "email", autoComplete: "email", required: true })}
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {field("organisation", "Organisation (optional)", { autoComplete: "organization" })}
        <div className="grid gap-2">
          <label htmlFor="c-topic" className="text-[14px] font-medium">
            What is it about?
          </label>
          <select id="c-topic" name="topic" defaultValue={v.topic || "Advisory"} className={inputCls}>
            <option>Advisory</option>
            <option>Speaking</option>
            <option>Media or podcast</option>
            <option>Something else</option>
          </select>
        </div>
      </div>
      <div className="grid gap-2">
        <label htmlFor="c-message" className="text-[14px] font-medium">
          Message
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          defaultValue={v.message}
          aria-invalid={e.message ? true : undefined}
          aria-describedby="c-message-err"
          className="w-full rounded-2xl border border-line bg-bg px-5 py-4 text-[15px] text-ink transition-colors focus:border-accent focus:outline-none aria-[invalid=true]:border-red-400"
        />
        <FieldError id="c-message-err" msg={e.message} />
      </div>
      {state.message && (
        <p role="alert" className="text-[14px] text-red-400">
          {state.message}{" "}
          <a href={`mailto:${site.email}`} className="underline underline-offset-4">
            {site.email}
          </a>
        </p>
      )}
      <div>
        <Submit pending={pending}>Send message</Submit>
      </div>
    </form>
  );
}
