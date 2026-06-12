import type { ReactNode } from "react";

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-slate-900/50 p-6 ${className}`}>
      {children}
    </div>
  );
}

export function PageTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-black text-white">{title}</h1>
      {subtitle && <p className="mt-1 text-sm text-slate-400">{subtitle}</p>}
    </div>
  );
}

const inputCls =
  "w-full rounded-xl border border-white/10 bg-slate-950 px-3 py-2 text-sm text-white outline-none focus:border-emerald-500/50 placeholder:text-slate-600";

export function Field({
  label,
  name,
  defaultValue = "",
  placeholder,
  required,
  type = "text",
}: {
  label: string;
  name: string;
  defaultValue?: string | number;
  placeholder?: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        required={required}
        className={inputCls}
      />
    </label>
  );
}

export function TextArea({
  label,
  name,
  defaultValue = "",
  placeholder,
  rows = 4,
  hint,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  rows?: number;
  hint?: string;
}) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</span>
      {hint && <span className="block text-[11px] font-normal normal-case text-slate-500">{hint}</span>}
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        rows={rows}
        className={`${inputCls} resize-y leading-relaxed`}
      />
    </label>
  );
}

export function SaveButton({ children = "Enregistrer" }: { children?: ReactNode }) {
  return (
    <button
      type="submit"
      className="rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-bold text-slate-950 hover:bg-emerald-400 transition-colors"
    >
      {children}
    </button>
  );
}
