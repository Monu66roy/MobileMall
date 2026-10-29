export default function PageHero({ title, subtitle, accent = false }: { title: string; subtitle?: string; accent?: boolean }) {
  return (
    <header className="mx-auto max-w-[760px] pt-16 text-center">
      <p className="eyebrow text-left sm:text-center">Mobile Mall Darbhanga</p>
      <h1 className={`h-display mt-4 text-[56px] md:text-[68px] ${accent ? "!text-brand" : ""}`}>{title}</h1>
      {subtitle && <p className="mt-5 font-serif text-[26px] text-ink/90">{subtitle}</p>}
    </header>
  );
}
