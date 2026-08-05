-- ============================================================
--  Migration 04 — Limitation des tentatives de connexion admin
--  À exécuter dans : Supabase → SQL Editor → New query → Run
-- ============================================================

create table if not exists public.login_attempts (
  ip            text primary key,
  count         int not null default 0,
  first_try     timestamptz not null default now(),
  blocked_until timestamptz
);

alter table public.login_attempts enable row level security;
-- Aucune policy : seul le service_role (utilisé par rate-limit.ts) y accède.
