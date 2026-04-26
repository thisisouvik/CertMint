import { requireAdminUser } from "@/lib/auth/admin-access";

interface CertificateRow {
  token_id: number | null;
  title: string;
  cert_type: string | null;
  owner_wallet: string;
  is_revoked: boolean;
  created_at: string;
}

export default async function AdminCertsPage() {
  const { supabase } = await requireAdminUser();

  const { data, error } = await supabase
    .from("certificates")
    .select("token_id, title, cert_type, owner_wallet, is_revoked, created_at")
    .order("created_at", { ascending: false })
    .limit(25)
    .returns<CertificateRow[]>();

  const certificates = data ?? [];

  return (
    <section className="space-y-5">
      <section className="rounded-[1.6rem] border border-[#EAD6CC] bg-white/90 p-6 shadow-[0_20px_50px_-35px_rgba(128,79,50,0.45)] sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#C55B34]">Certs</p>
        <h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211]">Certificate registry</h2>

        {error ? (
          <p className="mt-4 rounded-xl border border-[#E7B6A0] bg-[#FFF1EA] px-4 py-3 text-sm text-[#8C3F1E]">
            Failed to load certificates.
          </p>
        ) : null}

        <div className="mt-5 overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[#EAD8CF] text-xs uppercase tracking-[0.1em] text-[#7B6A64]">
                <th className="px-3 py-2">Token</th>
                <th className="px-3 py-2">Title</th>
                <th className="px-3 py-2">Type</th>
                <th className="px-3 py-2">Owner</th>
                <th className="px-3 py-2">Status</th>
                <th className="px-3 py-2">Created</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((cert, index) => (
                <tr key={`${cert.token_id ?? "token"}-${index}`} className="border-b border-[#F1E4DD] text-[#2C211D]">
                  <td className="px-3 py-3">{cert.token_id ?? "-"}</td>
                  <td className="px-3 py-3">{cert.title}</td>
                  <td className="px-3 py-3 uppercase">{cert.cert_type ?? "-"}</td>
                  <td className="px-3 py-3">{cert.owner_wallet}</td>
                  <td className="px-3 py-3">{cert.is_revoked ? "Revoked" : "Active"}</td>
                  <td className="px-3 py-3">{new Date(cert.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </section>
  );
}
