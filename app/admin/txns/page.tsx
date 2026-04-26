import { requireAdminUser } from "@/lib/auth/admin-access";

interface TxRow {
  tx_hash: string | null;
  action: string | null;
  status: string | null;
  wallet: string | null;
  created_at: string;
}

export default async function AdminTxnsPage() {
  const { supabase } = await requireAdminUser();

  const { data, error } = await supabase
    .from("transactions")
    .select("tx_hash, action, status, wallet, created_at")
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<TxRow[]>();

  return (
    <section className="space-y-5">
      <section className="rounded-[1.6rem] border border-[#EAD6CC] bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(128,79,50,0.45)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C55B34]">Txns</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211]">Transaction monitor</h2>

        {error ? (
          <p className="mt-4 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-3 text-sm text-[#8C3F1E]">Failed to load transactions.</p>
        ) : null}

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#EAD8CF] text-xs uppercase tracking-[0.1em] text-[#7B6A64]">
                <th className="px-3 py-2">TX Hash</th>
                <th className="px-3 py-2">Action</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Wallet</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row, index) => (
                <tr key={`${row.tx_hash ?? "tx"}-${index}`} className="border-b border-[#F1E4DD] text-[#2C211D]">
                  <td className="px-3 py-3">{row.tx_hash ? `${row.tx_hash.slice(0, 12)}...` : "-"}</td>
                  <td className="px-3 py-3 uppercase">{row.action ?? "-"}</td>
                  <td className="px-3 py-3 uppercase">{row.status ?? "-"}</td>
                  <td className="px-3 py-3">{row.wallet ?? "-"}</td>
                  <td className="px-3 py-3">{new Date(row.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
