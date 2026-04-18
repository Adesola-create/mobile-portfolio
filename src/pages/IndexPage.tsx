import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ProjectCard } from "@/components/ProjectCard";
import { fetchProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

export default function IndexPage() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="fade-in-up max-w-3xl">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
             Available for new work in 2026
          </p>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] text-foreground md:text-7xl">
            Mobile apps designed
            <br />
            with <em className="text-accent not-italic">care</em>, built to last.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground">
            I&apos;m Adesola — a product designer and engineer crafting iOS and Android
            apps for thoughtful teams. Three years, ten plus shipped products.
          </p>
          <div className="mt-10 flex items-center gap-6 text-sm">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-primary-foreground transition-colors duration-300 hover:bg-accent"
            >
              Start a project
            </Link>
            <Link
              to="/about"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              More about me →
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="mb-12 flex items-end justify-between">
          <h2 className="font-display text-3xl text-foreground md:text-4xl">Selected work</h2>
          <p className="text-sm text-muted-foreground">2023 — 2024</p>
        </div>
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} priority={i < 2} />
          ))}
        </div>
      </section>
    </>
  );
}
