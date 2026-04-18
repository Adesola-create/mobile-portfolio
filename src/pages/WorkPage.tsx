import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { fetchProject, fetchProjects } from "@/data/projects";
import type { Project } from "@/data/projects";

function Lightbox({ images, index, onClose }: { images: string[]; index: number; onClose: () => void }) {
  const [current, setCurrent] = useState(index);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setCurrent((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setCurrent((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={onClose}
    >
      <button
        className="absolute top-5 right-6 text-white/70 hover:text-white text-3xl leading-none"
        onClick={onClose}
      >
        ×
      </button>

      {images.length > 1 && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl px-3"
            onClick={(e) => { e.stopPropagation(); setCurrent((i) => (i - 1 + images.length) % images.length); }}
          >
            ‹
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white text-4xl px-3"
            onClick={(e) => { e.stopPropagation(); setCurrent((i) => (i + 1) % images.length); }}
          >
            ›
          </button>
        </>
      )}

      <img
        src={images[current]}
        alt={`Gallery image ${current + 1}`}
        className="max-h-[90vh] max-w-[90vw] rounded-xl object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      {images.length > 1 && (
        <p className="absolute bottom-5 text-sm text-white/50">
          {current + 1} / {images.length}
        </p>
      )}
    </div>
  );
}

export default function WorkPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    if (!slug) return;
    Promise.all([fetchProject(slug), fetchProjects()]).then(([proj, all]) => {
      if (!proj) { navigate("/", { replace: true }); return; }
      setProject(proj);
      const idx = all.findIndex((p) => p.slug === slug);
      setNextProject(all[(idx + 1) % all.length]);
    });
  }, [slug, navigate]);

  if (!project) return null;

  const gallery = project.gallery ?? [];

  return (
    <>
      <section className="mx-auto max-w-6xl px-6 pt-20 pb-12 md:pt-28">
        <div className="fade-in-up">
          <Link to="/" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            ← Selected work
          </Link>
          <div className="mt-8 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">{project.client}</p>
              <h1 className="mt-3 font-display text-5xl leading-[1.05] text-foreground md:text-6xl">{project.title}</h1>
            </div>
            <span className="text-sm text-muted-foreground">{project.year}</span>
          </div>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
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

      <section className="mx-auto max-w-6xl px-6 pt-16">
        <dl className="grid gap-8 border-t border-border/60 pt-10 md:grid-cols-4">
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Role</dt>
            <dd className="mt-3 text-foreground">{project.role}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Timeline</dt>
            <dd className="mt-3 text-foreground">{project.timeline}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Platform</dt>
            <dd className="mt-3 text-foreground">{project.platform}</dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Stack</dt>
            <dd className="mt-3 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </dd>
          </div>
        </dl>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="space-y-16">
          <div>
            <h2 className="font-display text-2xl text-foreground md:text-3xl">Overview</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{project.overview}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground md:text-3xl">The challenge</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{project.challenge}</p>
          </div>
          <div>
            <h2 className="font-display text-2xl text-foreground md:text-3xl">Approach</h2>
            <ul className="mt-6 space-y-4">
              {project.approach.map((item, i) => (
                <li key={i} className="flex gap-4 text-lg leading-relaxed text-muted-foreground">
                  <span className="mt-3 inline-block h-px w-6 shrink-0 bg-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {gallery.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 pb-20">
          <h2 className="mb-8 font-display text-2xl text-foreground md:text-3xl">Gallery</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {gallery.map((src, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="group overflow-hidden rounded-2xl bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <img
                  src={src}
                  alt={`${project.title} screenshot ${i + 1}`}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                />
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-3xl px-6 pb-20">
        <div className="space-y-16">
          <div>
            <h2 className="font-display text-2xl text-foreground md:text-3xl">Outcome</h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{project.outcome}</p>
            <dl className="mt-10 grid grid-cols-1 gap-6 border-t border-border/60 pt-10 sm:grid-cols-3">
              {project.metrics.map((metric) => (
                <div key={metric.label}>
                  <dt className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{metric.label}</dt>
                  <dd className="mt-3 font-display text-3xl text-foreground">{metric.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {nextProject && (
        <section className="mx-auto max-w-6xl px-6 pb-32">
          <div className="border-t border-border/60 pt-12">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">Next project</p>
            <Link to={`/work/${nextProject.slug}`} className="group mt-6 flex flex-wrap items-end justify-between gap-6">
              <div>
                <h3 className="font-display text-4xl text-foreground transition-colors group-hover:text-accent md:text-5xl">
                  {nextProject.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{nextProject.category}</p>
              </div>
              <span className="text-sm text-muted-foreground transition-colors group-hover:text-foreground">
                View case study →
              </span>
            </Link>
          </div>
        </section>
      )}

      {lightboxIndex !== null && (
        <Lightbox
          images={gallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
