import { useNavigate, Link } from "react-router-dom";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/data/projects";

export default function AdminNewProject() {
  const navigate = useNavigate();

  async function handleSubmit(data: Omit<Project, "image"> & { image: string }) {
    const { error } = await supabase.from("projects").insert([data]);
    if (error) throw new Error(error.message);
    navigate("/admin");
  }

  return (
    <div className="space-y-8">
      <div>
        <Link to="/admin" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
          ← All projects
        </Link>
        <h1 className="mt-4 font-display text-4xl text-foreground">New project</h1>
      </div>
      <ProjectForm onSubmit={handleSubmit} submitLabel="Create project" />
    </div>
  );
}
