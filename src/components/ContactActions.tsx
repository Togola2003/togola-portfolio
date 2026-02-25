"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/types";

/**
 * Boutons contact 100% cliquables : email / tel / LinkedIn + copier l'email.
 */
export function ContactActions({ c }: { c: SiteContent }) {
  const [copied, setCopied] = useState(false);

  const subject = encodeURIComponent("Contact — Portfolio");
  const body = encodeURIComponent("Bonjour Ladji,\n\nJe te contacte pour...\n\nCordialement,");
  const mailto = `mailto:${c.contact.email}?subject=${subject}&body=${body}`;

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={mailto}
        className="inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-black hover:bg-emerald-400 transition"
      >
        Email
      </a>

      <a
        href={`tel:${c.contact.phone.replace(/\s/g, "")}`}
        className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900 transition"
      >
        Tel
      </a>

      <a
        href={c.contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900 transition"
      >
        LinkedIn
      </a>

      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(c.contact.email);
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        }}
        className="inline-flex items-center justify-center rounded-xl border border-slate-700 px-4 py-2 text-sm font-medium text-slate-100 hover:bg-slate-900 transition"
      >
        {copied ? c.ui.copied : c.ui.copyEmail}
      </button>
    </div>
  );
}
