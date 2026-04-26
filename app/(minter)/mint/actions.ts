"use server";

import { createClient } from "@/lib/supabase/server";

export async function saveMintedCertificateAction(payload: {
  tokenId: number;
  recipientWallet: string;
  certType: string;
  title: string;
  description: string;
  txHash: string;
  contractId: string;
}) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    throw new Error("Unauthorized");
  }

  // Assuming minter's wallet is not explicitly tracked in DB for this, 
  // but we can use their email or just mock the issuer wallet as their user.id or predefined.
  // We'll set issuer_wallet to "SYSTEM" or maybe we should fetch it.
  
  const { error } = await supabase.from("certificates").insert({
    token_id: payload.tokenId,
    owner_wallet: payload.recipientWallet,
    issuer_wallet: user.email || "UNKNOWN",
    title: payload.title,
    description: payload.description,
    cert_type: payload.certType,
    tx_hash: payload.txHash,
    contract_id: payload.contractId,
    is_revoked: false,
  });

  if (error) {
    console.error("Failed to save certificate:", error);
    throw new Error("Failed to save certificate to database");
  }

  // Optionally save transaction to transactions table
  await supabase.from("transactions").insert({
    tx_hash: payload.txHash,
    action: "MINT_CERTIFICATE",
    wallet_address: user.email || "UNKNOWN",
    status: "success",
  });

  return { success: true };
}
