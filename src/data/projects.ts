import { supabase } from "@/lib/supabase";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export type ProjectMetric = {
  label: string;
  value: string;
};

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  image: string;
  gallery: string[];
  tags: string[];
  role: string;
  timeline: string;
  platform: string;
  overview: string;
  challenge: string;
  approach: string[];
  outcome: string;
  metrics: ProjectMetric[];
};

export const projects: Project[] = [
  {
    slug: "stillwater",
    title: "Stillwater",
    client: "Stillwater Health",
    category: "iOS · Wellness",
    year: "2024",
    summary:
      "A meditation companion built around breath, silence and gentle haptics. Designed and shipped end-to-end in Swift.",
    image: project1,
    gallery: [],
    tags: ["SwiftUI", "HealthKit", "Design"],
    role: "Lead designer & iOS engineer",
    timeline: "6 months · 2024",
    platform: "iOS 17 · SwiftUI · HealthKit",
    overview:
      "Stillwater Health wanted a meditation app that felt like a quiet room rather than another dashboard. We designed a single-screen experience built around breath, paced haptics and ambient soundscapes.",
    challenge:
      "Most meditation apps overwhelm new users with content libraries, streaks and notifications. The team wanted the opposite — something that asks for nothing and rewards stillness.",
    approach: [
      "Reduced the entire onboarding to three calm questions and a single breath cycle.",
      "Designed a custom haptic engine that maps to inhale, hold and exhale phases.",
      "Built session playback fully in SwiftUI with no third-party audio dependencies.",
      "Integrated HealthKit mindful minutes so sessions feel native to the OS.",
    ],
    outcome:
      "Launched on the App Store with a feature in the Health & Fitness category. Average session length is over twice the industry benchmark, with very low uninstall rates in the first 30 days.",
    metrics: [
      { label: "App Store rating", value: "4.9" },
      { label: "Avg. session length", value: "11 min" },
      { label: "D30 retention", value: "62%" },
    ],
  },
  {
    slug: "tempo",
    title: "Tempo",
    client: "Tempo Athletics",
    category: "iOS & Android · Fitness",
    year: "2024",
    summary:
      "A workout tracker for runners with adaptive plans, beautiful charts and a soft, motivating tone of voice.",
    image: project2,
    gallery: [],
    tags: ["React Native", "Charts", "UX"],
    role: "Product designer & RN engineer",
    timeline: "9 months · 2023 — 2024",
    platform: "iOS & Android · React Native · Reanimated",
    overview:
      "Tempo helps everyday runners follow adaptive training plans without the pressure of competitive apps. Plans flex around real life — sleep, weather, soreness — while keeping the long-term arc visible.",
    challenge:
      "The first prototype borrowed too much from elite training tools. Users felt judged by missed workouts and abandoned the app within a week.",
    approach: [
      "Reframed the home screen around 'today only', hiding long plan views by default.",
      "Designed a soft, encouraging tone system used across copy, charts and notifications.",
      "Built fluid charts in Reanimated 3 that respond to scrubbing with sub-frame precision.",
      "Shipped a single React Native codebase serving both iOS and Android with platform-aware components.",
    ],
    outcome:
      "Tempo grew from closed beta to 80k monthly active runners in under a year, with the strongest retention curve the team had ever measured.",
    metrics: [
      { label: "Monthly active users", value: "80k" },
      { label: "Plans completed", value: "240k" },
      { label: "Crash-free sessions", value: "99.8%" },
    ],
  },
  {
    slug: "mise",
    title: "Mise",
    client: "Mise Kitchen",
    category: "iOS · Food",
    year: "2023",
    summary:
      "A recipe app that turns weeknight cooking into a calm ritual. Offline-first with smart shopping lists.",
    image: project3,
    gallery: [],
    tags: ["SwiftUI", "Core Data", "Branding"],
    role: "Designer, brand & iOS engineer",
    timeline: "5 months · 2023",
    platform: "iOS · SwiftUI · Core Data",
    overview:
      "Mise is a recipe and meal planning app for people who cook most nights of the week. It treats cooking as a ritual rather than a chore — with generous typography, slow transitions and a hands-free cooking mode.",
    challenge:
      "Existing recipe apps were either bloated content portals or rigid meal planners. Mise needed to feel personal, beautiful and quietly useful in a steamy kitchen.",
    approach: [
      "Crafted a warm editorial brand system with a custom serif and food-led photography.",
      "Designed a hands-free cooking mode triggered by proximity, with large step cards.",
      "Built smart shopping lists that group ingredients by aisle using on-device classification.",
      "Made the entire app offline-first using Core Data with iCloud sync.",
    ],
    outcome:
      "Featured by Apple as App of the Day in 14 countries. The Mise brand system is now used across the company's web, packaging and email.",
    metrics: [
      { label: "App Store rating", value: "4.8" },
      { label: "Recipes saved", value: "1.2M" },
      { label: "Featured countries", value: "14" },
    ],
  },
  {
    slug: "ledger",
    title: "Ledger",
    client: "North Bank",
    category: "iOS & Android · Finance",
    year: "2023",
    summary:
      "A consumer banking app rebuilt from scratch — focused on clarity, accessibility and trust.",
    image: project4,
    gallery: [],
    tags: ["Kotlin", "Swift", "Accessibility"],
    role: "Design lead & mobile engineer",
    timeline: "12 months · 2022 — 2023",
    platform: "iOS (Swift) · Android (Kotlin)",
    overview:
      "North Bank's legacy app had grown organically over a decade. Ledger is a ground-up rebuild focused on clarity, trust and accessibility — designed natively for each platform but unified by a shared design system.",
    challenge:
      "Migrate 1.4 million customers to a new app without losing the muscle memory built around the old one, while raising accessibility from WCAG A to AAA.",
    approach: [
      "Co-designed a token-based design system shared by Swift and Kotlin teams.",
      "Ran an eight-week accessibility program with blind and low-vision users.",
      "Designed a calm transactions feed where balances and recent activity feel inseparable.",
      "Built a staged migration that let customers preview the new app before switching.",
    ],
    outcome:
      "Migrated 96% of active customers in the first quarter post-launch, with the highest CSAT score in the bank's history and full WCAG 2.2 AAA compliance.",
    metrics: [
      { label: "Customers migrated", value: "96%" },
      { label: "WCAG conformance", value: "AAA" },
      { label: "Support tickets", value: "−38%" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export async function fetchProjects(): Promise<Project[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("year", { ascending: false });
  if (error || !data?.length) return projects;
  return data as Project[];
}

export async function fetchProject(slug: string): Promise<Project | undefined> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();
  if (error || !data) return getProject(slug);
  return data as Project;
}
