const sampleInputs = [
  "CM-2026-0A94-8D1E",
  "f31f4a10d318de7d4a4f9595f6f21513cf727f9f0f2e745c96c639ceb4bd4a94",
  "GC5D...VQPA",
];

export default function VerifyPage() {
  return (
    <main className="certmint-bg min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#EBD8CF] bg-white/90 p-7 shadow-[0_24px_52px_-34px_rgba(143,88,59,0.5)] backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C55B34]">CertMint verifier</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211] sm:text-5xl">
          Verify a certificate on Stellar
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#5D5452] sm:text-base">
          Enter the certificate ID, transaction hash, or wallet address attached to a CertMint NFT certificate.
        </p>

        <form className="mt-8 space-y-4" action="#" method="get">
          <label className="block text-sm font-semibold text-[#2A1E1B]" htmlFor="reference">
            Certificate reference
          </label>
          <input
            id="reference"
            name="reference"
            type="text"
            placeholder="Paste certificate ID / transaction hash / wallet"
            className="w-full rounded-xl border border-[#DFC8BC] bg-[#FFFCFA] px-4 py-3 text-sm text-[#2D2220] outline-none transition placeholder:text-[#9A8A84] focus:border-[#C55B34] focus:ring-2 focus:ring-[#F6D5C8]"
          />
          <button
            type="submit"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#C85F37] px-7 text-sm font-semibold tracking-wide text-[#FFF8F4] transition hover:bg-[#AD4E2A]"
          >
            Check authenticity
          </button>
        </form>

        <div className="mt-10 rounded-2xl border border-[#EFDED5] bg-[#FFF9F5] p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A65A39]">Accepted formats</p>
          <ul className="mt-3 space-y-2 text-sm text-[#5A504D]">
            {sampleInputs.map((value) => (
              <li key={value} className="rounded-lg bg-white px-3 py-2 font-mono text-xs sm:text-sm">
                {value}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
