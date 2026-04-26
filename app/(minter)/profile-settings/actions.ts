"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateProfileSettingsAction(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const requestKycReview = String(formData.get("requestKycReview") ?? "false") === "true";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth?next=/profile-settings");
  }

  if (!fullName) {
    redirect("/profile-settings?error=Full+name+is+required");
  }

  const updatePayload: { full_name: string; approval_status?: "pending" } = {
    full_name: fullName,
  };

  if (requestKycReview) {
    updatePayload.approval_status = "pending";
  }

  const { error } = await supabase.from("user_profiles").update(updatePayload).eq("id", user.id);

  if (error) {
    redirect(`/profile-settings?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/profile-settings?success=Profile+updated+successfully");
}
