"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/auth/admin-access";
import { createAdminClient } from "@/lib/supabase/admin";

type ApprovalStatus = "pending" | "approved" | "rejected";
type ViewStatus = ApprovalStatus | "all";

function parseStatus(value: FormDataEntryValue | null): ApprovalStatus {
  const status = typeof value === "string" ? value : "";

  if (status === "pending" || status === "approved" || status === "rejected") {
    return status;
  }

  throw new Error("Invalid approval status.");
}

function parseViewStatus(value: FormDataEntryValue | null): ViewStatus {
  const status = typeof value === "string" ? value : "pending";

  if (status === "pending" || status === "approved" || status === "rejected" || status === "all") {
    return status;
  }

  return "pending";
}

async function ensureAdminAccess() {
  await requireAdminUser();
}

export async function updateApprovalStatusAction(formData: FormData) {
  await ensureAdminAccess();

  const userId = String(formData.get("userId") ?? "").trim();
  const nextStatus = parseStatus(formData.get("status"));
  const viewStatus = parseViewStatus(formData.get("viewStatus"));

  if (!userId) {
    redirect(`/admin/wallets?status=${viewStatus}&error=Missing+user+id`);
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from("user_profiles")
    .update({ approval_status: nextStatus })
    .eq("id", userId);

  if (error) {
    redirect(`/admin/wallets?status=${viewStatus}&error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/wallets");
  redirect(`/admin/wallets?status=${viewStatus}&success=${encodeURIComponent(`User status updated to ${nextStatus}.`)}`);
}

export async function revokeCertificateAction(formData: FormData) {
  await ensureAdminAccess();

  const tokenIdRaw = String(formData.get("tokenId") ?? "").trim();
  const tokenId = Number.parseInt(tokenIdRaw, 10);

  if (!tokenIdRaw || Number.isNaN(tokenId)) {
    redirect("/admin?error=Enter+a+valid+token+id");
  }

  const adminClient = createAdminClient();

  const { data: existingCertificate, error: certLookupError } = await adminClient
    .from("certificates")
    .select("id, is_revoked")
    .eq("token_id", tokenId)
    .maybeSingle<{ id: string; is_revoked: boolean }>();

  if (certLookupError) {
    redirect(`/admin?error=${encodeURIComponent(certLookupError.message)}`);
  }

  if (!existingCertificate) {
    redirect("/admin?error=Certificate+not+found+for+token+id");
  }

  if (existingCertificate.is_revoked) {
    redirect("/admin?error=Certificate+is+already+revoked");
  }

  const { error: revokeError } = await adminClient
    .from("certificates")
    .update({ is_revoked: true })
    .eq("id", existingCertificate.id);

  if (revokeError) {
    redirect(`/admin?error=${encodeURIComponent(revokeError.message)}`);
  }

  const { error: txError } = await adminClient.from("transactions").insert({
    cert_id: existingCertificate.id,
    action: "BURN",
    status: "SUCCESS",
    tx_hash: `revoke_${tokenId}_${Date.now()}`,
  });

  if (txError) {
    redirect(`/admin?error=${encodeURIComponent(txError.message)}`);
  }

  revalidatePath("/admin");
  revalidatePath("/admin/certs");
  revalidatePath("/admin/txns");
  redirect(`/admin?success=${encodeURIComponent(`Certificate #${tokenId} revoked successfully.`)}`);
}
