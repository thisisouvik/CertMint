import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminEmail } from "@/lib/auth/admin";
import { createClient } from "@/lib/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/admin");
  }

  if (!isAdminEmail(user.email)) {
    redirect("/");
  }

  return (
    <main className="certmint-bg min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-4xl rounded-[2rem] border border-[#EBD8CF] bg-white/90 p-7 shadow-[0_24px_52px_-34px_rgba(143,88,59,0.5)] backdrop-blur sm:p-10">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C55B34]">CertMint admin</p>
        <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211] sm:text-5xl">
          Admin access granted
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#5D5452] sm:text-base">
          Only the configured admin email can open this page. Admin dashboard modules will be added here next.
        </p>
        <div className="mt-6 rounded-xl border border-[#E9D6CD] bg-[#FFF8F4] px-4 py-3 text-sm text-[#594E4A]">
          Signed in as <span className="font-semibold">{user.email}</span>
        </div>

        <div className="mt-8 flex gap-3">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#D6BCAD] bg-white px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#362824]"
          >
            Back to Landing
          </Link>
        </div>
      </section>
    </main>
  );
}
