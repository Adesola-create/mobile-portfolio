-- ============================================================
-- PROJECTS TABLE
-- ============================================================
create table if not exists public.projects (
  slug        text primary key,
  title       text        not null,
  client      text        not null,
  category    text        not null,
  year        text        not null,
  summary     text        not null,
  image       text        not null,
  gallery     text[]      not null default '{}',
  tags        text[]      not null default '{}',
  role        text        not null,
  timeline    text        not null,
  platform    text        not null,
  overview    text        not null,
  challenge   text        not null,
  approach    text[]      not null default '{}',
  outcome     text        not null,
  metrics     jsonb       not null default '[]',
  created_at  timestamptz not null default now()
);

alter table public.projects enable row level security;

-- Anyone can read (public portfolio)
create policy "Public read projects"
  on public.projects for select
  using (true);

-- Only authenticated users can write
create policy "Auth insert projects"
  on public.projects for insert
  to authenticated
  with check (true);

create policy "Auth update projects"
  on public.projects for update
  to authenticated
  using (true);

create policy "Auth delete projects"
  on public.projects for delete
  to authenticated
  using (true);


-- ============================================================
-- MESSAGES TABLE
-- ============================================================
create table if not exists public.messages (
  id         bigint generated always as identity primary key,
  name       text        not null,
  email      text        not null,
  message    text        not null,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

-- Anyone can submit a message (contact form)
create policy "Public insert messages"
  on public.messages for insert
  with check (true);

-- Only authenticated users can read messages
create policy "Auth read messages"
  on public.messages for select
  to authenticated
  using (true);


-- ============================================================
-- STORAGE BUCKET & POLICIES
-- ============================================================

-- Create the projects bucket (public)
insert into storage.buckets (id, name, public)
values ('projects', 'projects', true)
on conflict (id) do nothing;

-- Anyone can read files (public portfolio images)
create policy "Storage public read"
  on storage.objects for select
  using (bucket_id = 'projects');

-- Authenticated users can upload/manage images
create policy "Storage auth upload"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'projects');

create policy "Storage auth update"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'projects');

create policy "Storage auth delete"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'projects');


-- ============================================================
-- SEED DATA
-- ============================================================
insert into public.projects
  (slug, title, client, category, year, summary, image, gallery, tags, role, timeline, platform, overview, challenge, approach, outcome, metrics)
