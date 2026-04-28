import { updateProfileSettingsAction } from "@/app/(minter)/profile-settings/actions";
import { getUserApproval } from "@/lib/auth/approval";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

interface SearchParams {
  success?: string;
  error?: string;
}

interface ProfileSettingsPageProps {
  searchParams?: Promise<SearchParams>;
}

interface ProfileRow {
  full_name: string | null;
}

export default async function ProfileSettingsPage({ searchParams }: ProfileSettingsPageProps) {
  const resolved = (await searchParams) ?? {};
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const approval = user ? await getUserApproval(user.id) : null;
  const status = approval?.approval_status ?? "pending";

  const { data: profile } = user
    ? await supabase
        .from("user_profiles")
        .select("full_name")
        .eq("id", user.id)
        .maybeSingle<ProfileRow>()
    : { data: null };

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <section className="rounded-[1.6rem] border border-[#EAD6CC] bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(128,79,50,0.45)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C55B34]">Profile and Settings</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211]">
          Profile settings and KYC
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#5D5452] sm:text-base">
          Keep your profile updated and request KYC review for minting access.
        </p>

        {resolved.error ? (
          <p className="mt-4 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-3 text-sm text-[#8C3F1E]">{resolved.error}</p>
        ) : null}

        {resolved.success ? (
          <p className="mt-4 rounded-xl border border-[#B9D9C0] bg-[#EFFAF1] px-4 py-3 text-sm text-[#1A6A31]">{resolved.success}</p>
        ) : null}

        <div className="mt-4 rounded-xl border border-[#E9D6CD] bg-[#FFF8F4] px-4 py-3 text-sm text-[#594E4A]">
          Current KYC status: <span className="font-semibold uppercase">{status}</span>
        </div>

        <form action={updateProfileSettingsAction} className="mt-6 space-y-4 rounded-2xl border border-[#E8D4CA] bg-white p-5">
          <label className="block text-sm font-medium text-[#2A1E1B]" htmlFor="fullName">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            defaultValue={profile?.full_name ?? ""}
            required
            className="w-full rounded-xl border border-[#DFC8BC] bg-[#FFFCFA] px-4 py-3 text-sm text-[#2D2220] outline-none transition focus:border-[#C55B34] focus:ring-2 focus:ring-[#F6D5C8]"
          />

          <div className="rounded-xl border border-[#E9D6CD] bg-[#FFF8F4] p-4">
            <p className="text-sm text-[#5D5452]">
              If your KYC is rejected or pending and you updated details, submit for review again.
            </p>
            <label className="mt-3 flex items-center gap-2 text-sm text-[#3C2F2B]">
              <input type="checkbox" name="requestKycReview" value="true" />
              Request KYC review
            </label>
          </div>

          <button
            type="submit"
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#C85F37] bg-[#C85F37] px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#FFF8F4]"
          >
            Save Settings
          </button>
        </form>
      </section>
    </div>
  );
}
