import { CertificateExplorer } from "@/components/landing/certificate-explorer";
import { LandingFooter } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { StatsBar } from "@/components/landing/stats-bar";

export default function Home() {
  return (
    <div className="certmint-bg min-h-screen">
      <header className="px-6 pt-6 sm:px-10 sm:pt-8 lg:px-16">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-full border border-[#EBD7CC] bg-white/75 px-4 py-3 backdrop-blur sm:px-6">
          <p className="font-[family-name:var(--font-display)] text-xl text-[#241816]">CertMint</p>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#C75F38] bg-[#C75F38] px-4 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#FFF6F1] transition hover:bg-[#AF4E2A]"
            >
              Connect Wallet
            </button>
            <button
              type="button"
              className="inline-flex min-h-10 w-10 items-center justify-center rounded-full border border-[#D0B6A8] bg-white text-sm font-semibold text-[#3B2D29] transition hover:border-[#B89A8A] hover:bg-[#FFF7F2]"
              aria-label="Toggle navigation"
            >
              ≡
            </button>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <StatsBar />
        <CertificateExplorer />
      </main>

      <LandingFooter />
    </div>
  );
}
