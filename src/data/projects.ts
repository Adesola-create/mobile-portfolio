import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";
import project4 from "@/assets/project-4.jpg";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  image: string;
  tags: string[];
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
    tags: ["SwiftUI", "HealthKit", "Design"],
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
    tags: ["React Native", "Charts", "UX"],
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
    tags: ["SwiftUI", "Core Data", "Branding"],
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
    tags: ["Kotlin", "Swift", "Accessibility"],
  },
];
