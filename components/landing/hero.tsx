export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-8 pt-12 sm:px-10 sm:pt-20 lg:px-16">
      <div className="absolute inset-x-0 top-0 h-96 bg-[radial-gradient(circle_at_20%_20%,rgba(255,173,137,0.42),rgba(255,173,137,0)),radial-gradient(circle_at_80%_0%,rgba(253,219,201,0.85),rgba(253,219,201,0))]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="rounded-[2.2rem] border border-[#EED8CC] bg-white/80 p-8 shadow-[0_28px_60px_-38px_rgba(129,77,45,0.45)] backdrop-blur sm:p-12">
          <div className="fade-in-up">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D46339]">CertMint for Stellar</p>
            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-4xl leading-[1.05] text-[#181212] sm:text-5xl lg:text-6xl">
              Mint verifiable certificates on Stellar blockchain.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-[#5D5553] sm:text-lg">
              CertMint helps organizations mint NFT certificates for courses, events, and achievements with immutable on-chain proof and instant public verification.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="/auth?next=/mint"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#D46339] px-7 text-sm font-semibold tracking-wide text-[#FFF8F4] transition hover:bg-[#B94D26]"
              >
                Mint Certificate
              </a>
              <a
                href="/verify"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#D8C1B4] bg-white px-7 text-sm font-semibold tracking-wide text-[#2D2422] transition hover:border-[#BFA496] hover:bg-[#FFF7F1]"
              >
                Verify Certificate
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
