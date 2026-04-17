import type { Project } from "@/data/projects";

type Props = {
  project: Project;
  priority?: boolean;
};

export function ProjectCard({ project, priority = false }: Props) {
  return (
    <article className="group">
      <div className="hover-lift overflow-hidden rounded-2xl bg-muted">
        <img
          src={project.image}
          alt={`${project.title} mobile app`}
          width={1280}
          height={1024}
          loading={priority ? "eager" : "lazy"}
          className="aspect-[5/4] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <div>
          <h3 className="font-display text-xl text-foreground">{project.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{project.category}</p>
        </div>
        <span className="text-sm text-muted-foreground">{project.year}</span>
      </div>
    </article>
  );
}
