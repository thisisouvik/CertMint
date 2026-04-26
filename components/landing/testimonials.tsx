export function Testimonials() {
  const testimonials = [
    {
      quote: "CertMint transformed how we issue hackathon prizes. Having verifiable, immutable on-chain records gives our winners true digital ownership of their achievements.",
      author: "Sarah Jenkins",
      role: "Director, Web3Hack",
      avatar: "SJ"
    },
    {
      quote: "The verification process is seamless. Our corporate partners can instantly verify employee training certificates without having to contact us.",
      author: "David Chen",
      role: "Lead Educator, TechAcade",
      avatar: "DC"
    },
    {
      quote: "We chose CertMint because of the speed and low cost of the Stellar network. Minting thousands of certificates is fast and practically free.",
      author: "Elena Rodriguez",
      role: "Operations Manager, GlobalEd",
      avatar: "ER"
    }
  ];

  return (
    <section className="relative px-6 py-16 sm:px-10 lg:px-16">
      <div className="mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D46339]">Trusted by Institutions</p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl leading-tight text-[#181212] sm:text-4xl">
            What our users are saying
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, idx) => (
            <div key={idx} className="rounded-2xl border border-[#EED8CC] bg-white p-8 shadow-sm transition-transform hover:-translate-y-1">
              <div className="flex gap-1 text-[#D46339] mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-[#5D5553] text-sm leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFF7F1] text-sm font-semibold text-[#D46339]">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#181212]">{testimonial.author}</p>
                  <p className="text-xs text-[#8A7D78]">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
