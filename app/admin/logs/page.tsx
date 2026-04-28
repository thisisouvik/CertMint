import { requireAdminUser } from "@/lib/auth/admin-access";

export const dynamic = 'force-dynamic';

interface LogRow {
  action: string | null;
  performed_by: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
}

export default async function AdminLogsPage() {
  const { supabase } = await requireAdminUser();

  const { data, error } = await supabase
    .from("admin_logs")
    .select("action, performed_by, metadata, created_at")
    .order("created_at", { ascending: false })
    .limit(50)
    .returns<LogRow[]>();

  return (
    <section className="space-y-5">
      <section className="rounded-[1.6rem] border border-[#EAD6CC] bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(128,79,50,0.45)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C55B34]">Logs</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211]">Admin logs</h2>

        {error ? (
          <p className="mt-4 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-3 text-sm text-[#8C3F1E]">Failed to load admin logs.</p>
        ) : null}

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#EAD8CF] text-xs uppercase tracking-[0.1em] text-[#7B6A64]">
                <th className="px-3 py-2">Action</th>
                <th className="px-3 py-2">Performed By</th>
                <th className="px-3 py-2">Metadata</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {(data ?? []).map((row, index) => (
                <tr key={`${row.action ?? "action"}-${index}`} className="border-b border-[#F1E4DD] text-[#2C211D]">
                  <td className="px-3 py-3">{row.action ?? "-"}</td>
                  <td className="px-3 py-3">{row.performed_by ?? "-"}</td>
                  <td className="px-3 py-3">{row.metadata ? JSON.stringify(row.metadata).slice(0, 80) : "-"}</td>
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
