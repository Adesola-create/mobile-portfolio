import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { fetchProject } from "@/data/projects";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/data/projects";

export default function AdminEditProject() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetchProject(slug).then((p) => {
      if (!p) navigate("/admin", { replace: true });
      else setProject(p);
    });
  }, [slug, navigate]);

  async function handleSubmit(data: Omit<Project, "image"> & { image: string }) {
    const { error } = await supabase.from("projects").upsert([data], { onConflict: "slug" });
    if (error) throw new Error(error.message);
    navigate("/admin");
  }

  if (!project) return null;

  return (
    <div className="space-y-8">
      <div>
        <Link to="/admin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← All projects
        </Link>
        <h1 className="mt-4 font-display text-4xl text-foreground">Edit — {project.title}</h1>
      </div>
      <ProjectForm initial={{ ...project, image: project.image as string }} onSubmit={handleSubmit} submitLabel="Update project" />
    </div>
  );
}
