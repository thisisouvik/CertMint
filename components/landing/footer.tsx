const footerLinks = [
  { label: "Mint", href: "/mint" },
  { label: "Verifier", href: "/verify" },
];

export function LandingFooter() {
  return (
    <footer className="px-6 pb-12 pt-4 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 border-t border-[#E7D5CC] pt-8 text-sm text-[#5D5553] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl text-[#231816]">CertMint</p>
          <p className="mt-1">NFT certificate minting and verification on Stellar</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-4">
          {footerLinks.map((link) => (
            <a key={link.label} href={link.href} className="transition hover:text-[#2D201D]">
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
}
