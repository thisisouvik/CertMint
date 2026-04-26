"use server";

import { createClient } from "@/lib/supabase/server";

export async function saveMintedCertificateAction(payload: {
  tokenId: number;
  certType: string;
  title: string;
  description: string;
  txHash: string;
  contractId: string;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized: please sign in.");
  }

  const { error } = await supabase.from("certificates").insert({
    token_id: payload.tokenId,
    owner_wallet: "",          // No recipient wallet — recipient verifies by ID/TX hash
    issuer_wallet: user.email ?? "UNKNOWN",
    title: payload.title,
    description: payload.description,
    cert_type: payload.certType,
    tx_hash: payload.txHash,
    contract_id: payload.contractId,
    is_revoked: false,
  });

  if (error) {
    // Throw the real Supabase error message so it surfaces in the UI
    console.error("Supabase insert error:", error);
    throw new Error(`Database error: ${error.message} (code: ${error.code})`);
  }

  const { error: txError } = await supabase.from("transactions").insert({
    tx_hash: payload.txHash,
    action: "MINT_CERTIFICATE",
    wallet: user.email ?? "UNKNOWN",
    status: "success",
  });

  if (txError) {
    // Non-fatal — cert was saved, just log this
    console.warn("Failed to save transaction log:", txError.message);
  }

  return { success: true, tokenId: payload.tokenId, txHash: payload.txHash };
}
