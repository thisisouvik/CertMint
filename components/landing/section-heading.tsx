interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({ eyebrow, title, description }: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#D46339]">{eyebrow}</p>
      <h2 className="mt-4 font-[family-name:var(--font-display)] text-3xl leading-tight text-[#171211] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-[#5D5553]">{description}</p>
      ) : null}
    </div>
  );
}
