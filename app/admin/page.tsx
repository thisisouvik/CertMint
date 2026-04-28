import { revokeCertificateAction } from "@/app/admin/actions";
import { requireAdminUser } from "@/lib/auth/admin-access";

export const dynamic = 'force-dynamic';

interface SearchParams {
  success?: string;
  error?: string;
}

interface AdminPageProps {
  searchParams?: Promise<SearchParams>;
}

interface TransactionRow {
  tx_hash: string | null;
  action: string | null;
  status: string | null;
  created_at: string;
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const resolved = (await searchParams) ?? {};
  const { supabase } = await requireAdminUser();

  const [{ count: totalCertificates }, { count: mintedToday }, { data: walletRows }, { data: recentTxns, error: recentTxError }] =
    await Promise.all([
      supabase.from("certificates").select("id", { count: "exact", head: true }),
      supabase
        .from("certificates")
        .select("id", { count: "exact", head: true })
        .gte("created_at", new Date(new Date().setHours(0, 0, 0, 0)).toISOString()),
      supabase.from("certificates").select("issuer_wallet"),
      supabase
        .from("transactions")
        .select("tx_hash, action, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6)
        .returns<TransactionRow[]>(),
    ]);

  const walletCount = new Set((walletRows ?? []).map((row) => row.issuer_wallet).filter(Boolean)).size;

  return (
    <section className="space-y-5">
      <section className="rounded-[1.6rem] border border-[#EAD6CC] bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(128,79,50,0.45)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C55B34]">Overview</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211]">Admin home</h2>
        <p className="mt-2 text-sm leading-7 text-[#5D5452]">Monitor certificate activity and take quick actions from one page.</p>

        {resolved.error ? (
          <p className="mt-4 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-3 text-sm text-[#8C3F1E]">{resolved.error}</p>
        ) : null}

        {resolved.success ? (
          <p className="mt-4 rounded-xl border border-[#B9D9C0] bg-[#EFFAF1] px-4 py-3 text-sm text-[#1A6A31]">{resolved.success}</p>
        ) : null}

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Total Certs</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#221613]">{totalCertificates ?? 0}</p>
          </article>
          <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Today</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#221613]">{mintedToday ?? 0}</p>
          </article>
          <article className="rounded-xl border border-[#E8D4CA] bg-[#FFF8F4] p-4">
            <p className="text-xs uppercase tracking-[0.1em] text-[#7A6660]">Wallets</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-3xl text-[#221613]">{walletCount}</p>
          </article>
        </div>

        <div className="mt-8 rounded-2xl border border-[#E8D4CA] bg-white p-5">
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#221613]">Recent Transactions</h3>
          <p className="mt-2 text-sm text-[#615754]">Latest blockchain actions across certificates.</p>

          {recentTxError ? (
            <p className="mt-4 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-3 text-sm text-[#8C3F1E]">
              Failed to load transactions. Check SQL setup.
            </p>
          ) : null}

          {recentTxns && recentTxns.length > 0 ? (
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#EAD8CF] text-xs uppercase tracking-[0.1em] text-[#7B6A64]">
                    <th className="px-3 py-2">TX Hash</th>
                    <th className="px-3 py-2">Action</th>
                    <th className="px-3 py-2">Status</th>
                    <th className="px-3 py-2">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTxns.map((row, index) => (
                    <tr key={`${row.tx_hash ?? "tx"}-${index}`} className="border-b border-[#F1E4DD] text-[#2C211D]">
                      <td className="px-3 py-3">{row.tx_hash ? `${row.tx_hash.slice(0, 8)}...` : "-"}</td>
                      <td className="px-3 py-3 uppercase">{row.action ?? "-"}</td>
                      <td className="px-3 py-3 uppercase">
                        {row.status === "SUCCESS" ? "✅" : row.status === "FAILED" ? "❌" : "⏳"}
                      </td>
                      <td className="px-3 py-3">{new Date(row.created_at).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 rounded-xl border border-[#E9D6CD] bg-[#FFF8F4] px-4 py-6 text-sm text-[#645955]">
              No transactions available.
            </p>
          )}
        </div>

        <div className="mt-8 rounded-2xl border border-[#E8D4CA] bg-white p-5">
          <h3 className="font-[family-name:var(--font-display)] text-2xl text-[#221613]">Revoke Certificate</h3>
          <form action={revokeCertificateAction} className="mt-4 flex flex-wrap items-end gap-3">
            <div>
              <label className="text-xs uppercase tracking-[0.1em] text-[#7A6660]" htmlFor="tokenId">
                Token ID
              </label>
              <input
                id="tokenId"
                name="tokenId"
                type="number"
                min={1}
                placeholder="Token ID"
                className="mt-2 w-44 rounded-xl border border-[#DFC8BC] bg-white px-4 py-3 text-sm text-[#2D2220] outline-none focus:border-[#C55B34] focus:ring-2 focus:ring-[#F6D5C8]"
              />
            </div>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-[#AA4C2F] bg-white px-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#AA4C2F]"
            >
              Revoke ⚠️
            </button>
          </form>
        </div>
      </section>
    </section>
  );
}
