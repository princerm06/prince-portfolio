interface SectionHeadingProps {
  id: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <header className="max-w-[70ch]">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-amber">
        {eyebrow}
      </p>
      <h2 id={id} className="mt-3 font-serif text-3xl leading-tight md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-muted">{description}</p>
      ) : null}
    </header>
  );
}