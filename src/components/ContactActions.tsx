"use client";

import { useState } from "react";
import type { SiteContent } from "@/content/types";

export function ContactActions({ c }: { c: SiteContent }) {
  const [copied, setCopied] = useState(false);

  const subject = encodeURIComponent("Contact — Portfolio");
  const body = encodeURIComponent("Bonjour Ladji,\n\nJe te contacte pour...\n\nCordialement,");
  const mailto = `mailto:${c.contact.email}?subject=${subject}&body=${body}`;

  return (
    <div className="flex flex-wrap gap-3">
      <a
        href={mailto}
        className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-black hover:bg-emerald-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-emerald-500/30"
      >
        ✉ Email
      </a>
      <a
        href={`tel:${c.contact.phone.replace(/\s/g, "")}`}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
      >
        📞 {c.contact.phone}
      </a>
      <a
        href={c.contact.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
      >
        LinkedIn ↗
      </a>
      <button
        onClick={async () => {
          await navigator.clipboard.writeText(c.contact.email);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        }}
        className="inline-flex items-center gap-2 rounded-xl border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-100 hover:bg-slate-800 hover:border-emerald-500/50 transition-all duration-300 hover:scale-105"
      >
        {copied ? "✓ Copié !" : "📋 Copier l'email"}
      </button>
    </div>
  );
}
