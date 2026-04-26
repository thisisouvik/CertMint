import { workflowSteps } from "@/lib/content/landing";
import { SectionHeading } from "@/components/landing/section-heading";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl rounded-[2.2rem] border border-[#E8D7CD] bg-[linear-gradient(140deg,#FFF5EF_0%,#FFFFFF_48%,#FFF6F2_100%)] p-8 sm:p-10">
        <SectionHeading
          eyebrow="3-step flow"
          title="From certificate reference to verified proof"
          description="A simple process for anyone checking credentials, without needing blockchain expertise."
        />

        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {workflowSteps.map((step, index) => (
            <li
              key={step.title}
              className="fade-in-up rounded-2xl border border-[#ECD9CF] bg-white/80 p-6"
              style={{ animationDelay: `${0.07 * (index + 1)}s` }}
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C65E36]">Step {index + 1}</p>
              <h3 className="mt-4 font-[family-name:var(--font-display)] text-2xl leading-tight text-[#221816]">{step.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#5E5553] sm:text-base">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
