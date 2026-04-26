import { faqs } from "@/lib/content/landing";
import { SectionHeading } from "@/components/landing/section-heading";

export function FaqSection() {
  return (
    <section id="faq" className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Questions"
          title="Verification answers before you ask"
          description="Everything a recruiter, school, or auditor usually needs to know before validating credentials."
        />

        <div className="mt-10 space-y-4">
          {faqs.map((item, index) => (
            <details
              key={item.question}
              className="fade-in-up group rounded-2xl border border-[#EBDAD1] bg-white px-6 py-5"
              style={{ animationDelay: `${0.06 * (index + 1)}s` }}
            >
              <summary className="cursor-pointer list-none pr-8 text-base font-semibold text-[#241A18] marker:content-none sm:text-lg">
                {item.question}
                <span className="float-right text-xl leading-none text-[#B65935] transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm leading-7 text-[#615855] sm:text-base">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
