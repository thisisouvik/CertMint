
import { LandingFooter } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { StatsBar } from "@/components/landing/stats-bar";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Capabilities } from "@/components/landing/capabilities";
import { TrustStrip } from "@/components/landing/trust-strip";
import { CtaBanner } from "@/components/landing/cta-banner";
import { Testimonials } from "@/components/landing/testimonials";
import { FaqSection } from "@/components/landing/faq";
import Link from "next/link";

export default function Home() {
  return (
    <div className="certmint-bg min-h-screen">
      <header className="px-4 pt-4 sm:px-10 sm:pt-8 lg:px-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-3 sm:flex-row sm:justify-between sm:gap-0 rounded-[1.5rem] sm:rounded-full border border-[#EBD7CC] bg-white/75 px-4 py-3 backdrop-blur sm:px-6">
          <p className="font-[family-name:var(--font-display)] text-xl text-[#241816]">CertMint</p>
          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/auth?next=/dashboard"
              className="inline-flex min-h-10 items-center justify-center rounded-full border border-[#C75F38] bg-[#C75F38] px-5 text-[11px] font-semibold uppercase tracking-[0.13em] text-[#FFF6F1] transition hover:bg-[#AF4E2A]"
            >
              Sign In to Mint Certificates
            </Link>
          </div>
        </div>
      </header>

      <main>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <StatsBar />
        <Capabilities />
        <Testimonials />

        <FaqSection />
        <CtaBanner />
      </main>

      <LandingFooter />
    </div>
  );
}
