const trustItems = [
  "Stellar Smart Contracts",
  "Issuer-Signed Metadata",
  "Revocation Registry",
  "Public Verification Logs",
];

export function TrustStrip() {
  return (
    <section className="px-6 py-5 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl rounded-full border border-[#E8D6CD] bg-white/80 px-5 py-3">
        <ul className="flex flex-wrap items-center justify-center gap-3 text-xs font-semibold uppercase tracking-[0.16em] text-[#8D7B73] sm:gap-5 sm:text-sm">
          {trustItems.map((item) => (
            <li key={item} className="flex items-center gap-3">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#C65E36]" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
