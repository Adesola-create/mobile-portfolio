import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getProject, projects } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project;
    if (!project) {
      return { meta: [{ title: "Project not found — Maya Chen" }] };
    }
    const title = `${project.title} — ${project.client} · Maya Chen`;
    return {
      meta: [
        { title },
        { name: "description", content: project.summary },
        { property: "og:title", content: title },
        { property: "og:description", content: project.summary },
        { property: "og:image", content: project.image },
        { name: "twitter:image", content: project.image },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
  errorComponent: ({ error }) => (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-sm text-muted-foreground">Something went wrong.</p>
      <p className="mt-2 text-foreground">{error.message}</p>
      <Link to="/" className="mt-6 inline-block text-accent hover:underline">
        ← Back to work
      </Link>
    </div>
  ),
});

function ProjectNotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-32 text-center">
      <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
        404
      </p>
      <h1 className="mt-4 font-display text-4xl text-foreground">
        That project doesn&apos;t exist
      </h1>
      <Link
        to="/"
        className="mt-8 inline-flex items-center text-accent hover:underline"
      >
        ← Back to selected work
      </Link>
    </div>
  );
}

function ProjectPage() {
  const { project } = Route.useLoaderData() as { project: import("@/data/projects").Project };
  const currentIndex = projects.findIndex((p) => p.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <>
      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28">
        <div className="fade-in-up">
          <Link
            to="/"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← Selected work
          </Link>
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                {project.client}
              </p>
              <h1 className="mt-3 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">
                {project.title}
              </h1>
            </div>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {project.summary}
          </p>
        </div>
      </section>

      {/* Hero image */}
      <section className="mx-auto max-w-6xl px-6">
        <div className="overflow-hidden rounded-3xl bg-muted">
          <img
            src={project.image}
            alt={`${project.title} app screens`}
            width={1280}
            height={1024}
            className="aspect-[5/4] w-full object-cover md:aspect-[16/10]"
          />
        </div>
      </section>

      {/* Meta grid */}
      <section className="mx-auto max-w-6xl px-6 pt-16">
        <dl className="grid gap-8 border-t border-border/60 pt-10 md:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Role
            </dt>
            <dd className="mt-3 text-foreground">{project.role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Timeline
            </dt>
            <dd className="mt-3 text-foreground">{project.timeline}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Platform
            </dt>
            <dd className="mt-3 text-foreground">{project.platform}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Stack
            </dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      {/* Narrative */}
      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="space-y-16">
          <div>
            <h2 className="font-display text-2xl text-foreground md:text-3xl">
              Overview
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {project.overview}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-foreground md:text-3xl">
              The challenge
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {project.challenge}
            </p>
          </div>

          <div>
            <h2 className="font-display text-2xl text-foreground md:text-3xl">
              Approach
            </h2>
            <ul className="mt-6 space-y-4">
              {project.approach.map((item, i) => (
                <li key={i} className="flex gap-4 text-lg leading-relaxed text-muted-foreground">
                  <span className="mt-3 inline-block h-px w-6 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-display text-2xl text-foreground md:text-3xl">
              Outcome
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              {project.outcome}
            </p>
            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-border/60 pt-10 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    {metric.label}
                  </dt>
                  <dd className="mt-3 font-display text-3xl text-foreground">
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Next project */}
      <section className="mx-auto max-w-6xl px-6 pb-32">
        <div className="border-t border-border/60 pt-12">
          <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
            Next project
          </p>
          <Link
            to="/work/$slug"
            params={{ slug: nextProject.slug }}
            className="group mt-6 flex flex-wrap items-end justify-between gap-6"
          >
            <div>
              <h3 className="font-display text-4xl text-foreground transition-colors group-hover:text-accent md:text-5xl">
                {nextProject.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {nextProject.category}
              </p>
            </div>
            <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
              View case study →
            </span>
          </Link>
        </div>
      </section>
    </>
  );
}
