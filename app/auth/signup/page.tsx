import Link from "next/link";
import { signUpAction } from "@/app/auth/actions";

interface SearchParams {
  next?: string;
  error?: string;
  success?: string;
}

interface SignUpPageProps {
  searchParams?: Promise<SearchParams>;
}

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const resolved = (await searchParams) ?? {};
  const nextPath = typeof resolved.next === "string" && resolved.next.startsWith("/") ? resolved.next : "/dashboard";

  return (
    <main className="certmint-bg min-h-screen px-4 py-10 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-[#EBD8CF] bg-white/90 p-7 shadow-[0_24px_52px_-34px_rgba(143,88,59,0.5)] backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C55B34]">CertMint issuer registration</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211] sm:text-5xl">
          Create your issuer account
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-[#5D5452] sm:text-base">
          After signup you will enter your dashboard. Minting stays locked until KYC verification is approved.
        </p>

        {resolved.error ? (
          <p className="mt-6 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-3 text-sm text-[#8C3F1E]">{resolved.error}</p>
        ) : null}

        {resolved.success ? (
          <p className="mt-6 rounded-xl border border-[#B9D9C0] bg-[#EFFAF1] px-4 py-3 text-sm text-[#1A6A31]">{resolved.success}</p>
        ) : null}

        <div className="mt-8 grid gap-5 md:grid-cols-1">
          <article className="rounded-2xl border border-[#D6815D] bg-[#FFF8F4] p-6">
            <h2 className="font-[family-name:var(--font-display)] text-2xl text-[#241714]">Sign Up</h2>
            <p className="mt-2 text-sm text-[#665B57]">Create minter account. KYC approval is required before minting.</p>
            <form action={signUpAction} className="mt-5 space-y-3">
              <input type="hidden" name="next" value={nextPath} />
              <label className="block text-sm font-medium text-[#2A1E1B]" htmlFor="signup-name">
                Full Name
              </label>
              <input
                id="signup-name"
                name="fullName"
                type="text"
                required
                className="w-full rounded-xl border border-[#DFC8BC] bg-[#FFFCFA] px-4 py-3 text-sm text-[#2D2220] outline-none transition focus:border-[#C55B34] focus:ring-2 focus:ring-[#F6D5C8]"
              />
              <label className="block text-sm font-medium text-[#2A1E1B]" htmlFor="signup-email">
                Email
              </label>
              <input
                id="signup-email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-[#DFC8BC] bg-[#FFFCFA] px-4 py-3 text-sm text-[#2D2220] outline-none transition focus:border-[#C55B34] focus:ring-2 focus:ring-[#F6D5C8]"
              />
              <label className="block text-sm font-medium text-[#2A1E1B]" htmlFor="signup-password">
                Password
              </label>
              <input
                id="signup-password"
                name="password"
                type="password"
                required
                minLength={8}
                className="w-full rounded-xl border border-[#DFC8BC] bg-[#FFFCFA] px-4 py-3 text-sm text-[#2D2220] outline-none transition focus:border-[#C55B34] focus:ring-2 focus:ring-[#F6D5C8]"
              />
              <button
                type="submit"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#C85F37] bg-white px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#9D3F1D] transition hover:bg-[#FFF0E8]"
              >
                Create Account
              </button>
            </form>
            <p className="mt-5 text-sm text-[#665B57]">
              Already have an account?{" "}
              <Link
                href={`/auth?next=${encodeURIComponent(nextPath)}`}
                className="font-semibold text-[#A94824] underline-offset-2 hover:underline"
              >
                Sign In
              </Link>
            </p>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D6BCAD] bg-white px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#362824]"
          >
            Back to Landing
          </Link>
          <Link
            href="/verify"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D6BCAD] bg-white px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#362824]"
          >
            Verify Certificate
          </Link>
        </div>
      </section>
    </main>
  );
}
