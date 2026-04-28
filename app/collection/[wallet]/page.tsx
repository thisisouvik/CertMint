import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const dynamic = 'force-dynamic';

export default async function CollectionPage({ params }: { params: Promise<{ wallet: string }> }) {
  const resolvedParams = await params;
  const wallet = resolvedParams.wallet;
  
  const supabase = await createClient();
  const { data: certificatesData } = await supabase
    .from("certificates")
    .select("*")
    .eq("owner_wallet", wallet)
    .order("created_at", { ascending: false });

  const certificates = certificatesData ?? [];
  const typeCount = new Set(certificates.map(c => c.cert_type)).size;

  const formattedWallet = wallet.length > 8 
    ? `${wallet.substring(0, 4)}...${wallet.substring(wallet.length - 4)}`
    : wallet;

  const getEmojiBadge = (type: string | null) => {
    if (type === "HACKATHON") return "🏆";
    if (type === "COURSE") return "🎓";
    if (type === "ACHIEVEMENT") return "⭐";
    return "📄";
  };

  return (
    <main className="certmint-bg min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-5xl rounded-[2rem] border border-[#EBD8CF] bg-white/90 p-7 shadow-[0_24px_52px_-34px_rgba(143,88,59,0.5)] backdrop-blur sm:p-10">
        <h1 className="font-[family-name:var(--font-display)] text-3xl leading-tight text-[#1A1211] sm:text-4xl">
          <span className="font-mono text-[#C55B34]">{formattedWallet}</span>&apos;s Certificates
        </h1>
        
        <div className="mt-6 flex items-center gap-4">
          <div className="h-px flex-1 bg-[#EFDED5]"></div>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-[#5D5452]">
          <p><strong className="text-[#2D2220] text-lg">{certificates.length}</strong> certificates</p>
          <div className="h-4 w-px bg-[#EAD8CF]"></div>
          <p><strong className="text-[#2D2220] text-lg">{typeCount}</strong> types</p>
        </div>

        {certificates.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <Link 
                key={cert.id} 
                href={`/certificate/${cert.token_id}`} 
                className={`group rounded-2xl border ${cert.is_revoked ? 'border-[#E7B6A0] bg-[#FFF1EA]' : 'border-[#EAD8CF] bg-[#FFFBF9]'} p-6 transition hover:border-[#C55B34] hover:shadow-md block relative`}
              >
                {cert.is_revoked && (
                  <span className="absolute top-4 right-4 text-xs font-bold text-[#8C3F1E]">REVOKED</span>
                )}
                <div className={`flex h-16 w-16 items-center justify-center rounded-full border ${cert.is_revoked ? 'border-[#E7B6A0] bg-[#FFF1EA]' : 'border-[#EAD8CF] bg-white'} text-3xl shadow-sm mb-4`}>
                  {getEmojiBadge(cert.cert_type)}
                </div>
                <p className={`text-xs font-semibold uppercase tracking-[0.15em] ${cert.is_revoked ? 'text-[#8C3F1E]' : 'text-[#C55B34]'}`}>{cert.cert_type}</p>
                <h3 className={`mt-2 text-lg font-[family-name:var(--font-display)] ${cert.is_revoked ? 'text-[#8C3F1E]' : 'text-[#1A1211] group-hover:text-[#C55B34]'} transition line-clamp-2`}>
                  {cert.title}
                </h3>
                <p className={`mt-3 text-sm ${cert.is_revoked ? 'text-[#A65A39]' : 'text-[#866E65]'}`}>Issued: {new Date(cert.created_at).toLocaleDateString()}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-10 rounded-2xl border border-[#E9D6CD] bg-[#FFF8F4] p-8 text-center">
            <p className="text-[#866E65] font-medium">No certificates found for this wallet address.</p>
          </div>
        )}
      </section>
    </main>
  );
}
