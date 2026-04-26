import { createClient } from "@/lib/supabase/server";

export type ApprovalStatus = "pending" | "approved" | "rejected";

interface UserProfileRow {
  approval_status: ApprovalStatus;
  role: string;
}

export async function getUserApproval(userId: string): Promise<UserProfileRow | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("user_profiles")
    .select("approval_status, role")
    .eq("id", userId)
    .maybeSingle<UserProfileRow>();

  if (error || !data) {
    return null;
  }

  return data;
}
