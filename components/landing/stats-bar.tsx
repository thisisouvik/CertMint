import { heroStats } from "@/lib/content/landing";

export function StatsBar() {
  return (
    <section className="px-6 py-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl rounded-full border border-[#E8D3C8] bg-white/85 px-5 py-3 shadow-[0_16px_34px_-30px_rgba(96,58,41,0.65)]">
        <ul className="flex flex-wrap items-center justify-center gap-3 text-center sm:gap-5">
          {heroStats.map((item, index) => (
            <li key={item.label} className="flex items-center gap-3 text-[#2A1E1A]">
              <span className="font-[family-name:var(--font-display)] text-xl sm:text-2xl">{item.value}</span>
              <span className="text-xs font-medium text-[#655A56] sm:text-sm">{item.label}</span>
              {index < heroStats.length - 1 ? <span className="text-[#C9AFA2]">|</span> : null}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
