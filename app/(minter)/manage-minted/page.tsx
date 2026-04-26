import { createClient } from "@/lib/supabase/server";

interface CertificateRow {
  cert_type: string | null;
  is_revoked: boolean;
}

export default async function ManageMintedPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("certificates")
    .select("cert_type, is_revoked")
    .returns<CertificateRow[]>();

  const certificates = data ?? [];
  const total = certificates.length;
  const active = certificates.filter((item) => !item.is_revoked).length;
  const revoked = certificates.filter((item) => item.is_revoked).length;

  const typeCount = certificates.reduce<Record<string, number>>((acc, item) => {
    const type = (item.cert_type ?? "Unknown").toUpperCase();
    acc[type] = (acc[type] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-5xl space-y-5">
      <section className="rounded-[1.6rem] border border-[#EAD6CC] bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(128,79,50,0.45)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C55B34]">Manage Minted Certificate</p>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211]">
          Minted certificate metrics
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#5D5452] sm:text-base">
          Track your minted certificate activity and health from one place.
        </p>

        {error ? (
          <p className="mt-4 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-3 text-sm text-[#8C3F1E]">
            Certificates table is not ready yet. Run SQL setup to populate metrics.
          </p>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Total</p>
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

        <div className="mt-5 rounded-xl border border-[#E9D6CD] bg-white p-4">
          <p className="text-xs uppercase tracking-[0.12em] text-[#866E65]">By certificate type</p>
          <div className="mt-3 flex flex-wrap gap-2">
            {Object.keys(typeCount).length > 0 ? (
              Object.entries(typeCount).map(([type, count]) => (
                <span key={type} className="rounded-full border border-[#D9C2B5] bg-[#FFF8F4] px-3 py-1 text-xs font-semibold text-[#5A4C47]">
                  {type}: {count}
                </span>
              ))
            ) : (
              <span className="text-sm text-[#6B5A54]">No certificate data yet.</span>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
