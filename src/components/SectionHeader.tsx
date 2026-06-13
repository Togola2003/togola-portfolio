/**
 * En-tête de section numéroté, façon repère de plan technique :
 *   01 ─ Titre de la section
 */
export function SectionHeader({
  index,
  title,
  className = "",
}: {
  index: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="font-mono text-sm font-bold text-amber-400">{index}</span>
      <span className="h-px w-6 bg-amber-400/70" />
      <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">{title}</h2>
    </div>
  );
}
