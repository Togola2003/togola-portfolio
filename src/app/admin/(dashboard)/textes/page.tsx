import { createAdminClient } from "@/lib/supabase/admin";
import { saveHero, saveAbout, saveContact, saveMisc } from "../../actions";
import { Card, PageTitle, Field, TextArea, SaveButton } from "../ui";

export const dynamic = "force-dynamic";

export default async function TextesPage() {
  const db = createAdminClient();
  const { data } = await db.from("singletons").select("key, fr, en");
  const S: Record<string, { fr: any; en: any }> = {};
  for (const r of data ?? []) S[r.key] = { fr: r.fr ?? {}, en: r.en ?? {} };

  const hero = S.hero ?? { fr: {}, en: {} };
  const about = S.about ?? { fr: {}, en: {} };
  const contact = S.contact ?? { fr: {}, en: {} };
  const contactSection = S.contactSection ?? { fr: {}, en: {} };
  const misc = S.misc ?? { fr: {}, en: {} };

  return (
    <div className="space-y-8">
      <PageTitle title="Textes & statut" subtitle="Modifie les textes principaux du site, en français et en anglais." />

      {/* HERO / STATUT */}
      <Card>
        <form action={saveHero} className="space-y-5">
          <h2 className="font-black text-white">Hero — statut & accroche</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Français</p>
              <Field label="Statut actuel" name="fr_status" defaultValue={hero.fr.statusLine} />
              <Field label="Accroche (headline)" name="fr_headline" defaultValue={hero.fr.headline} />
              <Field label="Sous-titre" name="fr_titleLine" defaultValue={hero.fr.titleLine} />
              <Field label="Bouton principal" name="fr_cta1" defaultValue={hero.fr.ctas?.primary} />
              <Field label="Bouton secondaire" name="fr_cta2" defaultValue={hero.fr.ctas?.secondary} />
            </div>
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-400">English</p>
              <Field label="Current status" name="en_status" defaultValue={hero.en.statusLine} />
              <Field label="Headline" name="en_headline" defaultValue={hero.en.headline} />
              <Field label="Subtitle" name="en_titleLine" defaultValue={hero.en.titleLine} />
              <Field label="Primary button" name="en_cta1" defaultValue={hero.en.ctas?.primary} />
              <Field label="Secondary button" name="en_cta2" defaultValue={hero.en.ctas?.secondary} />
            </div>
          </div>
          <SaveButton />
        </form>
      </Card>

      {/* À PROPOS */}
      <Card>
        <form action={saveAbout} className="space-y-5">
          <h2 className="font-black text-white">À propos / Mindset</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Français</p>
              <Field label="Titre" name="fr_title" defaultValue={about.fr.title} />
              <TextArea label="Paragraphes" name="fr_paragraphs" rows={6} hint="Un paragraphe par ligne." defaultValue={(about.fr.paragraphs ?? []).join("\n")} />
            </div>
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-400">English</p>
              <Field label="Title" name="en_title" defaultValue={about.en.title} />
              <TextArea label="Paragraphs" name="en_paragraphs" rows={6} hint="One paragraph per line." defaultValue={(about.en.paragraphs ?? []).join("\n")} />
            </div>
          </div>
          <SaveButton />
        </form>
      </Card>

      {/* CONTACT */}
      <Card>
        <form action={saveContact} className="space-y-5">
          <h2 className="font-black text-white">Contact</h2>
          <div className="grid gap-3 md:grid-cols-3">
            <Field label="Email" name="email" defaultValue={contact.fr.email} />
            <Field label="Téléphone" name="phone" defaultValue={contact.fr.phone} />
            <Field label="LinkedIn (URL)" name="linkedin" defaultValue={contact.fr.linkedin} />
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Français</p>
              <Field label="Localisation" name="fr_location" defaultValue={contact.fr.location} />
              <TextArea label="Intro section contact" name="fr_intro" rows={3} defaultValue={contactSection.fr.intro} />
            </div>
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-400">English</p>
              <Field label="Location" name="en_location" defaultValue={contact.en.location} />
              <TextArea label="Contact section intro" name="en_intro" rows={3} defaultValue={contactSection.en.intro} />
            </div>
          </div>
          <SaveButton />
        </form>
      </Card>

      {/* DIVERS */}
      <Card>
        <form action={saveMisc} className="space-y-5">
          <h2 className="font-black text-white">Divers (niveau d'anglais, intros, centres d'intérêt)</h2>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-emerald-400">Français</p>
              <Field label="Niveau d'anglais" name="fr_english" defaultValue={misc.fr.englishLevel} />
              <TextArea label="Intro section projets" name="fr_projectsIntro" rows={2} defaultValue={misc.fr.projectsIntro} />
              <Field label="Titre centres d'intérêt" name="fr_interestsTitle" defaultValue={misc.fr.skillsInterestsTitle} />
              <TextArea label="Centres d'intérêt" name="fr_interests" rows={2} hint="Séparés par des virgules." defaultValue={(misc.fr.skillsInterests ?? []).join(", ")} />
            </div>
            <div className="space-y-3">
              <p className="text-xs font-black uppercase tracking-widest text-cyan-400">English</p>
              <Field label="English level" name="en_english" defaultValue={misc.en.englishLevel} />
              <TextArea label="Projects section intro" name="en_projectsIntro" rows={2} defaultValue={misc.en.projectsIntro} />
              <Field label="Interests title" name="en_interestsTitle" defaultValue={misc.en.skillsInterestsTitle} />
              <TextArea label="Interests" name="en_interests" rows={2} hint="Comma separated." defaultValue={(misc.en.skillsInterests ?? []).join(", ")} />
            </div>
          </div>
          <SaveButton />
        </form>
      </Card>
    </div>
  );
}
