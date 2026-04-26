import { featuredCertificates } from "@/lib/content/landing";

export function CertificateGallery() {
  return (
    <section className="px-6 pb-12 pt-6 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl rounded-[2rem] border border-[#E8D5CC] bg-white/90 p-6 sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#1D1412]">Certificate Gallery</h2>
          <a
            href="/collection/demo-wallet"
            className="rounded-full border border-[#D4B9AB] px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-[#3C2C28] transition hover:bg-[#FFF7F2]"
          >
            View Collection
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {featuredCertificates.map((card, index) => (
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
      </div>
    </section>
  );
}
