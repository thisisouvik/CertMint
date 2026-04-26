import { certificateFilters } from "@/lib/content/landing";

export function FilterBar() {
  return (
    <section className="px-6 py-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl rounded-3xl border border-[#E8D5CC] bg-white/90 px-6 py-5">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A15433]">Filter Certificates</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {certificateFilters.map((filter, index) => (
            <button
              key={filter}
              type="button"
              className={
                index === 0
                  ? "rounded-full border border-[#C75F38] bg-[#C75F38] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#FFF8F4]"
                  : "rounded-full border border-[#D9C0B2] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#3A2D29] transition hover:border-[#BE9F90] hover:bg-[#FFF7F3]"
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
