"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  certificateFilters,
  featuredCertificates,
  type CertificateFilter,
} from "@/lib/content/landing";

export function CertificateExplorer() {
  const [activeFilter, setActiveFilter] = useState<CertificateFilter>("All");

  const visibleCertificates = useMemo(() => {
    if (activeFilter === "All") {
      return featuredCertificates;
    }

    return featuredCertificates.filter((card) => card.type === activeFilter);
  }, [activeFilter]);

  return (
    <section className="px-6 pb-12 pt-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl space-y-5">
        <div className="rounded-3xl border border-[#E8D5CC] bg-white/90 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#A15433]">Filter Certificates</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {certificateFilters.map((filter) => {
              const isActive = activeFilter === filter;

              return (
                <button
                  key={filter}
                  type="button"
                  onClick={() => setActiveFilter(filter)}
                  aria-pressed={isActive}
                  className={
                    isActive
                      ? "rounded-full border border-[#C75F38] bg-[#C75F38] px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#FFF8F4]"
                      : "rounded-full border border-[#D9C0B2] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-[#3A2D29] transition hover:border-[#BE9F90] hover:bg-[#FFF7F3]"
                  }
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        <div className="rounded-[2rem] border border-[#E8D5CC] bg-white/90 p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#1D1412]">Certificate Gallery</h2>
            <div className="flex items-center gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-[#7D665B]">
                Showing {visibleCertificates.length}
              </p>
              <Link
                href="/collection/demo-wallet"
                className="rounded-full border border-[#D4B9AB] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#3C2C28] transition hover:bg-[#FFF7F2]"
              >
                View Collection
              </Link>
            </div>
          </div>

          {visibleCertificates.length > 0 ? (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {visibleCertificates.map((card, index) => (
                <article
                  key={card.id}
                  className="fade-in-up rounded-2xl border border-[#E9D5CC] bg-[linear-gradient(140deg,#FFF8F4_0%,#FFFDFB_100%)] p-4"
                  style={{ animationDelay: `${0.05 * (index + 1)}s` }}
                >
                  <p className="text-3xl">{card.icon}</p>
                  <p className="mt-3 font-[family-name:var(--font-display)] text-xl text-[#2A1C19]">{card.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[#9B6A52]">{card.type}</p>
                  <p className="mt-3 text-xs text-[#645955]">Issuer: {card.issuer}</p>
                </article>
              ))}
            </div>
          ) : (
            <p className="mt-6 rounded-2xl border border-[#E9D6CD] bg-[#FFF8F4] px-4 py-8 text-center text-sm text-[#6C605B]">
              No certificates found for this filter yet.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
