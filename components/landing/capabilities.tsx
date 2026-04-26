import { capabilityItems } from "@/lib/content/landing";
import { SectionHeading } from "@/components/landing/section-heading";

export function Capabilities() {
  return (
    <section id="capabilities" className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Verification stack"
          title="Built for fast, defensible certificate checks"
          description="Everything in CertMint's verifier is optimized for institutions and teams that need to confirm authenticity quickly and reliably."
        />

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {capabilityItems.map((item, index) => (
            <article
              key={item.title}
              className="fade-in-up rounded-3xl border border-[#EEDDD3] bg-white p-6 shadow-[0_16px_40px_-34px_rgba(124,84,63,0.5)]"
              style={{ animationDelay: `${0.05 * (index + 1)}s` }}
            >
              <h3 className="font-[family-name:var(--font-display)] text-2xl leading-tight text-[#1D1614]">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#635A57] sm:text-base">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
