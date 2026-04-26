import Link from "next/link";

export default function MintPage() {
  return (
    <main className="certmint-bg min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#EBD8CF] bg-white/90 p-7 shadow-[0_24px_52px_-34px_rgba(143,88,59,0.5)] backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C55B34]">CertMint minting</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211] sm:text-5xl">
          Mint NFT certificates on Stellar
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#5D5452] sm:text-base">
          Minting flow setup is in progress. This route is ready for wallet, metadata, and on-chain mint integration.
        </p>
        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D6BCAD] bg-white px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#362824]"
          >
            Back to Landing
          </Link>
          <Link
            href="/verify"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#C85F37] bg-[#C85F37] px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#FFF8F4]"
          >
            Verify Cert
          </Link>
        </div>
      </section>
    </main>
  );
}
