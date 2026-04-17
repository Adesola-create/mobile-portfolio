import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Maya Chen" },
      {
        name: "description",
        content:
          "Get in touch with Maya Chen for mobile app design, development and consulting projects.",
      },
      { property: "og:title", content: "Contact — Maya Chen" },
      {
        property: "og:description",
        content: "Get in touch about mobile app design and development projects.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-24 md:py-32">
      <div className="fade-in-up">
        <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
          Contact
        </p>
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

        <div className="mt-14 space-y-8">
          <a
            href="mailto:hello@mayachen.design"
            className="group block border-b border-border pb-6"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Email
            </p>
            <p className="mt-2 font-display text-2xl text-foreground transition-colors duration-300 group-hover:text-accent md:text-3xl">
              hello@mayachen.design
            </p>
          </a>

          <a
            href="https://cal.com"
            className="group block border-b border-border pb-6"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Schedule
            </p>
            <p className="mt-2 font-display text-2xl text-foreground transition-colors duration-300 group-hover:text-accent md:text-3xl">
              Book a 30-minute intro call →
            </p>
          </a>

          <div className="border-b border-border pb-6">
            <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Elsewhere
            </p>
            <div className="mt-3 flex flex-wrap gap-x-8 gap-y-2 text-base text-muted-foreground">
              <a href="https://dribbble.com" className="transition-colors hover:text-foreground">
                Dribbble
              </a>
              <a href="https://github.com" className="transition-colors hover:text-foreground">
                GitHub
              </a>
              <a href="https://linkedin.com" className="transition-colors hover:text-foreground">
                LinkedIn
              </a>
              <a href="https://read.cv" className="transition-colors hover:text-foreground">
                Read.cv
              </a>
            </div>
          </div>
        </div>

        <p className="mt-16 text-sm text-muted-foreground">
          Currently based in Lisbon · Working with teams worldwide
        </p>
      </div>
    </section>
  );
}
