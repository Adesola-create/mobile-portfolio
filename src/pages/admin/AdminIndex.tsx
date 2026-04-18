import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchProjects } from "@/data/projects";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/data/projects";

export default function AdminIndex() {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjects().then(setProjects);
  }, []);

  async function handleDelete(slug: string) {
    if (!confirm(`Delete "${slug}"?`)) return;
    const { error } = await supabase.from("projects").delete().eq("slug", slug);
    if (!error) setProjects((p) => p.filter((x) => x.slug !== slug));
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/admin/login");
  }

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-4xl text-foreground">Projects</h1>
        <div className="flex items-center gap-4">
          <Link
            to="/admin/projects/new"
            className="inline-flex items-center rounded-full bg-foreground px-5 py-2.5 text-sm text-primary-foreground transition-colors hover:bg-accent"
          >
            + New project
          </Link>
          <button
            onClick={handleLogout}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Log out
          </button>
        </div>
      </div>

      {projects.length === 0 ? (
        <p className="text-muted-foreground">No projects yet.</p>
      ) : (
        <ul className="divide-y divide-border">
          {projects.map((p) => (
            <li key={p.slug} className="flex items-center justify-between py-5">
              <div>
                <p className="font-medium text-foreground">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.client} · {p.year}</p>
              </div>
              <div className="flex items-center gap-6 text-sm">
                <Link
                  to={`/admin/projects/${p.slug}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(p.slug)}
                  className="text-red-500 transition-colors hover:text-red-700"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
