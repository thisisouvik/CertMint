import Link from "next/link";
import { redirect } from "next/navigation";
import { signOutAction } from "@/app/auth/actions";
import { getUserApproval } from "@/lib/auth/approval";
import { createClient } from "@/lib/supabase/server";

export default async function MintPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/mint");
  }

  const approval = await getUserApproval(user.id);
  const isApproved = approval?.approval_status === "approved";

  return (
    <main className="certmint-bg min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#EBD8CF] bg-white/90 p-7 shadow-[0_24px_52px_-34px_rgba(143,88,59,0.5)] backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C55B34]">CertMint minting access</p>
        {isApproved ? (
          <>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211] sm:text-5xl">
              You are approved to mint certificates
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#5D5452] sm:text-base">
              Authentication is complete and your issuer account is approved. Next, we will build the certificate minting workflow on this page.
            </p>
          </>
        ) : (
          <>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211] sm:text-5xl">
              Waiting for admin approval
            </h1>
            <p className="mt-4 text-sm leading-7 text-[#5D5452] sm:text-base">
              Your account is authenticated but not approved for minting yet. Ask a CertMint admin to set your user profile approval status to approved.
            </p>
          </>
        )}

        <div className="mt-5 rounded-xl border border-[#E9D6CD] bg-[#FFF8F4] px-4 py-3 text-sm text-[#594E4A]">
          Signed in as <span className="font-semibold">{user.email}</span>
        </div>

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
          <form action={signOutAction}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D6BCAD] bg-white px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#362824]"
            >
              Sign Out
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
