import Link from "next/link";
import { getUserApproval } from "@/lib/auth/approval";
import { createClient } from "@/lib/supabase/server";

interface SearchParams {
  success?: string;
  error?: string;
}

interface DashboardPageProps {
  searchParams?: Promise<SearchParams>;
}

export default async function DashboardPage({ searchParams }: DashboardPageProps) {
  const resolved = (await searchParams) ?? {};

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const approval = user ? await getUserApproval(user.id) : null;
  const status = approval?.approval_status ?? "pending";
  const isKycApproved = status === "approved";

  const { data: certData } = await supabase
    .from("certificates")
    .select("is_revoked")
    // Assuming RLS or we should filter by the minter if needed.
    // If not, we'll just show all certificates for now.
    // Ideally we would filter by minter_email or minter_id here if RLS isn't fully set up for this yet.
    .returns<{ is_revoked: boolean }[]>();

  const certificates = certData ?? [];
  const total = certificates.length;
  const active = certificates.filter((item) => !item.is_revoked).length;
  const revoked = certificates.filter((item) => item.is_revoked).length;

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <section className="rounded-[1.6rem] border border-[#EAD6CC] bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(128,79,50,0.45)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C55B34]">Home</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211]">
          Minter dashboard
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#5D5452] sm:text-base">
          Track your KYC approval and continue to minting once verification is approved.
        </p>

        {resolved.error ? (
          <p className="mt-4 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-3 text-sm text-[#8C3F1E]">{resolved.error}</p>
        ) : null}

        {resolved.success ? (
          <p className="mt-4 rounded-xl border border-[#B9D9C0] bg-[#EFFAF1] px-4 py-3 text-sm text-[#1A6A31]">{resolved.success}</p>
        ) : null}

        <div className="mt-5 rounded-xl border border-[#E9D6CD] bg-[#FFF8F4] p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-[#866E65]">KYC verification status</p>
          <p className="mt-2 text-lg font-semibold uppercase text-[#2E201D]">{status}</p>
          {!isKycApproved ? (
            <p className="mt-2 text-sm text-[#6B5A54]">Minting is locked until KYC is approved by admin.</p>
          ) : (
            <p className="mt-2 text-sm text-[#1A6A31]">KYC approved. You can mint certificates now.</p>
          )}
        </div>

        <div className="mt-8 border-t border-[#EFDED5] pt-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C55B34]">Overview</p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl text-[#1A1211]">Your Metrics</h2>
          
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Total Deployed</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#221613]">{total}</p>
            </article>
            <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Active</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#221613]">{active}</p>
            </article>
            <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
              <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Revoked</p>
              <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#221613]">{revoked}</p>
            </article>
          </div>
        </div>

        <div className="mt-8">
          <Link
            href={isKycApproved ? "/mint" : "/profile-settings"}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#C85F37] bg-[#C85F37] px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#FFF8F4]"
          >
            {isKycApproved ? "Open Mint Page" : "Complete KYC Profile"}
          </Link>
        </div>
      </section>

      <section className="rounded-[1.6rem] border border-[#EAD6CC] bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(128,79,50,0.45)] sm:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#1A1211]">Feature summary</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Mint certificate</p>
            <p className="mt-2 text-sm text-[#5D5452]">Create NFT certificates with a 3-step wizard and live preview.</p>
          </article>
          <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Manage minted</p>
            <p className="mt-2 text-sm text-[#5D5452]">Track counts by status and certificate type for quick insights.</p>
          </article>
          <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Profile and settings</p>
            <p className="mt-2 text-sm text-[#5D5452]">Maintain your profile and submit KYC review requests.</p>
          </article>
        </div>
      </section>

      <section className="rounded-[1.6rem] border border-[#EAD6CC] bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(128,79,50,0.45)] sm:p-8">
        <h2 className="font-[family-name:var(--font-display)] text-3xl text-[#1A1211]">Quick routes</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Link href="/mint" className="rounded-xl border border-[#E6D3C8] bg-white px-4 py-3 text-sm font-semibold text-[#342723]">
            Go to Mint Certificate
          </Link>
          <Link
            href="/manage-minted"
            className="rounded-xl border border-[#E6D3C8] bg-white px-4 py-3 text-sm font-semibold text-[#342723]"
          >
            Open Manage Minted Certificate
          </Link>
          <Link
            href="/profile-settings"
            className="rounded-xl border border-[#E6D3C8] bg-white px-4 py-3 text-sm font-semibold text-[#342723]"
          >
            Open Profile and Settings
          </Link>
          <Link href="/verify" className="rounded-xl border border-[#E6D3C8] bg-white px-4 py-3 text-sm font-semibold text-[#342723]">
            Verify Certificate
          </Link>
        </div>
      </section>
    </div>
  );
}
