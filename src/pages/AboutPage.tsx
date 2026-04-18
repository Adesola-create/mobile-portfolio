import { Link } from "react-router-dom";
import portrait from "@/assets/portrait.jpg";

const skills = [
  { label: "Design", items: ["Product design", "Interaction", "Motion", "Brand systems"] },
  { label: "Engineering", items: ["SwiftUI", "Kotlin", "Flutter"] },
  { label: "Tools", items: ["Figma", "VScode", "Android Studio", "Git"] },
];

const timeline = [
  { year: "2026", role: "Senior mobile app developer · Livepetal", note: "Business Solutions" },
  { year: "2024", role: "Independent designer & developer", note: "Education, finance" },
  
  
];

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="grid gap-16 md:grid-cols-12">
        <div className="fade-in md:col-span-5">
          <div className="overflow-hidden rounded-2xl bg-muted">
            <img
              src={portrait}
              alt="Portrait of Adesola Adeyemi"
              width={1024}
              height={1280}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </div>

        <div className="fade-in-up md:col-span-7">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">About</p>
          <h1 className="mt-4 font-display text-4xl leading-tight text-foreground md:text-5xl">
            I make mobile apps that feel quiet, considered and a little warmer than
            you&apos;d expect.
          </h1>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-muted-foreground">
            <p>
              For the last three years I&apos;ve worked at the intersection of design
              and engineering — inside teams at Livepetal Systems Limited in Nigeria.
            </p>
            <p>
              I focus on a handful of clients each year. The work is usually end to
              end: research, product design, prototyping, and shipping the real
              thing in SwiftUI, Kotlin or Flutter.
            </p>
            <p>
              Outside of client work, I design and style unisex outfits, exploring fabrics, colors, and form. This creative practice sharpens my sense of aesthetics and directly influences my approach to UI/UX design, where I focus on clarity, balance, and expressive user experiences.
            </p>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {skills.map((group) => (
              <div key={group.label}>
                <h3 className="text-sm font-medium text-foreground">{group.label}</h3>
                <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <h3 className="font-display text-2xl text-foreground">Path</h3>
            <ul className="mt-6 divide-y divide-border">
              {timeline.map((entry) => (
                <li key={entry.year + entry.role} className="grid grid-cols-[80px_1fr] gap-6 py-4 text-sm">
                  <span className="text-muted-foreground">{entry.year}</span>
                  <div>
                    <p className="text-foreground">{entry.role}</p>
                    {entry.note && <p className="mt-0.5 text-muted-foreground">{entry.note}</p>}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-12">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm text-primary-foreground transition-colors duration-300 hover:bg-accent"
            >
              Work together
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
