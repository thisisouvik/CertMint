export function CtaBanner() {
  return (
    <section className="px-6 pb-10 pt-4 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl rounded-[2.2rem] border border-[#E8C8B8] bg-[linear-gradient(120deg,#F8E2D7_0%,#F9C7B4_46%,#F6B8A0_100%)] px-8 py-10 text-[#231513] shadow-[0_22px_44px_-30px_rgba(153,79,45,0.55)] sm:px-12 sm:py-14">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8A3B1D]">Ready to validate</p>
        <h2 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-3xl leading-tight sm:text-4xl">
          Start verifying Stellar-backed NFT certificates with CertMint.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#4A2E26] sm:text-base">
          One route, one action, one trusted result. Check a credential now and review its complete on-chain evidence.
        </p>
        <div className="mt-8">
          <a
            href="/verify"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#7D371E] bg-[#7D371E] px-8 text-sm font-semibold tracking-wide text-[#FFF5EE] transition hover:bg-[#622A16]"
          >
            Open Certificate Verifier
          </a>
        </div>
      </div>
    </section>
  );
}