values
  (
    'stillwater',
    'Stillwater',
    'Stillwater Health',
    'iOS · Wellness',
    '2024',
    'A meditation companion built around breath, silence and gentle haptics. Designed and shipped end-to-end in Swift.',
    'https://your-storage-url/project-1.jpg',
    array[]::text[],
    array['SwiftUI', 'HealthKit', 'Design'],
    'Lead designer & iOS engineer',
    '6 months · 2024',
    'iOS 17 · SwiftUI · HealthKit',
    'Stillwater Health wanted a meditation app that felt like a quiet room rather than another dashboard. We designed a single-screen experience built around breath, paced haptics and ambient soundscapes.',
    'Most meditation apps overwhelm new users with content libraries, streaks and notifications. The team wanted the opposite — something that asks for nothing and rewards stillness.',
    array[
      'Reduced the entire onboarding to three calm questions and a single breath cycle.',
      'Designed a custom haptic engine that maps to inhale, hold and exhale phases.',
      'Built session playback fully in SwiftUI with no third-party audio dependencies.',
      'Integrated HealthKit mindful minutes so sessions feel native to the OS.'
    ],
    'Launched on the App Store with a feature in the Health & Fitness category. Average session length is over twice the industry benchmark, with very low uninstall rates in the first 30 days.',
    '[{"label":"App Store rating","value":"4.9"},{"label":"Avg. session length","value":"11 min"},{"label":"D30 retention","value":"62%"}]'
  ),
  (
    'tempo',
    'Tempo',
    'Tempo Athletics',
    'iOS & Android · Fitness',
    '2024',
    'A workout tracker for runners with adaptive plans, beautiful charts and a soft, motivating tone of voice.',
    'https://your-storage-url/project-2.jpg',
    array[]::text[],
    array['React Native', 'Charts', 'UX'],
    'Product designer & RN engineer',
    '9 months · 2023 — 2024',
    'iOS & Android · React Native · Reanimated',
    'Tempo helps everyday runners follow adaptive training plans without the pressure of competitive apps. Plans flex around real life — sleep, weather, soreness — while keeping the long-term arc visible.',
    'The first prototype borrowed too much from elite training tools. Users felt judged by missed workouts and abandoned the app within a week.',
    array[
      'Reframed the home screen around ''today only'', hiding long plan views by default.',
      'Designed a soft, encouraging tone system used across copy, charts and notifications.',
      'Built fluid charts in Reanimated 3 that respond to scrubbing with sub-frame precision.',
      'Shipped a single React Native codebase serving both iOS and Android with platform-aware components.'
    ],
    'Tempo grew from closed beta to 80k monthly active runners in under a year, with the strongest retention curve the team had ever measured.',
    '[{"label":"Monthly active users","value":"80k"},{"label":"Plans completed","value":"240k"},{"label":"Crash-free sessions","value":"99.8%"}]'
  ),
  (
    'mise',
    'Mise',
    'Mise Kitchen',
    'iOS · Food',
    '2023',
    'A recipe app that turns weeknight cooking into a calm ritual. Offline-first with smart shopping lists.',
    'https://your-storage-url/project-3.jpg',
    array[]::text[],
    array['SwiftUI', 'Core Data', 'Branding'],
    'Designer, brand & iOS engineer',
    '5 months · 2023',
    'iOS · SwiftUI · Core Data',
    'Mise is a recipe and meal planning app for people who cook most nights of the week. It treats cooking as a ritual rather than a chore — with generous typography, slow transitions and a hands-free cooking mode.',
    'Existing recipe apps were either bloated content portals or rigid meal planners. Mise needed to feel personal, beautiful and quietly useful in a steamy kitchen.',
    array[
      'Crafted a warm editorial brand system with a custom serif and food-led photography.',
      'Designed a hands-free cooking mode triggered by proximity, with large step cards.',
      'Built smart shopping lists that group ingredients by aisle using on-device classification.',
      'Made the entire app offline-first using Core Data with iCloud sync.'
    ],
    'Featured by Apple as App of the Day in 14 countries. The Mise brand system is now used across the company''s web, packaging and email.',
    '[{"label":"App Store rating","value":"4.8"},{"label":"Recipes saved","value":"1.2M"},{"label":"Featured countries","value":"14"}]'
  ),
  (
    'ledger',
    'Ledger',
    'North Bank',
    'iOS & Android · Finance',
    '2023',
    'A consumer banking app rebuilt from scratch — focused on clarity, accessibility and trust.',
    'https://your-storage-url/project-4.jpg',
    array[]::text[],
    array['Kotlin', 'Swift', 'Accessibility'],
    'Design lead & mobile engineer',
    '12 months · 2022 — 2023',
    'iOS (Swift) · Android (Kotlin)',
    'North Bank''s legacy app had grown organically over a decade. Ledger is a ground-up rebuild focused on clarity, trust and accessibility — designed natively for each platform but unified by a shared design system.',
    'Migrate 1.4 million customers to a new app without losing the muscle memory built around the old one, while raising accessibility from WCAG A to AAA.',
    array[
      'Co-designed a token-based design system shared by Swift and Kotlin teams.',
      'Ran an eight-week accessibility program with blind and low-vision users.',
      'Designed a calm transactions feed where balances and recent activity feel inseparable.',
      'Built a staged migration that let customers preview the new app before switching.'
    ],
    'Migrated 96% of active customers in the first quarter post-launch, with the highest CSAT score in the bank''s history and full WCAG 2.2 AAA compliance.',
    '[{"label":"Customers migrated","value":"96%"},{"label":"WCAG conformance","value":"AAA"},{"label":"Support tickets","value":"−38%"}]'
  )
on conflict (slug) do nothing;
