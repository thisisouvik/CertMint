import { createClient } from "@/lib/supabase/server";

interface CertificateRow {
  token_id: number;
  cert_type: string | null;
  title: string | null;
  owner_wallet: string | null;
  is_revoked: boolean;
  created_at: string;
}

export default async function ManageMintedPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from("certificates")
    .select("token_id, cert_type, title, owner_wallet, is_revoked, created_at")
    .eq("issuer_wallet", user?.email || "UNKNOWN")
    .order("created_at", { ascending: false })
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
          Your Issued Certificates
        </h1>
        <p className="mt-3 text-sm leading-7 text-[#5D5452] sm:text-base">
          Track and manage the certificates you have minted.
        </p>

        {error ? (
          <p className="mt-4 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-3 text-sm text-[#8C3F1E]">
            Failed to load your certificates.
          </p>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Total Issued</p>
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

        <div className="mt-8">
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#221613]">Recent Issuances</h3>
          {certificates.length > 0 ? (
            <div className="mt-4 overflow-x-auto rounded-xl border border-[#E8D4CA]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead className="bg-[#FFF8F4]">
                  <tr className="border-b border-[#E8D4CA] text-xs uppercase tracking-[0.1em] text-[#7A6660]">
                    <th className="px-4 py-3 font-semibold">ID</th>
                    <th className="px-4 py-3 font-semibold">Title</th>
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Recipient</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {certificates.map((cert) => (
                    <tr key={cert.token_id} className="border-b border-[#F5EBE6] last:border-0 hover:bg-[#FFFCFA]">
                      <td className="px-4 py-3 text-[#2D2220]">#{cert.token_id}</td>
                      <td className="px-4 py-3 font-medium text-[#1A1211]">{cert.title || "-"}</td>
                      <td className="px-4 py-3 text-[#5A4C47]">{cert.cert_type || "-"}</td>
                      <td className="px-4 py-3 font-mono text-xs text-[#635854]">{cert.owner_wallet ? `${cert.owner_wallet.substring(0, 8)}...` : "-"}</td>
                      <td className="px-4 py-3">
                        {cert.is_revoked ? (
                          <span className="rounded-md bg-[#FFF1EA] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A54527]">Revoked</span>
                        ) : (
                          <span className="rounded-md bg-[#EFFAF1] px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#1A6A31]">Active</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-[#E9D6CD] bg-[#FFF8F4] p-6 text-sm text-[#5D5452]">
              You haven&apos;t issued any certificates yet.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}
