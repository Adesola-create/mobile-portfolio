import { useState } from "react";

function ContactForm() {
  const [status] = useState<"idle">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as { name: string; email: string; message: string };
    const subject = encodeURIComponent(`Enquiry from ${data.name}`);
    const body = encodeURIComponent(`${data.message}`);
    window.location.href = `mailto:aminatadeyemi42@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-14 space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground" htmlFor="name">Name</label>
          <input id="name" name="name" required className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none" placeholder="Your name" />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none" placeholder="you@example.com" />
        </div>
      </div>
      <div>
        <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground" htmlFor="message">Message</label>
        <textarea id="message" name="message" required rows={5} className="mt-2 w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none resize-none" placeholder="Tell me about your project…" />
      </div>
      <button type="submit" className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm text-primary-foreground transition-colors hover:bg-accent">
        Send message
      </button>
    </form>
  );
}

export default function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <div className="fade-in-up">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Contact</p>
        <h1 className="mt-4 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
          Let&apos;s build something
          <br />
          <em className="text-accent not-italic">good</em> together.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
          I take on a small number of projects each quarter — usually new mobile
          products, redesigns, or short engineering sprints. Send a note with a
          little about your team and what you&apos;re making.
        </p>

        <ContactForm />

        <div className="mt-14 space-y-8">
          <a href="mailto:aminatadeyemi42@gmail.com" className="group block border-b border-border pb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</p>
            <p className="mt-2 font-display text-2xl text-foreground transition-colors duration-300 group-hover:text-accent md:text-3xl">
              aminatadeyemi42@gmail.com
            </p>
          </a>
          <a href="tel:07085807350" className="group block border-b border-border pb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Phone</p>
            <p className="mt-2 font-display text-2xl text-foreground transition-colors duration-300 group-hover:text-accent md:text-3xl">
              Book a 30-minute intro call →
            </p>
          </a>
          <div className="border-b border-border pb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Elsewhere</p>
            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-base text-muted-foreground">
              <a href="https://dribbble.com" className="transition-colors hover:text-foreground">Dribbble</a>
              <a href="https://github.com" className="transition-colors hover:text-foreground">GitHub</a>
              <a href="https://linkedin.com" className="transition-colors hover:text-foreground">LinkedIn</a>
              <a href="https://read.cv" className="transition-colors hover:text-foreground">Read.cv</a>
            </div>
          </div>
        </div>

        <p className="mt-16 text-sm text-muted-foreground">
          Currently based in Nigeria · Working with teams worldwide
        </p>
      </div>
    </section>
  );
}
