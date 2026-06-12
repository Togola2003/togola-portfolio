-- ============================================================
--  Portfolio Togola — Schéma de base de données Supabase
--  À exécuter UNE FOIS dans : Supabase → SQL Editor → New query → Run
-- ============================================================
--  Logique générale :
--   - Chaque ligne stocke ses textes traduits dans deux colonnes JSONB : fr / en
--   - Les champs identiques dans les 2 langues (dates, slugs, tags...) sont des colonnes normales
--   - "sort" sert à ordonner l'affichage (drag & drop possible plus tard)
--   - RLS activé : lecture publique, écriture réservée au service_role (côté admin sécurisé)
-- ============================================================

-- Nettoyage si on relance le script (sans risque, idempotent)
drop table if exists public.projects     cascade;
drop table if exists public.experiences  cascade;
drop table if exists public.education     cascade;
drop table if exists public.skill_groups  cascade;
drop table if exists public.singletons    cascade;

-- ------------------------------------------------------------
-- 1. SINGLETONS : blocs de texte uniques (hero, about, contact, footer, meta...)
--    key = identifiant du bloc ; data { fr:{...}, en:{...} }
-- ------------------------------------------------------------
create table public.singletons (
  key        text primary key,
  fr         jsonb not null default '{}'::jsonb,
  en         jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 2. PROJECTS
-- ------------------------------------------------------------
create table public.projects (
  id         uuid primary key default gen_random_uuid(),
  sort       int  not null default 0,
  slug       text not null,
  period     text,
  stack      text[] not null default '{}',
  tags       text[] not null default '{}',
  images     text[] not null default '{}',   -- chemins dans le bucket Storage "media"
  fr         jsonb  not null default '{}'::jsonb,  -- { title, tagline, bullets[] }
  en         jsonb  not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 3. EXPERIENCES
-- ------------------------------------------------------------
create table public.experiences (
  id         uuid primary key default gen_random_uuid(),
  sort       int  not null default 0,
  company    text,
  location   text,
  period     text,
  tags       text[] not null default '{}',
  fr         jsonb  not null default '{}'::jsonb,  -- { title, bullets[] }
  en         jsonb  not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 4. EDUCATION
-- ------------------------------------------------------------
create table public.education (
  id         uuid primary key default gen_random_uuid(),
  sort       int  not null default 0,
  place      text,
  period     text,
  fr         jsonb  not null default '{}'::jsonb,  -- { title }
  en         jsonb  not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- 5. SKILL GROUPS
-- ------------------------------------------------------------
create table public.skill_groups (
  id         uuid primary key default gen_random_uuid(),
  sort       int  not null default 0,
  fr         jsonb  not null default '{}'::jsonb,  -- { title, items[] }
  en         jsonb  not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

-- ============================================================
--  ROW LEVEL SECURITY
--  Lecture : tout le monde (le site public)
--  Écriture : personne via la clé publique → seulement le service_role (admin)
-- ============================================================
alter table public.singletons    enable row level security;
alter table public.projects      enable row level security;
alter table public.experiences   enable row level security;
alter table public.education      enable row level security;
alter table public.skill_groups  enable row level security;

-- Lecture publique sur toutes les tables de contenu
create policy "public read singletons"   on public.singletons   for select using (true);
create policy "public read projects"      on public.projects      for select using (true);
create policy "public read experiences"   on public.experiences   for select using (true);
create policy "public read education"     on public.education     for select using (true);
create policy "public read skill_groups"  on public.skill_groups  for select using (true);
-- (Aucune policy d'écriture : les writes passent par le service_role qui contourne RLS)

-- ============================================================
--  STORAGE : bucket public "media" (images projets, photo, CV PDF)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Lecture publique des fichiers du bucket media
create policy "public read media"
  on storage.objects for select
  using (bucket_id = 'media');
