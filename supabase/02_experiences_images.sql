-- ============================================================
--  Migration 02 — Ajoute les images aux expériences
--  À exécuter dans : Supabase → SQL Editor → New query → Run
-- ============================================================

alter table public.experiences
  add column if not exists images text[] not null default '{}';
