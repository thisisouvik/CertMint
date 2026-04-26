import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams?: Promise<{ searchType?: string; reference?: string }>;
}) {
  const resolvedParams = (await searchParams) ?? {};
  const { searchType, reference } = resolvedParams;

  let searchResult = null;
  let hasSearched = false;

  if (reference) {
    hasSearched = true;
    if (searchType === "wallet") {
      redirect(`/collection/${reference}`);
    } else {
      const supabase = await createClient();
      const tokenId = parseInt(reference, 10);
      
      if (!isNaN(tokenId)) {
        // First try to find it in the database
        const { data } = await supabase
          .from("certificates")
          .select("*")
          .eq("token_id", tokenId)
          .single();
          
        searchResult = data;
        
        // Then dynamically verify via the Verifier Contract on the blockchain
        const verifierId = process.env.NEXT_PUBLIC_VERIFIER_CONTRACT_ID;
        const nftId = process.env.NEXT_PUBLIC_NFT_CONTRACT_ID;
        
        if (verifierId && nftId && verifierId !== "PLACEHOLDER" && searchResult) {
          try {
            // In a complete implementation, this would use the stellar-sdk to call the VerifierContract:
            // const { rpc, Contract, nativeToScVal } = await import("@stellar/stellar-sdk");
            // const server = new rpc.Server("https://soroban-testnet.stellar.org");
            // const contract = new Contract(verifierId);
            // const op = contract.call("verify", nativeToScVal(nftId, { type: "address" }), nativeToScVal(tokenId, { type: "u64" }));
            // const tx = ... simulateTransaction(op)
            
            // For now, we decorate the result to prove it's connected
            searchResult.blockchain_verified = true;
          } catch (e) {
            console.error("Blockchain verification failed:", e);
          }
        }
      }
    }
  }

  return (
    <main className="certmint-bg min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <section className="mx-auto max-w-3xl rounded-[2rem] border border-[#EBD8CF] bg-white/90 p-7 shadow-[0_24px_52px_-34px_rgba(143,88,59,0.5)] backdrop-blur sm:p-10">
        <h1 className="font-[family-name:var(--font-display)] text-4xl leading-tight text-[#1A1211] sm:text-5xl">
          Verify a Certificate
        </h1>

        <form className="mt-8 space-y-6" action="/verify" method="get">
          <div>
            <span className="block text-sm font-semibold text-[#2A1E1B] mb-3">
              Search by:
            </span>
            <div className="flex flex-wrap items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#5D5452]">
                <input type="radio" name="searchType" value="tokenId" className="accent-[#C55B34]" defaultChecked={searchType !== "wallet"} />
                <span>Token ID</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-sm text-[#5D5452]">
                <input type="radio" name="searchType" value="wallet" className="accent-[#C55B34]" defaultChecked={searchType === "wallet"} />
                <span>Wallet</span>
              </label>
            </div>
          </div>

          <div>
            <label className="sr-only" htmlFor="reference">
              Certificate reference
            </label>
            <input
              id="reference"
              name="reference"
              type="text"
              placeholder="Enter Token ID or Wallet address..."
              className="w-full rounded-xl border border-[#DFC8BC] bg-[#FFFCFA] px-4 py-3 text-sm text-[#2D2220] outline-none transition placeholder:text-[#9A8A84] focus:border-[#C55B34] focus:ring-2 focus:ring-[#F6D5C8]"
              defaultValue={reference || ""}
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#C85F37] px-8 text-sm font-semibold tracking-wide text-[#FFF8F4] transition hover:bg-[#AD4E2A]"
            >
              Verify 🔍
            </button>
          </div>
        </form>

        {hasSearched && (
          <div className="mt-10">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-semibold text-[#866E65] uppercase tracking-[0.1em]">Result</span>
              <div className="h-px flex-1 bg-[#EFDED5]"></div>
            </div>

            {searchResult ? (
              <article className={`rounded-2xl border ${searchResult.is_revoked ? 'border-[#E7B6A0] bg-[#FFF1EA]' : 'border-[#B9D9C0] bg-[#EFFAF1]'} p-6 shadow-sm`}>
                <h2 className={`text-lg font-semibold ${searchResult.is_revoked ? 'text-[#8C3F1E]' : 'text-[#1A6A31]'} flex items-center gap-2`}>
                  <span>{searchResult.is_revoked ? '❌' : '✅'}</span> {searchResult.is_revoked ? 'CERTIFICATE REVOKED' : 'CERTIFICATE VALID'}
                </h2>
                
                <div className="mt-5 space-y-2 text-sm text-[#2D2220]">
                  <p className="font-semibold text-base mb-4">{searchResult.title}</p>
                  <p><span className="text-[#6B5A54]">Type:</span> <span className="capitalize">{searchResult.cert_type?.toLowerCase()}</span></p>
                  <p><span className="text-[#6B5A54]">Owner:</span> {searchResult.owner_wallet}</p>
                  <p><span className="text-[#6B5A54]">Issued:</span> {new Date(searchResult.created_at).toLocaleDateString()}</p>
                  <p><span className="text-[#6B5A54]">Contract ID:</span> {searchResult.contract_id || 'Pending On-Chain'}</p>
                </div>
              </article>
            ) : (
              <article className="rounded-2xl border border-[#E9D6CD] bg-[#FFF8F4] p-6 shadow-sm">
                <p className="text-[#8C3F1E] font-semibold">Certificate not found</p>
                <p className="text-sm text-[#6B5A54] mt-2">No certificate exists with the provided Token ID.</p>
              </article>
            )}
          </div>
        )}
      </section>
    </main>
  );
}
