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
              I'm a product designer and engineer with three years of experience building at the intersection of design and technology, with experience at companies including Livepetal Systems Limited in Nigeria.
               I work with a small number of clients at a time, embedding deeply in each project — owning the full journey from research and design through prototyping to shipping production-ready mobile apps in SwiftUI, Kotlin, and Flutter.
            </p>
            <p>
              Recent work includes TimeTrack Pro, a workforce management app that helps organizations monitor staff activity, track hours,
              and ensure accountability, and PAAM, a faith-based platform bringing devotionals, events, digital giving, and an AI-powered biblical assistant into one seamless experience.
            </p>
            <p>
              Outside client work, I design and style unisex outfits, experimenting with fabric, color, and form — a practice that sharpens my eye for balance and proportion and directly shapes my approach to UI/UX: clean, considered, and expressive.</p>
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
