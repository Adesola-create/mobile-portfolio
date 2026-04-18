import * as React from "react";
import { supabase } from "@/lib/supabase";
import type { Project } from "@/data/projects";

type ProjectFormData = Omit<Project, "image"> & { image: string };

interface ProjectFormProps {
  initial?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  submitLabel?: string;
}

const EMPTY: ProjectFormData = {
  slug: "",
  title: "",
  client: "",
  category: "",
  year: "",
  summary: "",
  image: "",
  gallery: [],
  tags: [],
  role: "",
  timeline: "",
  platform: "",
  overview: "",
  challenge: "",
  approach: [],
  outcome: "",
  metrics: [],
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.18em] text-muted-foreground">{label}</label>
      <div className="mt-2">{children}</div>
    </div>
  );
}

const inputCls =
  "w-full border-b border-border bg-transparent py-3 text-foreground placeholder:text-muted-foreground/50 focus:border-accent focus:outline-none";

async function uploadImage(file: File): Promise<string> {
  const ext = file.name.split(".").pop();
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from("projects").upload(path, file, { upsert: true });
  if (error) throw new Error(error.message);
  const { data } = supabase.storage.from("projects").getPublicUrl(path);
  return data.publicUrl;
}

export function ProjectForm({ initial, onSubmit, submitLabel = "Save project" }: ProjectFormProps) {
  const [form, setForm] = React.useState<ProjectFormData>({ ...EMPTY, ...initial });
  const [status, setStatus] = React.useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = React.useState("");

  function set<K extends keyof ProjectFormData>(key: K, value: ProjectFormData[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  // helpers for array fields
  function setStringArray(key: "tags" | "approach", raw: string) {
    set(key, raw.split("\n").map((s) => s.trim()).filter(Boolean));
  }

  function setMetrics(raw: string) {
    const metrics = raw
      .split("\n")
      .map((line) => {
        const [label, value] = line.split("|").map((s) => s.trim());
        return label && value ? { label, value } : null;
      })
      .filter(Boolean) as Project["metrics"];
    set("metrics", metrics);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.image) { setStatus("error"); setErrorMsg("Please upload a cover image."); return; }
    setStatus("loading");
    setErrorMsg("");
    try {
      await onSubmit(form);
      setStatus("success");
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Title">
          <input className={inputCls} value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="Stillwater" required />
        </Field>
        <Field label="Slug">
          <input className={inputCls} value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="stillwater" required />
        </Field>
        <Field label="Client">
          <input className={inputCls} value={form.client} onChange={(e) => set("client", e.target.value)} placeholder="Stillwater Health" required />
        </Field>
        <Field label="Category">
          <input className={inputCls} value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="iOS · Wellness" required />
        </Field>
        <Field label="Year">
          <input className={inputCls} value={form.year} onChange={(e) => set("year", e.target.value)} placeholder="2024" required />
        </Field>
        <Field label="Role">
          <input className={inputCls} value={form.role} onChange={(e) => set("role", e.target.value)} placeholder="Lead designer & iOS engineer" required />
        </Field>
        <Field label="Timeline">
          <input className={inputCls} value={form.timeline} onChange={(e) => set("timeline", e.target.value)} placeholder="6 months · 2024" required />
        </Field>
        <Field label="Platform">
          <input className={inputCls} value={form.platform} onChange={(e) => set("platform", e.target.value)} placeholder="iOS 17 · SwiftUI · HealthKit" required />
        </Field>
      </div>

      <Field label="Cover image">
        <div className="space-y-3">
          {form.image && (
            <img src={form.image} alt="Cover preview" className="h-32 w-full rounded-xl object-cover" />
          )}
          <input
            type="file"
            accept="image/*"
            className="text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-xs file:text-primary-foreground hover:file:bg-accent"
            onChange={async (e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              try {
                const url = await uploadImage(file);
                set("image", url);
              } catch (err) {
                alert(err instanceof Error ? err.message : "Upload failed");
              }
            }}
          />
        </div>
      </Field>

      <Field label="Gallery images">
        <div className="space-y-3">
          {form.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {form.gallery.map((src, i) => (
                <div key={i} className="group relative">
                  <img src={src} alt={`Gallery ${i + 1}`} className="aspect-[4/3] w-full rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={() => set("gallery", form.gallery.filter((_, j) => j !== i))}
                    className="absolute right-1 top-1 hidden rounded-full bg-black/60 px-1.5 py-0.5 text-xs text-white group-hover:block"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            multiple
            className="text-sm text-muted-foreground file:mr-4 file:rounded-full file:border-0 file:bg-foreground file:px-4 file:py-2 file:text-xs file:text-primary-foreground hover:file:bg-accent"
            onChange={async (e) => {
              const files = Array.from(e.target.files ?? []);
              if (!files.length) return;
              try {
                const urls = await Promise.all(files.map(uploadImage));
                set("gallery", [...form.gallery, ...urls]);
                e.target.value = "";
              } catch (err) {
                alert(err instanceof Error ? err.message : "Upload failed");
              }
            }}
          />
        </div>
      </Field>

      <Field label="Summary">
        <textarea className={`${inputCls} resize-none`} rows={2} value={form.summary} onChange={(e) => set("summary", e.target.value)} placeholder="One-line summary…" required />
      </Field>

      <Field label="Tags (one per line)">
        <textarea
          className={`${inputCls} resize-none`}
          rows={3}
          value={form.tags.join("\n")}
          onChange={(e) => setStringArray("tags", e.target.value)}
          placeholder={"SwiftUI\nHealthKit\nDesign"}
        />
      </Field>

      <Field label="Overview">
        <textarea className={`${inputCls} resize-none`} rows={4} value={form.overview} onChange={(e) => set("overview", e.target.value)} placeholder="Project overview…" required />
      </Field>

      <Field label="Challenge">
        <textarea className={`${inputCls} resize-none`} rows={4} value={form.challenge} onChange={(e) => set("challenge", e.target.value)} placeholder="The challenge…" required />
      </Field>

      <Field label="Approach (one item per line)">
        <textarea
          className={`${inputCls} resize-none`}
          rows={5}
          value={form.approach.join("\n")}
          onChange={(e) => setStringArray("approach", e.target.value)}
          placeholder={"Step one\nStep two\nStep three"}
          required
        />
      </Field>

      <Field label="Outcome">
        <textarea className={`${inputCls} resize-none`} rows={4} value={form.outcome} onChange={(e) => set("outcome", e.target.value)} placeholder="The outcome…" required />
      </Field>

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex items-center rounded-full bg-foreground px-6 py-3 text-sm text-primary-foreground transition-colors hover:bg-accent disabled:opacity-50"
        >
          {status === "loading" ? "Saving…" : submitLabel}
        </button>
        {status === "success" && <p className="text-sm text-green-600">Saved ✓</p>}
        {status === "error" && <p className="text-sm text-red-500">{errorMsg}</p>}
      </div>
    </form>
  );
}
